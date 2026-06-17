import { ECS } from "@/lib/ecs.mjs";
/** @import { System, Component } from "@/lib/ecs.mjs" */

/** @implements {Component} */
export class Component3D {
  /**
   * @param {string} path
   * @param {number} scale
   */
  constructor(path, scale = 1) {
    /** @type {string} */
    this.path = path;

    /** @type {number} */
    this.scale = scale;
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

/** @implements {Component} */
export class Loading {
  /**
   * @param {Promise<any>} promise
   */
  constructor(promise) {
    /** @type {Promise<any>} */
    this.promise = promise;
  }
}

/** @implements {Component} */
export class Active {}

/** @implements {System} */
export class LoadModels {
  /**
   * @param {ECS} world
   */
  update(world) {
    for (const [entity, loading, component3d] of world.view(
      Loading,
      Component3D,
    )) {
      if (world.getComponent(entity, Loaded)) continue;

      loading.promise
        .then((asset) => {
          world.addComponent(entity, new Loaded(asset));
          world.removeComponent(entity, Loading)
        })
        .catch((err) => {
          console.error("Failed to load model:", component3d.path, err);
        });
    }
  }
}
