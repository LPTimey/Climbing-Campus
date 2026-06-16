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

/**
 * 
 * @param {Object} param0 
 * @param {THREE.WebGLRenderer} param0.renderer
 * @param {THREE.PerspectiveCamera | THREE.OrthographicCamera} param0.camera
 * @param {THREE.Scene} param0.scene
 * @param {Animation} param0.animation
 * @returns {XRFrameRequestCallback}
 */
export function createAnimation({
  renderer,
  camera,
  scene,
  animation
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

    for (const [name, anim] of Object.entries(animation)) {

      if (!anim.state) {
        anim.state = {enum:"inactive"}
      }

      const activeSection = anim.segments.find(segment => {
        const start = resolveOffset(segment.startOffset);
        const end = resolveOffset(segment.endOffset) - 5;
        return scrollY >= start && scrollY <= end;
      });

      if (activeSection) {
        switch (anim.state.enum) {
          case "inactive":
            anim.state.enum = "activating";
            anim.state.startTime = time;
            break;

          default:
          case "active":
          case "activating":
          case "deactivating":
            break;
        }
      } else {
        switch (anim.state.enum) {
          case "active":
            anim.state.enum = "deactivating";
            anim.state.startTime = time;
            break;

          default:
          case "inactive":
          case "activating":
          case "deactivating":
            break;
        }
      }

      if (anim.state.enum === "inactive") {
        continue;
      }

      let object = scene.getObjectByName(name);

      if (!object) {
        const get = getObject(/** @type {keyof typeof objs} */(name));
        if (get instanceof Promise) {
          continue;
        }
        object = get;
        scene.add(object);
      }

      switch (anim.state.enum) {
        case "active":
          activeSection?.idleAnimation?.({ absTime: time, deltaTime, object });
          break;
        case "activating": {
          const done = anim.onEnter?.({ startTime: anim.state.startTime??time, absTime: time, deltaTime, object });
          if (done) anim.state.enum = "active";
        }
          break;
        case "deactivating": {
          const done = anim.onExit?.({ startTime: anim.state.startTime??time, absTime: time, deltaTime, object });
          if (done) anim.state.enum = "inactive";
        }
          break;
        default:
          break;
      }
      if (!activeSection) {
        continue;
      }
      const segmentLength = resolveOffset(activeSection.endOffset) - resolveOffset(activeSection.startOffset);
      if (segmentLength <= 0) continue;
      const rawT = (scrollY - resolveOffset(activeSection.startOffset)) / segmentLength;
      const easedT = activeSection.easing(rawT);
      lerpTransforms(activeSection, object, easedT);
    }
  });
}

/**
 * 
 * @param {Segment} segment 
 * @param {THREE.Object3D} object 
 * @param {number} t 
 */
function lerpTransforms(segment, object, t) {
  if (segment.startTransform.position && segment.endTransform.position) {
    object.position.lerpVectors(
      segment.startTransform.position,
      segment.endTransform.position,
      t,
    );
  }
  if (segment.startTransform.scale && segment.endTransform.scale) {
    object.scale.lerpVectors(
      segment.startTransform.scale,
      segment.endTransform.scale,
      t,
    );
  }
  if (segment.startTransform.rotation && segment.endTransform.rotation) {
    object.quaternion.slerpQuaternions(
      segment.startTransform.rotation,
      segment.endTransform.rotation,
      t,
    );
  }
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
 * @typedef {Object} Transform
 * @property {THREE.Vector3} position
 * @property {THREE.Vector3} scale
 * @property {THREE.Quaternion} rotation
 */

/**
 * @typedef {(params:{
 *   absTime:number,
 *   deltaTime:number,
 *   object: THREE.Object3D
 * }) => void} IdleAnimation
 */

/**
 * return true when finished
 * @typedef {(params:{
 *   startTime:number,
 *   absTime:number,
 *   deltaTime:number,
 *   object: THREE.Object3D
 * }) => boolean} SingleAnimation
 */

/**
 * @typedef {Object} Segment
 * @property {number | (() => number)} startOffset
 * @property {number | (() => number)} endOffset
 * @property {Partial<Transform>} startTransform
 * @property {Partial<Transform>} endTransform
 * @property {(t:number)=>number} easing
 * @property {IdleAnimation} [idleAnimation]
 */

/**
 * @typedef {{enum:"inactive"|"activating"|"active"|"deactivating",startTime?:number}} AnimationState
 */

/**
 * @typedef {Object} AnimationObject
 * @property {AnimationState} [state]
 * @property {Segment[]} segments
 * @property {SingleAnimation} [onEnter]
 * @property {SingleAnimation} [onExit]
 */

/**
 * @typedef {Partial<Record<keyof typeof objs, AnimationObject>>} Animation
 */
