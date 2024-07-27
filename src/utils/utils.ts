export const camelCase = (str: string) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index: number) =>
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+/g, "");

export const loadAssets = async (assets: any, game_name: string) => {
  const loaded_assets = new Map();

  for (const asset of assets) {
    const { name, path } = asset;
    if (isHttps(path)) {
      const res = await fetch(asset.json_path);
      const json = await res.json();
      if (asset?.name) {
        loaded_assets.set(name, {
          path,
          json,
          json_name: asset.json_name,
        });
      } else {
        loaded_assets.set(name, { path, json });
      }
    } else {
      const img_path = await import(`../${path}`);
      if (asset?.json_name) {
        const json = await import(`../${asset.json_path}`);
        loaded_assets.set(name, {
          path: img_path.default,
          json: json.default,
          json_name: asset.json_name,
        });
      } else if (asset?.json_path) {
        const json = await import(`../${asset.json_path}`);
        loaded_assets.set(name, { json: json.default, path: img_path.default });
      } else {
        loaded_assets.set(name, img_path.default || img_path);
      }
    }
  }

  return loaded_assets;
};

const isHttps = (url_string: string) => {
  try {
    const url = new URL(url_string);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch (err) {
    return false;
  }
};
