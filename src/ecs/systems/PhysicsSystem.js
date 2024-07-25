import System from "../core/System";
import { Physics } from "../components";

export class PhysicsSystem extends System {
  constructor(game) {
    super(game);

    this.world_collision_loaded = false;
    this.debug_collision = false;
    this.physics = game.world.world.createQuery({
      any: [Physics],
    })._cache;
  }

  addWorldCollision() {
    const scene_manager = this.game.managers.get("sceneManager");
    const scene = scene_manager.getScene(scene_manager.current_scene);
    const tilemap_manager = this.game.managers.get("tileMapManager");
    if (scene && tilemap_manager.current_tilemap) {
      const above_layer =
        tilemap_manager.current_tilemap.getLayer("Above Player").tilemapLayer;
      const world_layer =
        tilemap_manager.current_tilemap.getLayer("World").tilemapLayer;
      world_layer.setCollisionByProperty({ collides: true });
      above_layer.setDepth(20);
      this.physics.forEach((player) => {
        if (player.phaserData.phaser_ref) {
          scene.physics.add.collider(player.phaserData.phaser_ref, world_layer);
        }
      });

      this.world_collision_loaded = true;
    }
  }

  toggleDebugCollision() {
    const input_manager = this.game.managers.get("inputManager");
    if (!this.debug_collision && input_manager.keys.debug.isDown) {
      this.debug_collision = true;
      this.game.managers.get("tileMapManager").displayDebugCollision();
    } else {
      this.debug_collision = false;
    }
  }

  update(dt) {
    if (!this.world_collision_loaded) {
      this.addWorldCollision();
    }

    this.toggleDebugCollision();
  }
}
