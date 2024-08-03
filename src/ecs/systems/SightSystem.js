import System from "../core/System";
import { IsEnemy, Sight, IsPlayer } from "../components";
import {
  createCharacterRectangle,
  createSightTriangle,
} from "../../utils/utils";

export class SightSystem extends System {
  constructor(game) {
    super(game);

    this.enemy_sight = game.world.world.createQuery({
      all: [IsEnemy, Sight],
    })._cache;

    this.player_location = game.world.world.createQuery({
      all: [IsPlayer],
    })._cache;
  }

  checkPlayerVicinity() {
    // console.log(this.enemy_sight);
    this.enemy_sight.forEach((enemy) => {
      const previous_position = enemy.position.previous_position;
      if (!enemy.sight.sight_cone) {
        enemy.fireEvent("create-sight-cone", {
          facing_angle:
            previous_position === "front"
              ? Math.PI / 2
              : previous_position === "back"
              ? (3 * Math.PI) / 2
              : previous_position === "left"
              ? Math.PI
              : 0,
        });
      } else {
        enemy.fireEvent("update-sight-cone", {
          facing_angle:
            previous_position === "front"
              ? Math.PI / 2
              : previous_position === "back"
              ? (3 * Math.PI) / 2
              : previous_position === "left"
              ? Math.PI
              : 0,
        });
      }
    });
  }

  getVisibleEntities() {
    const visibleEntities = [];
    this.player_location.forEach((player) => {});
  }

  update(dt) {
    this.checkPlayerVicinity();
  }
}
