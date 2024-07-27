import { Component } from "geotic";

export class Position extends Component {
  constructor({ x, y, previous_position }) {
    super();
    this.x = x;
    this.y = y;
    this.previous_position = null || previous_position;
  }

  onStopEntityMovement(evt) {
    const phaser_ref = this.entity.phaserData.phaser_ref;
    if (phaser_ref) {
      phaser_ref?.setVelocity(0);
      evt.handle();
    }
  }

  onUpdateEntityMovement(evt) {
    const { velocity, x, y, previous_position } = evt.data;
    const phaser_ref = this.entity.phaserData.phaser_ref;
    if (phaser_ref) {
      phaser_ref.setVelocity(0);
      phaser_ref.setVelocity(velocity.x, velocity.y);
      this.x = x;
      this.y = y;
      this.previous_position = previous_position;
      // console.log(
      //   `current X: ${this.x} and current Y: ${this.y} and current_position: ${this.previous_position}`
      // );
    }

    evt.handle();
  }
}
