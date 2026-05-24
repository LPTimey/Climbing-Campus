"use strict";
import { resizeIfNeeded } from "@/lib/three_utils.mjs";
import { getObject } from "./objects.mjs";
import * as THREE from "three"
/** @import {objs} from "./objects.mjs" */

/** @satisfies {{[K in string]: ((t:number)=>number)}} */
export const easing = {
  linear: (t) => t,
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInOutQuad: (t) =>
    t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2,
};

/** @satisfies {Animation} */
const animationSegments = [
  {
    startScrollOffset: 0,
    endScrollOffset: () => window.innerHeight * 2,
    objects: {
      stairs: {
        startPos: new THREE.Vector3(-55, 15, 10),
        endPos: new THREE.Vector3(10, 5, 0),

        easing: easing.easeOutCubic,

        idleAnimation({ deltaTime, object }) {
          object.rotation.z += deltaTime * 0.001;
          object.rotation.x += deltaTime * 0.001;
        },
      },

      accessibilityBoy: {
        startPos: new THREE.Vector3(100, -50, -50),
        endPos: new THREE.Vector3(-10, 0, 0),

        easing: easing.easeInOutQuad,

        idleAnimation({ deltaTime, object }) {
          object.rotation.y += deltaTime * 0.001;
          object.rotation.x = Math.sin(4);
          object.rotation.z = Math.sin(0.5);
        },
      },
    },
  },

  {
    startScrollOffset: () => window.innerHeight * 2,
    endScrollOffset: () => window.innerHeight * 4,
    objects: {
      accessibilityBoy: {
        startPos: new THREE.Vector3(-10, 0, 0),
        endPos: new THREE.Vector3(0, 10, 0),

        easing: easing.linear,

        idleAnimation({ deltaTime, object }) {
          object.rotation.y += deltaTime * 0.001;
          object.rotation.x = 0;
          object.rotation.z = 0;
        },
      },
    },
  },
];

/**
 * 
 * @param {Object} param0 
 * @param {THREE.WebGLRenderer} param0.renderer
 * @param {THREE.PerspectiveCamera | THREE.OrthographicCamera} param0.camera
 * @param {THREE.Scene} param0.scene
 * @returns {XRFrameRequestCallback}
 */
export function createAnimation({
  renderer,
  camera,
  scene,
}) {
  let lastTime = 0;

  /**
   * 
   * @param {(absTime:number,deltaTime:number)=>*} fn 
   */
  const animate = (fn) => {
    return /** @type {XRFrameRequestCallback} */ (time) => {
      const deltaTime = time - lastTime;
      resizeIfNeeded(renderer, camera);

      fn(time, deltaTime)

      lastTime = time;
      renderer.render(scene, camera);
    }
  };

  return animate((time, deltaTime) => {
    const scrollY = window.scrollY;

    for (const segment of animationSegments) {
      if (
        scrollY < resolveOffset(segment.startScrollOffset) ||
        scrollY > resolveOffset(segment.endScrollOffset)
      ) {
        continue;
      }

      const segmentLength =
        resolveOffset(segment.endScrollOffset) - resolveOffset(segment.startScrollOffset);

      const rawT =
        (scrollY - resolveOffset(segment.startScrollOffset)) /
        segmentLength;

      for (const [name, animation] of Object.entries(segment.objects)) {
        let object = scene.getObjectByName(name);

        if (!object) {
          const get = getObject(/** @type {keyof typeof objs} */(name));
          if (get instanceof Promise) {
            continue;
          }
          object = get;
          scene.add(object);
        }
        const easedT = animation.easing(rawT);

        object.position.lerpVectors(
          animation.startPos,
          animation.endPos,
          easedT,
        );

        (/** @type {IdleAnimation} */(animation.idleAnimation))({ absTime: time, deltaTime, object });
      }
    }
  });
}

/**
 * @param {number | (() => number)} value
 */
function resolveOffset(value) {
  return typeof value === "function"
    ? value()
    : value;
}

/**
 * @typedef {(params:{absTime:number, deltaTime: number, object: THREE.Object3D}) => void} IdleAnimation
 */

/**
 * @typedef {Object} AnimationObject
 * @property {THREE.Vector3} startPos
 * @property {THREE.Vector3} endPos
 * Receives normalized progress (0-1)
 * and returns eased progress (0-1).
 * @property {(t: number) => number} easing
 * @property {IdleAnimation} idleAnimation
 */

/**
 * @typedef {Object} AnimationSegment
 * @property {number | (()=>number)} startScrollOffset
 * @property {number | (()=>number)} endScrollOffset
 * @property {Partial<Record<keyof typeof objs, AnimationObject>>} objects
 */

/**
 * @typedef {AnimationSegment[]} Animation
 */
