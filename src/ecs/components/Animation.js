import { Component } from "geotic";

export class Animation extends Component {
  static properties = {
    key: "",
    play: false,
    loop: false,
    finished: false,
  };
}
