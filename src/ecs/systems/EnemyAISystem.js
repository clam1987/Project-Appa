import System from "../core/System";
import { IsEnemy, Enemy } from "../components";

export class EnemyAISystem extends System {
  constructor(game) {
    super(game);

    this.player = game.world.world.createQuery({
      all: [IsEnemy, Enemy],
    })._cache;
  }

  update(dt) {}
}
