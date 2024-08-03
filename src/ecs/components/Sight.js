import { Component } from "geotic";
import Phaser from "phaser";

export class Sight extends Component {
  constructor({ range, fov }) {
    super();

    this.player_sighted = false;
    this.range = null || range;
    this.fov = null || Math.PI / fov;
    this.sight_cone = null;
  }

  onCreateSightCone(evt) {
    const { facing_angle } = evt.data;
    const leftAngle = facing_angle - this.fov;
    const rightAngle = facing_angle + this.fov;
    const end_x1 = this.entity.position.x + this.range * Math.cos(leftAngle);
    const end_y1 = this.entity.position.y + this.range * Math.sin(leftAngle);
    const end_x2 = this.entity.position.x + this.range * Math.cos(rightAngle);
    const end_y2 = this.entity.position.y + this.range * Math.sin(rightAngle);

    this.sight_cone = new Phaser.Geom.Triangle(
      this.entity.position.x,
      this.entity.position.y,
      end_x1,
      end_y1,
      end_x2,
      end_y2
    );
  }

  onUpdateSightCone(evt) {
    this.entity.fireEvent("create-sight-cone", {
      facing_angle: evt.data.facing_angle,
    });
    evt.handle();
  }

  onPlayerSeen(evt) {
    this.player_sighted = true;
    evt.handle();
  }

  onPlayerLost(evt) {
    this.player_sighted = false;
    evt.handle();
  }

  onDestroy(evt) {
    evt.handle();
  }
}
