import System from "../core/System";
import Phaser from "phaser";
import { Sprite } from "../components";
import cat from "../../game/Senia/assets/cat.png";

export class SpriteLoaderSystem extends System {
  constructor(game) {
    super(game);

    this.active_scene = null;
    this.sprite = game.world.world.createQuery({
      all: [Sprite],
    })._cache;
    this.spritesLoaded = false;
  }

  loadSprite(entity) {
    const { position, sprite } = entity;
    const scene = this.game.phaser.scene.getScenes(true)[0];
    const phaser_sprite = scene.add.image(position.x, position.y, sprite.key);
    phaser_sprite.setDisplaySize(sprite.width, sprite.height);
    entity.fireEvent("sprite-loaded", { phaser_ref: phaser_sprite });
  }

  preloadComplete() {
    this.spritesLoaded = true;
  }

  offLoadComplete() {
    this.spritesLoaded = false;
  }

  update(dt) {
    for (const entity of this.sprite) {
      if (!entity.sprite.loaded && this.spritesLoaded) {
        this.loadSprite(entity);
      }
    }
  }
}
