import { IsPlayer, Action } from "../components";
import System from "../core/System";

export class ActionSystem extends System {
  constructor(game) {
    super(game);

    this.action = game.world.world.createQuery({
      all: [IsPlayer, Action],
    })._cache;
    this.action_complete = false;
    this.action_in_progress = false;
  }

  processAction() {
    const input_manager = this.game.managers.get("inputManager");
    this.action_in_progress = true;
    // if (input_manager.keys.attack.isDown) {
    //   this.action.forEach((action) => {
    //     if (action.animation.finished) {
    //       // Should check equipment type but will implement later
    //       //   action.fireEvent("process-action", { key: "melee" });
    //     }
    //   });
    // }
  }

  actionComplete() {
    this.action_complete = true;
  }

  update(dt) {
    if (!this.action_complete && !this.action_in_progress) {
      this.processAction();
    }
  }
}
