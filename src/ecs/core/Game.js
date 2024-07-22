import Phaser from "phaser";
import Phaser_config from "../../utils/configs";
import ECS from "..";
import World from "./World";
import { SpriteLoaderSystem } from "../systems";

export default class Game {
  #last_update;
  phaser;
  scene;

  constructor(config) {
    this.config = config;
    this.ecs = new ECS(this);
    this.world = new World(this);
    this.systems = new Map();
    this.initialize(config);
    this.initializeSystems();
    this.phaser = null;

    window.game = this;
  }

  initialize() {
    if (!this.config) return console.error("Incorrect config!");
    this.config.data.prefabs.forEach((prefab) => {
      this.ecs.engine.registerPrefab(prefab);
    });

    this.loadScene()
      .then((scenes) => {
        this.phaser = new Phaser.Game({
          ...Phaser_config,
          scene: scenes,
        });

        scenes.forEach((scene) => {
          const original_update = scene.prototype.update || function () {};
          scene.prototype.update = (time, delta) => {
            this.runtime();
            original_update.call(
              this.phaser.scene.keys[scene.name],
              time,
              delta
            );
          };
        });
        this.phaser.scene.start("MainMenuScene");
      })
      .catch((err) => console.error(err));
  }

  initializeSystems() {
    this.systems.set("spriteLoaderSystem", new SpriteLoaderSystem(this));
  }

  async loadScene() {
    const scene = await Promise.all(
      this.config.data.scenes.map(async (scene) => {
        const module = await import(
          `../../game/${this.config.name}/scene/${scene.name}`
        );

        return module.default || module;
      })
    );

    return scene;
  }

  start() {
    this.#last_update = Date.now();
  }

  update(dt) {
    this.world.update(dt);
    this.systems.get("spriteLoaderSystem").update(dt);
  }

  runtime() {
    const now = Date.now();
    const dt = now - this.#last_update / 1000;

    this.update(dt);

    this.#last_update = now;
  }

  destroy() {
    this.ecs.engine.destroyWorld(this.world);
    this.phaser.destroy(true);
  }
}
