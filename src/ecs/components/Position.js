import { Component } from "geotic";

export class Position extends Component {
  constructor({ x, y }) {
    super();
    this.x = x;
    this.y = y;
  }

  onUpdatePosition(evt) {
    const { x, y } = evt.data;
    this.x = x;
    this.y = y;
    console.log(`current X: ${this.x} and current Y: ${this.y}`);

    evt.handle();
  }
}
