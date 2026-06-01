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
        startTransform: {
          position: new THREE.Vector3(-55, 15, 10)
        },
        endTransform: {
          position: new THREE.Vector3(10, 5, 0)
        },

        easing: easing.easeOutCubic,

        onEnter({ startTime, absTime, object }) {
          const durationSecs = 1 * 1000;
          const scale1 = 0;
          const scale2 = 1;
          const t = THREE.MathUtils.clamp((absTime - startTime) / (durationSecs), 0, 1);
          const scale = THREE.MathUtils.lerp(scale1, scale2, t);
          object.scale.set(scale,scale,scale);
          return t >= 1;
        },
        onExit({ startTime, absTime, object }) {
          const durationSecs = 1 * 1000;
          const scale1 = 1;
          const scale2 = 0;
          const t = THREE.MathUtils.clamp((absTime - startTime) / (durationSecs), 0, 1);
          const scale = THREE.MathUtils.lerp(scale1, scale2, t);
          object.scale.set(scale, scale, scale);
          return t >= 1;
        },

        idleAnimation({ deltaTime, object }) {
          object.rotation.z += deltaTime * 0.001;
          object.rotation.x += deltaTime * 0.001;
        },
      },

      accessibilityBoy: {
        startTransform: {
          position: new THREE.Vector3(100, -50, -50)
        },
        endTransform: {
          position: new THREE.Vector3(-10, 0, 0)
        },

        easing: easing.easeInOutQuad,

        onEnter({ startTime, absTime, object }) {
          const durationSecs = 1 * 1000;
          const scale1 = 0;
          const scale2 = 1;
          const t = THREE.MathUtils.clamp((absTime - startTime) / (durationSecs), 0, 1);
          const scale = THREE.MathUtils.lerp(scale1, scale2, t);
          object.scale.set(scale, scale, scale);
          return t >= 1;
        },
        onExit() { return true },

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
        startTransform: {
          position: new THREE.Vector3(-10, 0, 0)
        },
        endTransform: {
          position: new THREE.Vector3(0, 10, 0)
        },

        easing: easing.linear,

        onEnter() { return true },
        onExit({ startTime, absTime, object }) {
          const durationSecs = 1 * 1000;
          const scale1 = 1;
          const scale2 = 0;
          const t = THREE.MathUtils.clamp((absTime - startTime) / (durationSecs), 0, 1);
          const scale = THREE.MathUtils.lerp(scale1, scale2, t);
          object.scale.set(scale, scale, scale);
          return t >= 1;
        },


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

      for (const [name, animation] of /** @type {[string,AnimationObject][]} */(Object.entries(segment.objects))) {
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

        lerpTransforms(animation, object, easedT);

        animation.idleAnimation({ absTime: time, deltaTime, object });
      }
    }
  });
}

/**
 * 
 * @param {AnimationObject} animation 
 * @param {THREE.Object3D} object 
 * @param {number} t 
 */
function lerpTransforms(animation, object, t) {
  if (animation.startTransform.position && animation.endTransform.position) {
    object.position.lerpVectors(
      animation.startTransform.position,
      animation.endTransform.position,
      t,
    );
  }
  if (animation.startTransform.scale && animation.endTransform.scale) {
    object.scale.lerpVectors(
      animation.startTransform.scale,
      animation.endTransform.scale,
      t,
    );
  }
  if (animation.startTransform.rotation && animation.endTransform.rotation) {
    object.quaternion.slerpQuaternions(
      animation.startTransform.rotation,
      animation.endTransform.rotation,
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
 * @typedef {(params:{absTime:number, deltaTime: number, object: THREE.Object3D}) => void} IdleAnimation
 */
/**
 * @typedef {(params:{startTime:number, absTime:number, deltaTime: number, object: THREE.Object3D}) => boolean} SingleAnimation
 */

/**
 * @typedef {Object} Transform
 * @property {THREE.Vector3} position
 * @property {THREE.Vector3} scale
 * @property {THREE.Quaternion} rotation
 */

/**
 * @typedef {Object} AnimationObject
 * @property {Partial<Transform>} startTransform
 * @property {Partial<Transform>} endTransform
 * @property {SingleAnimation} onEnter
 * @property {SingleAnimation} onExit
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
