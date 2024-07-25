import { Component } from "geotic";

export class Animation extends Component {
  static properties = {
    key: "",
    play: false,
    loop: false,
    finished: false,
  };

  onAnimationStart(evt) {
    this.play = true;
    this.finished = false;
  }

  onAnimationStop(evt) {
    this.play = false;
  }

  onAnimationComplete(evt) {
    this.finished = true;
  }
}
