import { Component } from "geotic";

export class PhaserData extends Component {
  constructor() {
    super();
    this.phaser_ref = null;
    this.key = null;
  }

  onPhaserDataLoaded(evt) {
    this.phaser_ref = evt.data.phaser_ref;
    this.key = evt.data.phaser_ref.texture.key;
    evt.handle();
  }
}
