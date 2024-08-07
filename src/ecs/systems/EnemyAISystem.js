import System from "../core/System";
import { IsEnemy, Idle, Patrol } from "../components";

export class EnemyAISystem extends System {
  constructor(game) {
    super(game);

    this.enemies = game.world.world.createQuery({
      any: [IsEnemy, Patrol, Idle],
    })._cache;
  }

  checkEnemyState() {
    this.enemies.forEach((enemy) => {
      switch (enemy.enemyData.state) {
        case "patrol":
          if (enemy.phaserData.phaser_ref) {
            if (!enemy.patrol) {
              enemy.add(Patrol, {
                distance: enemy.enemyData.patrol_distance,
                origin_point: {
                  x: enemy.phaserData.phaser_ref.x,
                  y: enemy.phaserData.phaser_ref.y,
                },
              });
            }
          }
          break;
        default:
          break;
      }
    });
  }

  update(dt) {
    this.checkEnemyState();
  }
}
