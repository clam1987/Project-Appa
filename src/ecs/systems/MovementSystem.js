import {
  Position,
  IsPlayer,
  PhaserData,
  Animation,
  IsEnemy,
} from "../components";
import Phaser from "phaser";
import System from "../core/System";

export class MovementSystem extends System {
  constructor(game) {
    super(game);

    this.player_position = game.world.world.createQuery({
      all: [Position, IsPlayer, PhaserData],
    })._cache;

    this.enemies_position = game.world.world.createQuery({
      all: [Position, IsEnemy, PhaserData],
    })._cache;

    // Flag for initial player movement so animation doesn't run while player entity spawns in.
    this.initial_movement = false;
  }

  initialize() {
    this.phaser_assets_loaded = true;

    const inputManager = this.game.managers.get("inputManager");
    if (inputManager) {
      inputManager.onStopMovement(this.handleStopMovement, this);
    }
  }

  handleStopMovement() {
    const player_entities = this.player_position.filter(
      (entity) => entity.id === "Player"
    );

    this.stopPlayerMovement(player_entities);
  }

  updatePlayerPosition() {
    const input_manager = this.game.managers.get("inputManager");
    const input_stack = input_manager
      .getInputs()
      .filter((input) => input.type === "movement");
    const player_entities = this.player_position.filter(
      (entity) => entity.id === "Player"
    );
    if (input_stack.length > 0) {
      let previous_position;

      let velocity_x = 0;
      let velocity_y = 0;
      const speed = 175;

      input_stack.forEach((input) => {
        if (input.type === "movement") {
          switch (input.direction) {
            case "back":
              velocity_y -= 1;
              previous_position = "back";
              break;
            case "front":
              velocity_y += 1;
              previous_position = "front";
              break;
            case "left":
              velocity_x -= 1;
              previous_position = "left";
              break;
            case "right":
              velocity_x += 1;
              previous_position = "right";
              break;
            default:
              break;
          }
        }
      });

      if (velocity_x !== 0 || velocity_y !== 0) {
        const velocity = new Phaser.Math.Vector2(velocity_x, velocity_y);
        velocity.normalize().scale(speed);
        this.setPlayerPosition(player_entities, velocity, previous_position);
      }
    }
  }

  setPlayerPosition(player_entities, velocity, previous_position) {
    this.initial_movement = true;
    player_entities.forEach((player) => {
      player.add(Animation, { type: "movement" });
      player.fireEvent("update-entity-movement", {
        velocity,
        x: player.phaserData.phaser_ref.x,
        y: player.phaserData.phaser_ref.y,
        previous_position,
      });
      player.fireEvent("update-sight-box-position", {
        x: player.phaserData.phaser_ref.x,
        y: player.phaserData.phaser_ref.y,
      });
    });
  }

  stopPlayerMovement(player_entities) {
    player_entities.forEach((player) => {
      if (this.initial_movement) {
        player.add(Animation, { type: "stop_movement" });
        player.fireEvent("stop-entity-movement", {
          initial_movement: this.initial_movement,
        });
      }
    });
  }

  destroy() {
    const inputManager = this.game.managers.get("inputManager");
    inputManager.offStopMovement(this.handleStopMovement, this);
  }

  update(dt) {
    if (this.phaser_assets_loaded) {
      this.updatePlayerPosition();
    }
  }
}
