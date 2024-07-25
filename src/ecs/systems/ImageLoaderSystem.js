import System from "../core/System";
import { Image } from "../components";

export class ImageLoaderSystem extends System {
  constructor(game) {
    super(game);

    this.active_scene = null;
    this.image = game.world.world.createQuery({
      all: [Image],
    })._cache;
    this.imagesLoaded = false;
  }

  loadImage(entity) {
    const { position, image } = entity;
    const scene_manager = this.game.managers.get("sceneManager");
    const scene = scene_manager.getScene(scene_manager.current_scene);
    const phaser_image = scene.add.image(position.x, position.y, image.key);
    phaser_image.setDisplaySize(image.width, image.height);
    entity.fireEvent("image-loaded", { phaser_ref: phaser_image });
    entity.fireEvent("phaser-data-loaded", { phaser_ref: phaser_image });
  }

  preloadComplete() {
    this.imagesLoaded = true;
  }

  offLoadComplete() {
    this.imagesLoaded = false;
  }

  update(dt) {
    for (const entity of this.image) {
      if (!entity.image.loaded && this.imagesLoaded) {
        this.loadImage(entity);
      }
    }
  }
}
