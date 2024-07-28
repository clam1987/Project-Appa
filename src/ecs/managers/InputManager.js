import Phaser from "phaser";
import Manager from "./Manager";

export class InputManager extends Manager {
  #eventEmitter;
  constructor(game) {
    super(game);

    this.keys = {};
    this.combos = {};
    this.input_stack = [];
    this.action_in_progress = false;

    this.keyStates = {
      move_up: false,
      move_down: false,
      move_left: false,
      move_right: false,
    };
    this.#eventEmitter = new Phaser.Events.EventEmitter();
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
    const actionSystem = this.game.systems.get("actionSystem");
    if (actionSystem) {
      console.log(
        "current state of action in progres: ",
        actionSystem.action_in_progress
      );
      if (allKeysReleased && !this.action_in_progress) {
        this.#eventEmitter.emit("stopMovement");
      }
    }
  }

  onStopMovement(callback, context) {
    this.#eventEmitter.on("stopMovement", callback, context);
  }

  offStopMovement(callback, context) {
    this.#eventEmitter.off("stopMovement", callback, context);
  }

  actionComplete() {
    this.action_in_progress = false;
  }

  actionInProgress() {
    this.action_in_progress = true;
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
    const allKeysReleased = Object.values(this.keyStates).every(
      (state) => !state
    );

    if (this.keys.move_up.isDown && !this.action_in_progress) {
      commands.push({ type: "movement", direction: "back" });
    }
    if (this.keys.move_down.isDown && !this.action_in_progress) {
      commands.push({ type: "movement", direction: "front" });
    }
    if (this.keys.move_left.isDown && !this.action_in_progress) {
      commands.push({ type: "movement", direction: "left" });
    }
    if (this.keys.move_right.isDown && !this.action_in_progress) {
      commands.push({ type: "movement", direction: "right" });
    }

    if (this.keys.attack.isDown && allKeysReleased) {
      commands.push({ type: "action", direction: "" });
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
