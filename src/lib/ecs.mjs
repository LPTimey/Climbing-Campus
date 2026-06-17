// @ts-check

/**
 * @template T
 * @typedef {(new (...arg0: any[])=>T)} Constructor
 */

/**
 * @interface
 */
export class Component {}

/**
 * @interface
 */
export class System {
  /**
   * @param {ECS} world
   * @param {number} dt
   */
  update(world, dt) {}
}

export class ECS {
  constructor() {
    this.nextEntity = 0;

    /** @type {System[]} */
    this.systems = [];

    /** @type {Map<Constructor<Component>, Map<number, Component>>} */
    this.components = new Map();
  }

  /**
   * @returns {number}
   */
  createEntity() {
    return this.nextEntity++;
  }

  /**
   * @param {...Component} components
   * @returns {number}
   */
  spawn(...components) {
    const entity = this.createEntity();

    for (const component of components) {
      this.addComponent(entity, component);
    }

    return entity;
  }

  /**
   * @param {number} entity
   * @param {Component} component
   */
  addComponent(entity, component) {
    const type = /** @type {Constructor<typeof component>} */ (
      component.constructor
    );

    let store = this.components.get(type);

    if (!store) {
      store = new Map();
      this.components.set(type, store);
    }

    store.set(entity, component);
  }

  /**
   * @template {Component} T
   * @param {number} entity
   * @param {Constructor<T>} type
   * @returns {T | undefined}
   */
  getComponent(entity, type) {
    return /** @type {T | undefined} */ (
      this.components.get(type)?.get(entity)
    );
  }

  /**
   * @template {Component} T
   * @param {number} entity
   * @param {Constructor<T>} type
   */
  removeComponent(entity, type) {
    this.components.get(type)?.delete(entity);
  }

  /**
   * @param {number} entity
   */
  destroyEntity(entity) {
    for (const store of this.components.values()) {
      store.delete(entity);
    }
  }

  /**
   * @param {...Constructor<Component>} components
   * @returns {number[]}
   */
  query(...components) {
    if (components.length === 0) {
      return [];
    }

    const firstStore = this.components.get(components[0]);

    if (!firstStore) {
      return [];
    }

    const entities = [];

    for (const entity of firstStore.keys()) {
      let matches = true;

      for (let i = 1; i < components.length; i++) {
        const store = this.components.get(components[i]);

        if (!store?.has(entity)) {
          matches = false;
          break;
        }
      }

      if (matches) {
        entities.push(entity);
      }
    }

    return entities;
  }

  /**
   * @param {...Constructor<Component>} components
   * @param {Constructor<Component>[]} without
   * @returns {number[]}
   */
  query_without(without,...components) {
    if (components.length === 0) {
      return [];
    }

    const firstStore = this.components.get(components[0]);

    if (!firstStore) {
      return [];
    }

    const entities = [];

    for (const entity of firstStore.keys()) {
      let matches = true;

      for (let i = 1; i < components.length; i++) {
        const store = this.components.get(components[i]);

        if (!store?.has(entity)) {
          matches = false;
          break;
        }
      }

      for (let i = 1; i < without.length; i++) {
        const store = this.components.get(without[i]);

        if (store?.has(entity)) {
          matches = false;
          break;
        }
      }

      if (matches) {
        entities.push(entity);
      }
    }

    return entities;
  }

  /**
   * @template {Constructor<Component>[]} T
   * @param {T} Components
   * @returns {Generator<
   *   [number, ...{ [K in keyof T]: T[K] extends Constructor<infer U> ? U : never }]
   * >}
   */
  *view(...Components) {
    for (const entity of this.query(...Components)) {
      const comps = /** @type {any[]} */ ([]);

      for (let i = 0; i < Components.length; i++) {
        comps[i] = this.getComponent(entity, Components[i]);
      }

      yield /** @type {any} */ ([entity, ...comps]);
    }
  }

  /**
   * @template {Constructor<Component>[]} T
   * @template {Constructor<Component>[]} W
   * @param {T} Components
   * @param {W} With
   * @returns {Generator<
   *   [number, ...{ [K in keyof T]: T[K] extends Constructor<infer U> ? U : never }]
   * >}
   */
  *view_with(With,...Components) {
    for (const entity of this.query(...Components,...With)) {
      const comps = /** @type {any[]} */ ([]);

      for (let i = 0; i < Components.length; i++) {
        comps[i] = this.getComponent(entity, Components[i]);
      }

      yield /** @type {any} */ ([entity, ...comps]);
    }
  }
  /**
   * @template {Constructor<Component>[]} T
   * @template {Constructor<Component>[]} W
   * @param {T} Components
   * @param {W} Without
   * @returns {Generator<
   *   [number, ...{ [K in keyof T]: T[K] extends Constructor<infer U> ? U : never }]
   * >}
   */
  *view_without(Without,...Components) {
    for (const entity of this.query_without(Without,...Components)) {
      const comps = /** @type {any[]} */ ([]);

      for (let i = 0; i < Components.length; i++) {
        comps[i] = this.getComponent(entity, Components[i]);
      }

      yield /** @type {any} */ ([entity, ...comps]);
    }
  }

  /**
   * @param {System} system
   */
  addSystem(system) {
    this.systems.push(system);
  }

  /**
   * @param {number} dt
   */
  update(dt) {
    for (const system of this.systems) {
      system.update(this, dt);
    }
  }
}

function example() {
  // ----------------------------
  // Example
  // ----------------------------

  /** @implements {Component} */
  class Position {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }

  /** @implements {Component} */
  class Velocity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }

  /** @implements {System} */
  class MovementSystem {
    /**
     * @param {ECS} world
     * @param {number} dt
     */
    update(world, dt) {
      for (const [, position, velocity] of world.view(Position, Velocity)) {
        position.x += velocity.x * dt;
        position.y += velocity.y * dt;
        position.z += velocity.z * dt;
      }
    }
  }

  const world = new ECS();

  world.addSystem(new MovementSystem());

  const player = world.spawn(new Position(10, 20, 30), new Velocity(1, 0.5, 2));

  console.log(world.getComponent(player, Position));

  world.update(1);
  console.log(world.getComponent(player, Position));

  world.update(4);
  console.log(world.getComponent(player, Position));
}
