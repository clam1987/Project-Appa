export interface ComponentI {
  id?: string;
  properties?: Object;
  type: string;
}

export interface EntityI {
  id: string;
  components: Map<string, ComponentI>;
  addComponent(type: string, component: ComponentI): void;
  removeComponent(type: string): void;
  getComponent<T extends ComponentI>(type: string): T | undefined;
  forEachComponent(
    callback: (component: ComponentI, type: string) => void
  ): void;
}

export interface SystemI {
  update(dt: number): void;
}

export interface WorldI {
  addEntity(entity: EntityI): void;
  removeEntity(entityId: string): void;
  getEntity(entityId: string): EntityI | undefined;
  forEachEntity(callback: (entity: EntityI) => void): void;
}

export interface EventListenerI {
  (e: any): void;
}

export interface SceneI {
  name: string;
  prefabs: string[];
}

export interface PrefabI {
  name: string;
  components: [];
}

export interface AssetsI {}

export interface SystemI {}

export interface CartridgeI {
  name: string;
  total_players: number;
  data: {
    scenes: SceneI[];
  };
}
