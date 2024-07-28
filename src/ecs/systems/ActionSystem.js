import { IsPlayer, Action, Animation } from "../components";
import System from "../core/System";

export class ActionSystem extends System {
  constructor(game) {
    super(game);

    this.player_action = game.world.world.createQuery({
      all: [IsPlayer],
    })._cache;
    this.action_complete = false;
    this.action_in_progress = false;
  }

  processAction() {
    const input_manager = this.game.managers.get("inputManager");
    const input_stack = input_manager
      .getInputs()
      .filter((input) => input.type !== "movement");
    input_stack.forEach((action) => {
      switch (action.type) {
        case "action":
          input_manager.actionInProgress();
          this.player_action.forEach((player) => {
            if (!player.has(Action)) {
              player.add(Action);
            }
            player.fireEvent("process-action", { key: "melee", input_manager });
          });
          break;
        default:
          break;
      }
    });
  }

  destroy() {
    this.game.world.world.events.off(
      "action-start",
      this.handleActionStart,
      this
    );
    this.game.world.world.events.off(
      "action-complete",
      this.handleActionComplete,
      this
    );
  }

  update(dt) {
    if (!this.action_complete && !this.action_in_progress) {
      this.processAction();
    }
  }
}
