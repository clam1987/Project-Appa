import Phaser from "phaser";
import cat from "../assets/cat.png";
import { loadAssets } from "../../../utils/utils";

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenuScene" });
    this.world = window.game.world;
    this.fpsText = null;
    this.config = this.world.ecs.game.config;
  }

  async preload() {
    const assets = await loadAssets(
      this.config.data.assets.images,
      this.config.name
    );

    assets.forEach((path, name) => {
      this.load.image(name, path);
    });

    this.load.start();

    this.load.on("complete", () => {
      this.world.ecs.game.systems.get("spriteLoaderSystem").preloadComplete();
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

    this.fpsText = this.add.text(0, 0, "FPS: 0", {
      fontSize: "16px",
      color: "#FFFF00",
    });
  }

  update(time, delta) {
    const fps = this.sys.game.loop.actualFps;
    this.fpsText.setText(`FPS: ${Math.round(fps)}`);
  }
}
