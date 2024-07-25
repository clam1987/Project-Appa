import System from "../core/System";
import { Sprite } from "../components";

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
    const scene_manager = this.game.managers.get("sceneManager");
    const scene = scene_manager.getScene(scene_manager.current_scene);
    const phaser_sprite = scene.physics.add.sprite(
      position.x,
      position.y,
      sprite.key,
      sprite.sprite_start
    );
    if (sprite.height !== null && sprite.width !== null) {
      phaser_sprite.setDisplaySize(sprite.width, sprite.height);
    }
    entity.fireEvent("sprite-loaded");
    entity.fireEvent("phaser-data-loaded", { phaser_ref: phaser_sprite });
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
