import { Component } from "geotic";

export class EnemyData extends Component {
  constructor({ state, direction, patrol_distance, speed }) {
    super();

    this.state = null || state;
    this.direction = null || direction;
    this.patrol_distance = 0 || patrol_distance;
    this.speed = 0 || speed;
  }

  onChangeDirection(evt) {
    const { direction } = evt.data;
    this.direction = direction;
    evt.handle();
  }
}
