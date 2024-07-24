import { Position, IsPlayer, PhaserData } from "../components";
import Phaser from "phaser";
import System from "../core/System";

export class MovementSystem extends System {
  constructor(game) {
    super(game);

    this.position = game.world.world.createQuery({
      any: [Position, IsPlayer, PhaserData],
    })._cache;
  }

  updatePlayerPosition() {
    const input_manager = this.game.managers.get("inputManager");
    const player_entities = this.position.filter(
      (entity) => entity.id === "Player"
    );

    let velocity_x = 0;
    let velocity_y = 0;
    const speed = 95;

    if (input_manager.keyA.isDown) {
      velocity_x -= 1;
    }
    if (input_manager.keyS.isDown) {
      velocity_y += 1;
    }
    if (input_manager.keyD.isDown) {
      velocity_x += 1;
    }
    if (input_manager.keyW.isDown) {
      velocity_y -= 1;
    }
    if (velocity_x !== 0 || velocity_y !== 0) {
      const velocity = new Phaser.Math.Vector2(velocity_x, velocity_y);
      velocity.normalize().scale(speed);
      this.setPlayerPosition(player_entities, velocity);
    } else {
      this.stopPlayerMovement(player_entities);
    }
    // if (input_manager.keyA.isDown) {
    //   this.setPlayerPosition(player_entities, -175, "left");
    // } else if (input_manager.keyS.isDown) {
    //   this.setPlayerPosition(player_entities, 175, "down");
    // } else if (input_manager.keyD.isDown) {
    //   this.setPlayerPosition(player_entities, 175, "right");
    // } else if (input_manager.keyW.isDown) {
    //   this.setPlayerPosition(player_entities, -175, "up");
    // } else {
    //   this.stopPlayerMovement(player_entities);
    // }
  }

  setPlayerPosition(player_entities, velocity) {
    player_entities.forEach((player) => {
      player.fireEvent("update-position", {
        x: player.phaserData.x,
        y: player.phaserData.y,
      });
      player.fireEvent("stop-entity-movement");
      player.fireEvent("update-entity-movement", {
        velocity,
      });
    });
  }

  //   setPlayerPosition(player_entities, velocity, orientation) {
  //     player_entities.forEach((player) => {
  //       player.fireEvent("update-position", {
  //         x: player.phaserData.x,
  //         y: player.phaserData.y,
  //       });
  //       player.fireEvent("stop-entity-movement");
  //       player.fireEvent("update-entity-movement", {
  //         velocity,
  //         orientation,
  //       });
  //     });
  //   }

  stopPlayerMovement(player_entities) {
    player_entities.forEach((player) => {
      player.fireEvent("stop-entity-movement");
    });
  }

  update(dt) {
    this.updatePlayerPosition();
  }
}
