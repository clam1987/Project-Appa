import { camelCase } from "../../utils/utils";
export default class World {
  constructor(game) {
    this.ecs = game.ecs;
    this.world = this.ecs.engine.createWorld();
  }

  createEntity(prefabName, components) {
    const entity = this.world.createEntity(prefabName);

    const component_list = this.ecs.engine._components._map;

    components.forEach(({ type, properties }) => {
      const component_class = component_list[camelCase(type)];
      entity.add(component_class, properties ? properties : {});
    });

    return entity;
  }

  destroyEntity(entity) {
    this.ecs.engine.destroyEntity(entity);
  }

  update(dt) {
    this.ecs.update(dt);
  }
}
