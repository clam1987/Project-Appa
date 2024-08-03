import { Component } from "geotic";

export class Text extends Component {
  constructor({ text, style }) {
    super();

    this.text = null || text;
    this.style = null || style;
  }
}
