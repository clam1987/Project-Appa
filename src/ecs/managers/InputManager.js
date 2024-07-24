import Phaser from "phaser";
import Manager from "./Manager";

export class InputManager extends Manager {
  constructor(game) {
    super(game);

    this.keys = {};
    this.keyA = null;
    this.keyS = null;
    this.keyD = null;
    this.keyW = null;
  }

  initialize() {
    const scene = this.game.managers
      .get("sceneManager")
      .getScene("MainMenuScene");

    this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  }
}
