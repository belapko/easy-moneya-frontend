export interface TablerIconManifestItem {
  key: string;
  label: string;
}

const TABLER_ICON_ASSET_PATH = '/tabler-icons/outline';
const TABLER_ICON_MANIFEST_PATH = `${TABLER_ICON_ASSET_PATH}/manifest.json`;
const DEFAULT_TABLER_ICON_KEY = 'currency-rubel';

const iconSvgCache = new Map<string, string>();
const pendingIconSvgRequests = new Map<string, Promise<string>>();

export const loadTablerIconSvg = async (iconKey?: string | null): Promise<string> => {
  const tablerIconKey = iconKey ?? DEFAULT_TABLER_ICON_KEY;
  const cachedIconSvg = iconSvgCache.get(tablerIconKey);

  if (cachedIconSvg) {
    return cachedIconSvg;
  }

  const pendingRequest = pendingIconSvgRequests.get(tablerIconKey);

  if (pendingRequest) {
    return pendingRequest;
  }

  const iconRequest = fetch(`${TABLER_ICON_ASSET_PATH}/${tablerIconKey}.svg`)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to load Tabler icon "${tablerIconKey}"`);
      }

      const iconSvg = await response.text();

      iconSvgCache.set(tablerIconKey, iconSvg);
      pendingIconSvgRequests.delete(tablerIconKey);

      return iconSvg;
    })
    .catch(async () => {
      pendingIconSvgRequests.delete(tablerIconKey);

      if (tablerIconKey === DEFAULT_TABLER_ICON_KEY) {
        return '';
      }

      return loadTablerIconSvg(DEFAULT_TABLER_ICON_KEY);
    });

  pendingIconSvgRequests.set(tablerIconKey, iconRequest);

  return iconRequest;
};

export const loadTablerIconManifest = async (): Promise<TablerIconManifestItem[]> => {
  const response = await fetch(TABLER_ICON_MANIFEST_PATH);

  if (!response.ok) {
    throw new Error('Failed to load Tabler icon manifest');
  }

  return response.json();
};

export {
  DEFAULT_TABLER_ICON_KEY,
  TABLER_ICON_ASSET_PATH,
  TABLER_ICON_MANIFEST_PATH,
};
