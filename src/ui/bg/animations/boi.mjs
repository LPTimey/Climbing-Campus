import { easing } from "../animation-system.mjs";
import { attendees, getSectionOffsets, intro, steps } from "../animation.mjs";
import * as THREE from "three";
/**
 * @import {AnimationObject} from "../animation-system.mjs"
 */

/** @satisfies {AnimationObject} */
export const accessibilityBoy = {
  segments: [
    {
      easing: easing.easeInOutQuad,
      get startOffset() {
        return getSectionOffsets(intro).startOffset;
      },

      get endOffset() {
        return getSectionOffsets(intro).endOffset - window.innerHeight * 0.15;
      },
      startTransform: {
        position: new THREE.Vector3(100, -50, -50),
      },
      endTransform: {
        position: new THREE.Vector3(-45, 0, -5),
        scale: new THREE.Vector3(1.5, 1.5, 1.5),
      },
      idleAnimation({ deltaTime, object }) {
        object.rotation.y += deltaTime * 0.001;
        object.rotation.x = Math.sin(4);
        object.rotation.z = Math.sin(0.5);
      },
    },
    {
      easing: easing.easeInOutQuad,
      get startOffset() {
        return getSectionOffsets(intro).endOffset - window.innerHeight * 0.15;
      },

      get endOffset() {
        return (
          getSectionOffsets(attendees).endOffset - window.innerHeight * 0.15
        );
      },
      startTransform: {
        position: new THREE.Vector3(-45, 0, -5),
        scale: new THREE.Vector3(1.5, 1.5, 1.5),
      },
      endTransform: {
        position: new THREE.Vector3(-100, 50, -25),
        scale: new THREE.Vector3(0.5, 0.5, 0.5),
      },
      idleAnimation({ deltaTime, object }) {
        object.rotation.y += deltaTime * 0.001;
        object.rotation.x = Math.sin(4);
        object.rotation.z = Math.sin(0.5);
      },
    },
    {
      easing: easing.easeInOutQuad,
      get startOffset() {
        return (
          getSectionOffsets(attendees).endOffset - window.innerHeight * 0.15
        );
      },

      get endOffset() {
        return getSectionOffsets(steps).endOffset - window.innerHeight * 0.15;
      },
      startTransform: {
        position: new THREE.Vector3(-100, 50, -25),
        scale: new THREE.Vector3(0.5, 0.5, 0.5),
      },
      endTransform: {
        position: new THREE.Vector3(-200, 50, -25),
        scale: new THREE.Vector3(0.5, 0.5, 0.5),
      },
      idleAnimation({ deltaTime, object }) {
        object.rotation.y += deltaTime * 0.001;
        object.rotation.x = Math.sin(4);
        object.rotation.z = Math.sin(0.5);
      },
    },
  ],
  onEnter({ startTime, absTime, object }) {
    const durationSecs = 0.25 * 1000;
    const scale1 = 0;
    const scale2 = 1;
    const t = THREE.MathUtils.clamp((absTime - startTime) / durationSecs, 0, 1);
    const scale = THREE.MathUtils.lerp(scale1, scale2, t);
    object.scale.set(scale, scale, scale);
    return t >= 1;
  },
  onExit({ startTime, absTime, object }) {
    const durationSecs = 0.25 * 1000;
    const scale1 = 1;
    const scale2 = 0;
    const t = THREE.MathUtils.clamp((absTime - startTime) / durationSecs, 0, 1);
    const scale = THREE.MathUtils.lerp(scale1, scale2, t);
    object.scale.set(scale, scale, scale);
    return t >= 1;
  },
};
