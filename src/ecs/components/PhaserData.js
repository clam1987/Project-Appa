import { Component } from "geotic";

export class PhaserData extends Component {
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.phaser_ref = null;
  }

  onPhaserDataLoaded(evt) {
    this.phaser_ref = evt.data.phaser_ref;
    this.x = this.phaser_ref.x;
    this.y = this.phaser_ref.y;
    evt.handle();
  }

  onStopEntityMovement(evt) {
    if (this.phaser_ref) {
      this.phaser_ref.setVelocity(0);
    }
    evt.handle();
  }

  onUpdateEntityMovement(evt) {
    const { velocity } = evt.data;
    this.phaser_ref.setVelocity(0);
    this.phaser_ref.setVelocity(velocity.x, velocity.y);

    evt.handle();
  }
}
