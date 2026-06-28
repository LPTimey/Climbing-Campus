"use strict";
import { resizeIfNeeded } from "@/lib/three_utils.mjs";
import { getObject } from "./objects.mjs";
import * as THREE from "three";
/** @import {objs} from "./objects.mjs" */

/** @satisfies {{[K in string]: ((t:number)=>number)}} */
export const easing = {
  linear: (t) => t,
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
};
/**
 * @param {SegmentStream} stream
 * @param {number} scrollY
 */
function getActiveStep(stream, scrollY) {
  for (let i = 0; i < stream.steps.length; i++) {
    const step = stream.steps[i];

    const start = resolveOffset(step.offset);

    const end =
      i + 1 < stream.steps.length
        ? resolveOffset(stream.steps[i + 1].offset)
        : resolveOffset(stream.end.offset);

    if (scrollY >= start && scrollY < end) {
      return {
        step,
        index: i,
        start,
        end,
      };
    }
  }

  return null;
}

/**
 *
 * @param {Object} param0
 * @param {THREE.WebGLRenderer} param0.renderer
 * @param {THREE.PerspectiveCamera | THREE.OrthographicCamera} param0.camera
 * @param {THREE.Scene} param0.scene
 * @param {Animation} param0.animation
 * @returns {XRFrameRequestCallback}
 */
export function createAnimation({ renderer, camera, scene, animation }) {
  let lastTime = 0;

  /**
   * @param {(absTime:number,deltaTime:number)=>*} fn
   */
  const animate = (fn) => {
    return /** @type {XRFrameRequestCallback} */ (time) => {
      const deltaTime = time - lastTime;

      resizeIfNeeded(renderer, camera);

      fn(time, deltaTime);

      lastTime = time;
      renderer.render(scene, camera);
    };
  };

  return animate((time, deltaTime) => {
    const scrollY = window.scrollY;

    for (const [name, anim] of Object.entries(animation)) {
      if (!anim.state) {
        anim.state = { enum: "inactive" };
      }

      let activeStream = null;
      let activeStepInfo = null;

      for (const stream of anim.segments) {
        const stepInfo = getActiveStep(stream, scrollY);

        if (stepInfo) {
          activeStream = stream;
          activeStepInfo = stepInfo;
          break;
        }
      }

      if (activeStepInfo) {
        switch (anim.state.enum) {
          case "inactive":
            anim.state.enum = "activating";
            anim.state.startTime = time;
            break;

          default:
            break;
        }
      } else {
        switch (anim.state.enum) {
          case "active":
            anim.state.enum = "deactivating";
            anim.state.startTime = time;
            break;

          default:
            break;
        }
      }

      if (anim.state.enum === "inactive") {
        continue;
      }

      let object = scene.getObjectByName(name);

      if (!object) {
        const get = getObject(/** @type {keyof typeof objs} */ (name));

        if (get instanceof Promise) {
          continue;
        }

        object = get;
        scene.add(object);
      }

      switch (anim.state.enum) {
        case "active":
          activeStepInfo?.step.idleAnimation?.({
            absTime: time,
            deltaTime,
            object,
          });
          break;

        case "activating": {
          const done = (
            activeStream?.onEnter ??
            defaultOnEnter(
              { scale: new THREE.Vector3(0, 0, 0) },
              { scale: new THREE.Vector3(1, 1, 1) },
            )
          )({
            startTime: anim.state.startTime ?? time,
            absTime: time,
            deltaTime,
            object,
          });

          if (done) {
            anim.state.enum = "active";
          }
          break;
        }

        case "deactivating": {
          const done = (
            activeStream?.onExit ??
            defaultOnExit(
              { scale: new THREE.Vector3(0, 0, 0) },
              { scale: new THREE.Vector3(1, 1, 1) },
            )
          )({
            startTime: anim.state.startTime ?? time,
            absTime: time,
            deltaTime,
            object,
          });

          if (done) {
            anim.state.enum = "inactive";
          }
          break;
        }
      }

      if (!activeStream || !activeStepInfo) {
        continue;
      }

      const { step, index, start, end } = activeStepInfo;

      const segmentLength = end - start;

      if (segmentLength <= 0) {
        continue;
      }

      const t = THREE.MathUtils.clamp((scrollY - start) / segmentLength, 0, 1);

      const endTransform =
        index + 1 < activeStream.steps.length
          ? activeStream.steps[index + 1].startTransform
          : activeStream.end.transform;

      lerpTransforms(
        anim.state.enum == "activating"
          ? { position: step.startTransform.position }
          : step.startTransform,
        endTransform,
        object,
        t,
      );
    }
  });
}

/**
 * @param {Partial<Transform>} startTransform
 * @param {Partial<Transform>} endTransform
 * @param {THREE.Object3D} object
 * @param {number} t
 */
function lerpTransforms(startTransform, endTransform, object, t) {
  if (startTransform.position && endTransform.position) {
    object.position.lerpVectors(
      startTransform.position,
      endTransform.position,
      t,
    );
  }

  if (startTransform.scale && endTransform.scale) {
    object.scale.lerpVectors(startTransform.scale, endTransform.scale, t);
  }

  if (startTransform.rotation && endTransform.rotation) {
    object.quaternion.slerpQuaternions(
      startTransform.rotation,
      endTransform.rotation,
      t,
    );
  }
}

/** @satisfies {(startTransform:Partial<Transform>,endTransform:Partial<Transform>)=>SingleAnimation} */
export const defaultOnEnter = (startTransform, endTransform) =>
  function ({ startTime, absTime, object }) {
    const durationSecs = 0.25 * 1000;
    const t = THREE.MathUtils.clamp((absTime - startTime) / durationSecs, 0, 1);

    if (startTransform.scale && endTransform.scale) {
      const scale = startTransform.scale.lerp(endTransform.scale, t);
      object.scale.copy(scale);
    } else if (startTransform.scale) {
      object.scale.copy(startTransform.scale);
    } else if (endTransform.scale) {
      object.scale.copy(endTransform.scale);
    }

    if (startTransform.rotation && endTransform.rotation) {
      const rotation = startTransform.rotation.slerp(endTransform.rotation, t);
      object.rotation.setFromQuaternion(rotation);
    } else if (startTransform.rotation) {
      object.rotation.setFromQuaternion(startTransform.rotation);
    } else if (endTransform.rotation) {
      object.rotation.setFromQuaternion(endTransform.rotation);
    }

    if (startTransform.position && endTransform.position) {
      const position = startTransform.position.lerp(endTransform.position, t);
      object.position.copy(position);
    } else if (startTransform.position) {
      object.position.copy(startTransform.position);
    } else if (endTransform.position) {
      object.position.copy(endTransform.position);
    }

    return t >= 1;
  };

/** @satisfies {(startTransform:Partial<Transform>,endTransform:Partial<Transform>)=>SingleAnimation} */
export const defaultOnExit = (startTransform, endTransform) =>
  function ({ startTime, absTime, object }) {
    const durationSecs = 0.25 * 1000;
    const t = THREE.MathUtils.clamp((absTime - startTime) / durationSecs, 0, 1);

    if (startTransform.scale && endTransform.scale) {
      const scale = endTransform.scale.lerp(startTransform.scale, t);
      object.scale.copy(scale);
    } else if (startTransform.scale) {
      object.scale.copy(startTransform.scale);
    } else if (endTransform.scale) {
      object.scale.copy(endTransform.scale);
    }

    if (startTransform.rotation && endTransform.rotation) {
      const rotation = endTransform.rotation.slerp(startTransform.rotation, t);
      object.rotation.setFromQuaternion(rotation);
    } else if (startTransform.rotation) {
      object.rotation.setFromQuaternion(startTransform.rotation);
    } else if (endTransform.rotation) {
      object.rotation.setFromQuaternion(endTransform.rotation);
    }

    if (startTransform.position && endTransform.position) {
      const position = endTransform.position.lerp(startTransform.position, t);
      object.position.copy(position);
    } else if (startTransform.position) {
      object.position.copy(startTransform.position);
    } else if (endTransform.position) {
      object.position.copy(endTransform.position);
    }

    return t >= 1;
  };

/**
 * @param {number | (() => number)} value
 */
function resolveOffset(value) {
  return typeof value === "function" ? value() : value;
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

/** @typedef {number | (() => number)} Offset */

/**
 * @typedef {Object} SegmentStream
 * @property {SegmentStreamStep[]} steps
 * @property {Object} end
 * @property {Offset} end.offset
 * @property {Partial<Transform>} end.transform
 * @property {SingleAnimation} [onEnter]
 * @property {SingleAnimation} [onExit]
 */
/**
 * @typedef {Object} SegmentStreamStep
 * @property {Offset} offset
 * @property {Partial<Transform>} startTransform
 * @property {IdleAnimation} [idleAnimation]
 */

/**
 * @typedef {{enum:"inactive"|"activating"|"active"|"deactivating",startTime?:number}} AnimationState
 */

/**
 * @typedef {Object} AnimationObject
 * @property {AnimationState} [state]
 * @property {SegmentStream[]} segments
 */

/**
 * @typedef {Partial<Record<keyof typeof objs, AnimationObject>>} Animation
 */
