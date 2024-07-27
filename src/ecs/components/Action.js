import { Component } from "geotic";
import { Animation } from "./Animation";

export class Action extends Component {
  constructor() {
    super();
    this.actions = {
      melee: "melee",
      bow: "bow",
      magic: "magic",
    };
  }

  onProcessAction(evt) {
    const { key } = evt.data;
    console.log(this.actions[key]);
    switch (this.actions[key]) {
      case "melee":
        this.entity.add(Animation);
        break;
      case "bow":
        break;
      case "magic":
        break;
      default:
        console.log("no cases matched");
        break;
    }
  }

  onActionComplete(evt) {}
}
