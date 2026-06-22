import { ECS } from "@/lib/ecs.mjs";
import { objs } from "./objects.mjs";
import { loaders } from "@/lib/three_utils.mjs";
/** @import { System, Component } from "@/lib/ecs.mjs" */
/** @import { Loaders } from "@/lib/three_utils.mjs" */

/** @implements {Component} */
export class Component3D {
  /**
   * @param {number} scale
   */
  constructor(scale = 1) {
    /** @type {number} */
    this.scale = scale;
  }
}

/** @implements {Component} */
export class Loader {
  /**
   * @param {string} path
   * @param {keyof Loaders["threeD"]} type
   */
  constructor(path, type) {
    /** @type {string} */
    this.path = path;
    this.type = type;
  }
}

/** @implements {Component} */
export class Loaded {
  /**
   * @param {any} asset
   */
  constructor(asset) {
    /** @type {any} */
    this.asset = asset;
  }
}

/**
 * @implements {Component}
 */
export class Loading {
  started = false;
}

/** @implements {Component} */
export class Active {}

/** @implements {System} */
export class LoadModels {
  /**
   * @param {ECS} world
   */
  update(world) {
    for (const [entity, loading, loader] of world.view(Loading, Loader)) {
      if (world.getComponent(entity, Loaded)) {
        world.removeComponent(entity, Loading);
        continue;
      }
      if (loading.started) {
        continue;
      }
      loading.started = true;
      loaders.threeD[loader.type].load(loader.path, (data) => {
        world.removeComponent(entity, Loading);
        world.addComponent(entity, new Loaded(data));
      });
    }
  }
}

/** @implements {System} */
export class loadedModels {
  /**
   * @param {ECS} world
   */
  update(world) {
    for (const [entity, loaded] of world.view(Loaded)) {
      console.log(entity);
    }
  }
}

const world = new ECS();
world.addSystem(new LoadModels());
world.addSystem(new LoadModels());
const boy = world.spawn(
  new Component3D(1),
  new Loader(objs.accessibilityBoy.path, objs.accessibilityBoy.type),
);
world.addComponent(boy, new Loading());
