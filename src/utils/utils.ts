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
    const img_path = await import(`../game/${game_name}/assets/${path}`);
    loaded_assets.set(name, img_path.default || img_path);
  }

  return loaded_assets;
};
