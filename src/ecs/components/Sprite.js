import { Component } from "geotic";

export class Sprite extends Component {
  constructor({ key, width, height }) {
    super();
    this.key = key;
    this.height = width;
    this.width = height;
    this.loaded = false;
    this.phaser_ref = null;
  }

  onSpriteLoaded(evt) {
    console.log("sprite loaded!");
    this.loaded = true;
    evt.handle();
  }

  onOffLoadSprite(evt) {
    this.loaded = false;
    evt.handle();
  }
}
