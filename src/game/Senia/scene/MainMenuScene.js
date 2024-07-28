import Phaser from "phaser";
import { loadAssets } from "../../../utils/utils";

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenuScene" });
    this.world = window.game.world;
    this.fpsText = null;
    this.config = this.world.ecs.game.config;
  }

  async preload() {
    const image_assets = await loadAssets(
      this.config.data.assets.images,
      this.config.name
    );

    const sprite_assets = await loadAssets(
      this.config.data.assets.sprites,
      this.config.name
    );

    const tilemap_assets = await loadAssets(
      this.config.data.assets.tilemaps,
      this.config.name
    );

    sprite_assets.forEach(({ path, json }, name) => {
      this.load.atlas(name, path, json);
    });

    image_assets.forEach((path, name) => {
      this.load.image(name, path);
    });

    tilemap_assets.forEach((key, name) => {
      this.load.image(name, key.path);
      this.load.tilemapTiledJSON(key.json_name, key.json);
    });

    this.load.start();

    this.load.on("complete", () => {
      const systems = this.world.ecs.game.systems;
      systems.forEach((sys) => {
        sys.initialize();
      });
      const tilemap_manager =
        this.world.ecs.game.managers.get("tileMapManager");
      tilemap_manager.loadTileMap(this, this.config.data.assets.tilemaps[0]);
    });
  }

  create() {
    const { prefabs } = this.config.data.scenes.find(
      (scene) => scene.name === "MainMenuScene"
    );

    console.log("Loading Prefabs...");
    this.config.data.prefabs.forEach(({ name, components }) => {
      if (prefabs.includes(name)) {
        this.world.createEntity(name, components);
      }
    });

    this.fpsText = this.add
      .text(0, 0, "FPS: 0", {
        fontSize: "42px",
        color: "#FFFF00",
      })
      .setScrollFactor(0)
      .setDepth(999);
  }

  update(time, delta) {
    const fps = this.sys.game.loop.actualFps;
    this.fpsText.setText(`FPS: ${Math.round(fps)}`);
  }
}
