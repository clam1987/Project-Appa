import Phaser from "phaser";
import Phaser_config from "../../utils/configs";
import ECS from "..";
import World from "./World";
import {
  MovementSystem,
  SpriteLoaderSystem,
  ImageLoaderSystem,
  CameraSystem,
  PhysicsSystem,
  AnimationSystem,
  ActionSystem,
  EnemyAISystem,
  SightSystem,
} from "../systems";
import { InputManager, SceneManager, TileMapManager } from "../managers";

export default class Game {
  #last_update;
  phaser;
  scene;

  constructor(config, canvas_container) {
    this.config = config;
    this.ecs = new ECS(this);
    this.world = new World(this);
    this.systems = new Map();
    this.managers = new Map();
    this.initialize(config);
    this.initializeSystems();
    this.initializeManagers();
    this.phaser = null;

    window.game = this;
  }

  async initialize() {
    if (!this.config) return console.error("Incorrect config!");
    this.config.data.prefabs.forEach((prefab) => {
      this.ecs.engine.registerPrefab(prefab);
    });

    const scenes = await this.loadScene();
    this.phaser = new Phaser.Game({
      ...Phaser_config,
      scene: scenes,
    });

    this.phaser.events.on("ready", () => {
      console.log("phaser is ready");
      this.phaser.events.on("step", this.runtime, this);
      this.managers.get("sceneManager").initialize();
      this.managers.get("inputManager").initialize();
    });
  }

  initializeSystems() {
    this.systems.set("spriteLoaderSystem", new SpriteLoaderSystem(this));
    this.systems.set("movementSystem", new MovementSystem(this));
    this.systems.set("imageLoaderSystem", new ImageLoaderSystem(this));
    this.systems.set("cameraSystem", new CameraSystem(this));
    this.systems.set("physicsSystem", new PhysicsSystem(this));
    this.systems.set("animationSystem", new AnimationSystem(this));
    this.systems.set("actionSystem", new ActionSystem(this));
    this.systems.set("enemyAISystem", new EnemyAISystem(this));
    this.systems.set("sightSystem", new SightSystem(this));
  }

  initializeManagers() {
    this.managers.set("inputManager", new InputManager(this));
    this.managers.set("sceneManager", new SceneManager(this));
    this.managers.set("tileMapManager", new TileMapManager(this));
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
    this.systems.forEach((system) => {
      system.update(dt);
    });
  }

  runtime(_, delta) {
    this.update(delta);
    this.#last_update = Date.now();
  }

  destroy() {
    this.world.destroyWorld(this.world);
    this.phaser.destroy(true);
  }
}
