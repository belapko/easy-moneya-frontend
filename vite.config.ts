import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import { defineConfig, type Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

const require = createRequire(import.meta.url);
const tablerFallbackIconPath = require.resolve('@tabler/icons/outline/currency-rubel.svg');
const tablerIconsOutlinePath = dirname(tablerFallbackIconPath);
const tablerIconsPublicPath = '/tabler-icons/outline/';
const tablerIconsManifestPath = `${tablerIconsPublicPath}manifest.json`;

const getTablerIconManifest = () => readdirSync(tablerIconsOutlinePath, { withFileTypes: true })
  .filter((directoryEntry) => directoryEntry.isFile() && directoryEntry.name.endsWith('.svg'))
  .map((directoryEntry) => directoryEntry.name.replace(/\.svg$/, ''))
  .sort((left, right) => left.localeCompare(right))
  .map((iconKey) => ({
    key: iconKey,
    label: iconKey
      .split('-')
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' '),
  }));

const tablerIconsManifest = JSON.stringify(getTablerIconManifest(), null, 2);

const copyDirectory = (sourcePath: string, targetPath: string) => {
  mkdirSync(targetPath, { recursive: true });

  for (const directoryEntry of readdirSync(sourcePath, { withFileTypes: true })) {
    const sourceEntryPath = resolve(sourcePath, directoryEntry.name);
    const targetEntryPath = resolve(targetPath, directoryEntry.name);

    if (directoryEntry.isDirectory()) {
      copyDirectory(sourceEntryPath, targetEntryPath);
      continue;
    }

    copyFileSync(sourceEntryPath, targetEntryPath);
  }
};

const getRequestPathname = (requestPath: string) => decodeURIComponent(requestPath.split('?')[0] ?? '');

const resolveTablerIconPath = (requestPath: string) => {
  const relativeIconPath = getRequestPathname(requestPath)
    .replace(tablerIconsPublicPath, '');

  if (!relativeIconPath || relativeIconPath.includes('..') || !relativeIconPath.endsWith('.svg')) {
    return null;
  }

  const resolvedIconPath = resolve(tablerIconsOutlinePath, relativeIconPath);

  if (!resolvedIconPath.startsWith(tablerIconsOutlinePath)) {
    return null;
  }

  return resolvedIconPath;
};

const tablerIconsPlugin = (): Plugin => {
  let outputDirectory = '';

  return {
    name: 'tabler-icons-plugin',
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir);
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const requestPath = request.url ?? '';
        const requestPathname = getRequestPathname(requestPath);

        if (!requestPath.startsWith(tablerIconsPublicPath)) {
          next();
          return;
        }

        if (requestPathname === tablerIconsManifestPath) {
          response.setHeader('Content-Type', 'application/json; charset=utf-8');
          response.end(tablerIconsManifest);
          return;
        }

        const iconPath = resolveTablerIconPath(requestPath);

        if (typeof iconPath !== 'string' || !existsSync(iconPath)) {
          response.statusCode = 404;
          response.end();
          return;
        }

        response.setHeader('Content-Type', 'image/svg+xml');
        response.end(readFileSync(iconPath));
      });
    },
    writeBundle() {
      const tablerIconsOutputDirectory = resolve(outputDirectory, 'tabler-icons', 'outline');

      copyDirectory(tablerIconsOutlinePath, tablerIconsOutputDirectory);
      writeFileSync(resolve(tablerIconsOutputDirectory, 'manifest.json'), tablerIconsManifest);
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tablerIconsPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
});
