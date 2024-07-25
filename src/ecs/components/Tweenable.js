import { Component } from "geotic";

export class Tweenable extends Component {
  static properties = {
    properties: null, // { x: 100, y: 200 }
    duration: 1000,
    loop: false,
    tween: null,
  };

  onTweenStart(evt) {
    this.tween.restart();
  }

  onTweenStop(evt) {
    this.tween.stop();
  }

  onTweenComplete(evt) {
    this.loop ? this.tween.restart() : (this.tween = null);
  }
}
