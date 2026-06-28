import {
  attendees,
  feelings,
  getSectionOffsets,
  outline,
  steps,
  ux
} from "../sections.mjs";
import * as THREE from "three";
/**
 * @import {AnimationObject, IdleAnimation} from "../animation-system.mjs"
 */

/** @type {IdleAnimation} */
const idleAnimation = ({ object, deltaTime }) => {
  object.rotateY(0.0015 * deltaTime);
};

/** @satisfies {AnimationObject} */
export const arrow = {
  segments: [
    {
      steps: [
        {
          get offset() {
            return (
              getSectionOffsets(outline).startOffset
            );
          },
          startTransform: {
            position: new THREE.Vector3(0, 0, 0),
            scale: new THREE.Vector3(1.5, 1.5, 1.5),
          },
          idleAnimation,
        },
      ],

      end: {
        get offset() {
          return (
            getSectionOffsets(ux).startOffset
          );
        },

        transform: {
          position: new THREE.Vector3(-100, 100, -25),
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
        },
      },
    },
  ],
};
