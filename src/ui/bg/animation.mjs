"use strict";

import { easing } from "./animation-system.mjs";
import * as THREE from "three"

/**
 * @import {Animation} from "./animation-system.mjs"
 */

/** @satisfies {Animation} */
export const animations = {
  stairs: {
    segments: [{
      easing: easing.easeInOutQuad,
      startOffset: 0,
      endOffset: () => window.innerHeight,
      startTransform: {
        position: new THREE.Vector3(-55, 15, 10)
      },
      endTransform: {
        position: new THREE.Vector3(10, 5, 0)
      },
      idleAnimation({ deltaTime, object }) {
        object.rotation.z += deltaTime * 0.001;
        object.rotation.x += deltaTime * 0.001;
      },
    }],
    onEnter({ startTime, absTime, object }) {
      const durationSecs = 0.25 * 1000;
      const scale1 = 0;
      const scale2 = 1;
      const t = THREE.MathUtils.clamp((absTime - startTime) / (durationSecs), 0, 1);
      const scale = THREE.MathUtils.lerp(scale1, scale2, t);
      object.scale.set(scale, scale, scale);
      return t >= 1;
    },
    onExit({ startTime, absTime, object }) {
      const durationSecs = 0.25 * 1000;
      const scale1 = 1;
      const scale2 = 0;
      const t = THREE.MathUtils.clamp((absTime - startTime) / (durationSecs), 0, 1);
      const scale = THREE.MathUtils.lerp(scale1, scale2, t);
      object.scale.set(scale, scale, scale);
      return t >= 1;
    },
  },
  accessibilityBoy:{
    segments: [{
      easing: easing.easeInOutQuad,
      startOffset: 0,
      endOffset: () => window.innerHeight,
      startTransform: {
        position: new THREE.Vector3(100, -50, -50)
      },
      endTransform: {
        position: new THREE.Vector3(-10, 0, 0)
      },
      idleAnimation({ deltaTime, object }) {
        object.rotation.y += deltaTime * 0.001;
        object.rotation.x = Math.sin(4);
        object.rotation.z = Math.sin(0.5);
      },
    }],
    onEnter({ startTime, absTime, object }) {
      const durationSecs = 0.25 * 1000;
      const scale1 = 0;
      const scale2 = 1;
      const t = THREE.MathUtils.clamp((absTime - startTime) / (durationSecs), 0, 1);
      const scale = THREE.MathUtils.lerp(scale1, scale2, t);
      object.scale.set(scale, scale, scale);
      return t >= 1;
    },
    onExit({ startTime, absTime, object }) {
      const durationSecs = 0.25 * 1000;
      const scale1 = 1;
      const scale2 = 0;
      const t = THREE.MathUtils.clamp((absTime - startTime) / (durationSecs), 0, 1);
      const scale = THREE.MathUtils.lerp(scale1, scale2, t);
      object.scale.set(scale, scale, scale);
      return t >= 1;
    },
  },
}
