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

    this.fpsText = this.add.text(0, 0, "FPS: 0", {
      fontSize: "42px",
      color: "#FFFF00",
    });

    /* Animation Process to implement
      const anims = this.anims;
  anims.create({
    key: "misa-left-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-right-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-front-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-back-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });

  // Animation updates
  if (cursors.left.isDown) {
    player.anims.play("misa-left-walk", true);
  } else if (cursors.right.isDown) {
    player.anims.play("misa-right-walk", true);
  } else if (cursors.up.isDown) {
    player.anims.play("misa-back-walk", true);
  } else if (cursors.down.isDown) {
    player.anims.play("misa-front-walk", true);
  } else {
    player.anims.stop();

  // Idle frames
   if (prevVelocity.x < 0) player.setTexture("atlas", "misa-left");
    else if (prevVelocity.x > 0) player.setTexture("atlas", "misa-right");
    else if (prevVelocity.y < 0) player.setTexture("atlas", "misa-back");
    else if (prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
    */
  }

  update(time, delta) {
    const fps = this.sys.game.loop.actualFps;
    this.fpsText.setText(`FPS: ${Math.round(fps)}`);
  }
}
