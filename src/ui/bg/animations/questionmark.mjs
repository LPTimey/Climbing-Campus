import {
  attendees,
  feelings,
  getSectionOffsets,
  outline,
  steps,
} from "../animation.mjs";
import * as THREE from "three";
/**
 * @import {AnimationObject, IdleAnimation} from "../animation-system.mjs"
 */

/** @type {IdleAnimation} */
const idleAnimation = ({ object, deltaTime }) => {
  object.rotateY(0.0015 * deltaTime);
};

/** @satisfies {AnimationObject} */
export const questionMark = {
  segments: [
    {
      steps: [
        {
          get offset() {
            return (
              getSectionOffsets(attendees).startOffset
            );
          },
          startTransform: {
            position: new THREE.Vector3(-200, -50, -25),
            scale: new THREE.Vector3(0.5, 0.5, 0.5),
          },
          idleAnimation,
        },
        {
          get offset() {
            return (
              getSectionOffsets(steps).startOffset
            );
          },
          startTransform: {
            position: new THREE.Vector3(-100, -50, -25),
            scale: new THREE.Vector3(0.5, 0.5, 0.5),
          },
          idleAnimation,
        },
        {
          get offset() {
            return (
              getSectionOffsets(feelings).startOffset
            );
          },
          startTransform: {
            position: new THREE.Vector3(-45, -5, -5),
            scale: new THREE.Vector3(1.5, 1.5, 1.5),
          },
          idleAnimation,
        },
      ],

      end: {
        get offset() {
          return (
            getSectionOffsets(outline).endOffset - window.innerHeight
          );
        },

        transform: {
          position: new THREE.Vector3(-100, 100, -25),
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
        },
      },

      onEnter({ startTime, absTime, object }) {
        const durationSecs = 0.25 * 1000;

        const t = THREE.MathUtils.clamp(
          (absTime - startTime) / durationSecs,
          0,
          1,
        );

        const scale = THREE.MathUtils.lerp(0, 1, t);

        object.scale.set(scale, scale, scale);

        return t >= 1;
      },

      onExit({ startTime, absTime, object }) {
        const durationSecs = 0.25 * 1000;

        const t = THREE.MathUtils.clamp(
          (absTime - startTime) / durationSecs,
          0,
          1,
        );

        const scale = THREE.MathUtils.lerp(1, 0, t);

        object.scale.set(scale, scale, scale);

        return t >= 1;
      },
    },
  ],
};
