import { Component } from "geotic";

export class Patrol extends Component {
  constructor({ distance, origin_point }) {
    super();

    this.distance = 0 || distance;
    this.origin_point = null || origin_point;
  }

  onReturnToOrigin(evt) {
    if (this.entity.phaserData.phaser_ref.x < this.origin_point.x) {
      this.entity.fireEvent("change-direction", { direction: "right" });
    } else if (this.entity.phaserData.phaser_ref.x > this.origin_point.x) {
      this.entity.fireEvent("change-direction", { direction: "left" });
    } else if (this.entity.phaserData.phaser_ref.y < this.origin_point.y) {
      this.entity.fireEvent("change-direction", { direction: "back" });
    } else if (this.entity.phaserData.phaser_ref.y > this.origin_point.y) {
      this.entity.fireEvent("change-direction", { direction: "front" });
    }

    evt.handle();
  }
}
