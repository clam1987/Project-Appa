import Manager from "./Manager";
import Phaser from "phaser";

export class TileMapManager extends Manager {
  constructor(game) {
    super(game);

    this.current_tilemap = null;
  }

  loadTileMap(scene, tilemap) {
    const map = scene.make.tilemap({
      key: tilemap.json_name,
    });
    const tileset = map.addTilesetImage(
      "tuxmon-sample-32px-extruded",
      tilemap.name
    );

    map.createLayer("Below Player", tileset, 0, 0);
    map.createLayer("World", tileset, 0, 0);
    map.createLayer("Above Player", tileset, 0, 0);

    this.current_tilemap = map;
  }

  displayDebugCollision() {
    const scene_manager = this.game.managers.get("sceneManager");
    const scene = scene_manager.getScene(scene_manager.current_scene);
    const layer = this.current_tilemap.getLayer("World").tilemapLayer;
    scene.physics.world.createDebugGraphic();
    this.debugCollision(scene, layer);
  }

  debugCollision(scene, layer) {
    const debugGraphics = scene.add.graphics().setAlpha(0.75).setDepth(20);
    layer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    });
  }
}
