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

    this.input_manager = null;
  }

  onProcessAction(evt) {
    const { key, input_manager } = evt.data;
    this.input_manager = input_manager;
    switch (this.actions[key]) {
      case "melee":
        if (!this.entity.has(Animation)) {
          this.entity.add(Animation, { type: "sword_attack" });
        }
        break;
      case "bow":
        break;
      case "magic":
        break;
      default:
        console.log("no cases matched");
        break;
    }

    evt.handle();
  }

  onActionComplete(evt) {
    if (this.input_manager) {
      this.input_manager.actionComplete();
      this.input_manager = null;
    }
    this.entity.remove(this);
    evt.handle();
  }
}
