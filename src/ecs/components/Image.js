import { Component } from "geotic";

export class Image extends Component {
  constructor({ key, width, height }) {
    super();
    this.key = key;
    this.height = width;
    this.width = height;
    this.loaded = false;
    this.phaser_ref = null;
  }

  onImageLoaded(evt) {
    console.log("image loaded!");
    this.phaser_ref = evt.data.phaser_ref;
    this.loaded = true;
    evt.handle();
  }

  onOffLoadImage(evt) {
    this.loaded = false;
    evt.handle();
  }
}
