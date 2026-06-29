import {
  attendees,
  feelings,
  getSectionOffsets,
  outline,
  steps,
  ux
} from "../sections.mjs";
import { defaultEntryExitAnimation } from "../animation-system.mjs";
import * as THREE from "three";
/**
 * @import {AnimationObject, IdleAnimation} from "../animation-system.mjs"
 */

const axis = new THREE.Vector3(1, 1, 1).normalize();

/** @type {IdleAnimation} */
const idleAnimation = ({ object, deltaTime,absTime }) => {
    object.children[0].children[0].rotateOnAxis(axis, (deltaTime * THREE.MathUtils.DEG2RAD);
};

/** @satisfies {AnimationObject} */
export const stress = {
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
            // position: new THREE.Vector3(0,0,0),
            position: new THREE.Vector3(-32, -4.5, 0),
            scale: new THREE.Vector3(2.5, 2.5, 2.5),
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
