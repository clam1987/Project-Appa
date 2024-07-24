import Manager from "./Manager";

export class SceneManager extends Manager {
  constructor(game) {
    super(game);

    this.active_scene = null;
    this.current_scene = null;
  }

  initialize() {
    this.scene_manager = this.game.phaser.scene;
    this.active_scene = this.scene_manager.getScenes(true);
    this.setScene(this.active_scene[0].sys.config.key);
    this.startScene(this.current_scene);
  }

  setScene(scene) {
    this.current_scene = scene;
  }

  getScene(scene_name) {
    this.scene_manager.getScene(scene_name);
  }

  startScene(scene) {
    this.scene_manager.start(scene);
    console.log(`${scene} started!`);
  }

  changeScene(scene) {}
}
