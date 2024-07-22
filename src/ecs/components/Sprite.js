import { Component } from "geotic";

export class Sprite extends Component {
  constructor({ key }) {
    super();
    this.key = key;
    this.height = 0;
    this.width = 0;
    this.loaded = false;
    this.phaser_ref = null;
  }

  onSpriteLoaded(evt) {
    console.log("sprite loaded!");
    this.phaser_ref = evt.data.phaser_ref;
    this.loaded = true;
    evt.handle();
  }

  onOffLoadSprite(evt) {
    this.loaded = false;
    evt.handle();
  }
}
