import { Component } from "geotic";

export class Sprite extends Component {
  constructor({ key, width, height, sprite_start }) {
    super();
    this.key = key;
    this.height = null || height;
    this.width = null || width;
    this.sprite_start = sprite_start || null;
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
