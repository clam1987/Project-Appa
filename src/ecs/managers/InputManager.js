import Phaser from "phaser";
import Manager from "./Manager";
import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  ATTACK,
} from "../../utils/game_actions";

export class InputManager extends Manager {
  constructor(game) {
    super(game);

    this.keys = {};
    this.combos = {};
    this.input_stack = [];

    this.keyStates = {
      move_up: false,
      move_down: false,
      move_left: false,
      move_right: false,
    };
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
      debug: Phaser.Input.Keyboard.KeyCodes.BACKTICK,
      attack: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    scene.input.keyboard.on("keydown", (event) => {
      switch (event.code) {
        case "KeyW":
          this.keyStates.move_up = true;
          break;
        case "KeyS":
          this.keyStates.move_down = true;
          break;
        case "KeyA":
          this.keyStates.move_left = true;
          break;
        case "KeyD":
          this.keyStates.move_right = true;
          break;
        default:
          break;
      }
    });

    scene.input.keyboard.on("keyup", (event) => {
      switch (event.code) {
        case "KeyW":
          this.keyStates.move_up = false;
          break;
        case "KeyS":
          this.keyStates.move_down = false;
          break;
        case "KeyA":
          this.keyStates.move_left = false;
          break;
        case "KeyD":
          this.keyStates.move_right = false;
          break;
        default:
          break;
      }
      this.checkForStopMovement();
    });

    /* for keybinding implementation
    this.keybind = window.localStorage.getItem("keybind") || {};
    */
  }

  checkForStopMovement() {
    const allKeysReleased = Object.values(this.keyStates).every(
      (state) => !state
    );

    if (allKeysReleased) {
      const event = new CustomEvent("stopMovement");
      window.dispatchEvent(event);
    }
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

  getInputs() {
    const commands = [];

    if (this.keys.move_up.isDown) {
      commands.push({ type: "movement", direction: "up" });
    }
    if (this.keys.move_down.isDown) {
      commands.push({ type: "movement", direction: "down" });
    }
    if (this.keys.move_left.isDown) {
      commands.push({ type: "movement", direction: "left" });
    }
    if (this.keys.move_right.isDown) {
      commands.push({ type: "movement", direction: "right" });
    }

    return commands;
  }

  destroy() {
    const scene_manager = this.game.managers.get("sceneManager");
    const scene = scene_manager.getScene(scene_manager.current_scene);
    scene.input.keyboard.off("keydown", this.onKeyDown);
    scene.input.keyboard.off("keyup", this.onKeyUp);
  }
}
