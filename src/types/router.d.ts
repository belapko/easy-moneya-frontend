import { RouteMeta as AppRouteMeta } from '@/constants/RouteMeta.ts';

declare module 'vue-router' {
  interface RouteMeta {
    [AppRouteMeta.ONLY_AUTHORIZED]?: boolean;
  }
}

export {};
