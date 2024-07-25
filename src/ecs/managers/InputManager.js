import Phaser from "phaser";
import Manager from "./Manager";

export class InputManager extends Manager {
  constructor(game) {
    super(game);

    this.keys = {};
    this.combos = {};

    /* for keybinding implementation
    this.keybind = {};
    */
  }

  initialize() {
    const scene_manager = this.game.managers.get("sceneManager");
    const scene = scene_manager.getScene(scene_manager.current_scene);
    this.keys = scene.input.keyboard.addKeys({
      move_up: Phaser.Input.Keyboard.KeyCodes.W,
      move_down: Phaser.Input.Keyboard.KeyCodes.S,
      move_left: Phaser.Input.Keyboard.KeyCodes.A,
      move_right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    /* for keybinding implementation
    this.keybind = window.localStorage.getItem("keybind") || {};
    */
  }

  registerCombo(name, keys) {
    this.combos[name] = keys;
  }

  checkCombos() {
    for (let combo in this.combos) {
      const keys = this.combos[combo];
      if (keys.every((key) => this.keys[key])) {
        return combo;
      }
    }

    return null;
  }

  destroy() {
    const scene_manager = this.game.managers.get("sceneManager");
    const scene = scene_manager.getScene(scene_manager.current_scene);
    scene.input.keyboard.off("keydown", this.onKeyDown);
    scene.input.keyboard.off("keyup", this.onKeyUp);
  }
}
