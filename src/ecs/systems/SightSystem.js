import System from "../core/System";
import { IsEnemy, Sight, IsPlayer } from "../components";
import {
  createCharacterRectangle,
  createSightTriangle,
} from "../../utils/utils";
import Phaser from "phaser";

export class SightSystem extends System {
  constructor(game) {
    super(game);

    this.enemy_sight = game.world.world.createQuery({
      all: [IsEnemy, Sight],
    })._cache;

    this.player_location = game.world.world.createQuery({
      all: [IsPlayer],
    })._cache;

    this.debug_sight = false;
  }

  createSightAndPlayerBox() {
    this.enemy_sight.forEach((enemy) => {
      const previous_position = enemy.position.previous_position;
      const facing_angle =
        previous_position === "front"
          ? Math.PI / 2
          : previous_position === "back"
          ? (3 * Math.PI) / 2
          : previous_position === "left"
          ? Math.PI
          : 0;
      const triangle = createSightTriangle(
        enemy.position,
        enemy.sight.range,
        enemy.sight.fov,
        facing_angle,
        enemy.sprite.height,
        enemy.sprite.width
      );
      if (!enemy.sight.sight_cone) {
        enemy.fireEvent("create-sight-cone", { sight_cone: triangle });
      } else {
        enemy.fireEvent("update-sight-cone", { sight_cone: triangle });
      }
    });

    this.player_location.forEach((player) => {
      if (!player.playerSightBox.attached) {
        const player_sight_box = createCharacterRectangle(
          player.position,
          player.sprite.width,
          player.sprite.height
        );

        player.fireEvent("attach-sight-box", { rect: player_sight_box });
      }
    });
  }

  checkPlayerVicinity() {
    this.createSightAndPlayerBox();

    this.enemy_sight.forEach((enemy) => {
      if (
        Phaser.Geom.Intersects.RectangleToTriangle(
          this.player_location[0].playerSightBox.player_sight_box,
          enemy.sight.sight_cone
        )
      ) {
        enemy.fireEvent("player-seen");
      } else {
        if (enemy.sight.player_sighted) {
          enemy.fireEvent("player-lost");
        }
      }
    });
  }

  toggleDebugSight() {
    const input_manager = this.game.managers.get("inputManager");
    const debug_key = input_manager.getInputs();
    debug_key.forEach((command) => {
      if (command.type === "debug") {
        const scene_manager = this.game.managers.get("sceneManager");
        const scene = scene_manager.getScene(scene_manager.current_scene);
        this.debug_graphics = scene.add.graphics({
          lineStyle: { width: 2, color: 0xff0000 },
          fillStyle: { color: 0xff0000, alpha: 0.3 },
        });
        if (!this.debug_sight) {
          this.debug_sight = true;
        } else {
          if (this.debug_graphics) {
            this.debug_graphics.clear();
          }
          this.debug_sight = false;
        }
      }
    });
  }

  drawDebug() {
    this.debug_graphics.clear();
    this.enemy_sight.forEach((enemy) => {
      if (enemy.sight.sight_cone) {
        this.debug_graphics.fillTriangleShape(enemy.sight.sight_cone);
        this.debug_graphics.strokeTriangleShape(enemy.sight.sight_cone);
      }
    });

    this.player_location.forEach((player) => {
      if (player.playerSightBox.player_sight_box) {
        this.debug_graphics.strokeRectShape(
          player.playerSightBox.player_sight_box
        );
      }
    });
  }

  update(dt) {
    this.checkPlayerVicinity();
    this.toggleDebugSight();
    if (this.debug_sight) {
      this.drawDebug();
    }
  }
}
