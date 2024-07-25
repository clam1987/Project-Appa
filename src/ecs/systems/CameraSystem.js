import System from "../core/System";
import { Camera } from "../components";

export class CameraSystem extends System {
  constructor(game) {
    super(game);

    this.player = game.world.world.createQuery({
      all: [Camera],
    })._cache;

    this.camera = null;
  }

  createCamera() {
    const scene_manager = this.game.managers.get("sceneManager");
    const scene = scene_manager.getScene(scene_manager.current_scene);
    if (scene) {
      this.camera = scene.cameras.main;
      this.player.forEach((player) => {
        if (player.phaserData.phaser_ref) {
          this.camera.startFollow(player.phaserData.phaser_ref);
          this.camera.setBounds(
            player.camera.x,
            player.camera.y,
            player.camera.width,
            player.camera.height
          );
          this.camera.setZoom(2);
          this.camera.centerOn(
            player.phaserData.phaser_ref.x,
            player.phaserData.phaser_ref.y
          );
        } else {
          // unload camera object so phaser_ref can load
          this.camera = null;
        }
      });
    }
  }

  update(dt) {
    if (!this.camera) {
      this.createCamera();
    }
  }
}
