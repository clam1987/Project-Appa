import { Component } from "geotic";

export class Camera extends Component {
  constructor({ x, y, width, height }) {
    super();

    this.x = null || x;
    this.y = null || y;
    this.width = width || null;
    this.height = height || null;
  }
}
