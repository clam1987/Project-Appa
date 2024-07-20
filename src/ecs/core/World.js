import ECS from "..";

export default class World {
  constructor(config, game) {
    this.ecs = new ECS(game);
    this.world = this.ecs.engine.createWorld();
    this.initialize(config);
  }

  initialize(config) {
    console.log(this.ecs.engine);
    console.log(config);
    config.data.prefabs.forEach((prefab) => {
      this.ecs.engine.registerPrefab(prefab);
    });
  }

  createEntity(prefabName, components) {
    const entity = this.ecs.engine.createPrefab(prefabName, components);
    return entity;
  }

  destroyEntity(entity) {
    this.ecs.engine.destroyEntity(entity);
  }

  update(dt) {}
}
