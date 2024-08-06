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
    const { sight_cone } = evt.data;

    this.sight_cone = sight_cone;

    evt.handle();
  }

  onUpdateSightCone(evt) {
    const { sight_cone } = evt.data;

    this.sight_cone = sight_cone;
    evt.handle();
  }

  onPlayerSeen(evt) {
    console.log("player seen");
    this.player_sighted = true;
    evt.handle();
  }

  onPlayerLost(evt) {
    console.log("player lost");
    this.player_sighted = false;
    evt.handle();
  }

  onDestroy(evt) {
    evt.handle();
  }
}
