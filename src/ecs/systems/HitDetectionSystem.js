import System from "../core/System";
import { Sight, PlayerSightBox } from "../components";

export class HitDetectionSystem extends System {
  constructor(game) {
    super(game);

    this.enemy = game.world.world.createQuery({
      any: [Sight, PlayerSightBox],
    })._cache;

    this.enemy_state = null;
  }

  update(dt) {}
}
