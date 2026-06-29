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

/** @type {IdleAnimation} */
const idleAnimation = ({ object, deltaTime,absTime }) => {
  object.children[0].position.x=1

  object.rotation.set(0,Math.PI,(Math.sin(absTime/500)/7)+THREE.MathUtils.DEG2RAD*15)
};

/** @satisfies {AnimationObject} */
export const wheelchair = {
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
            position: new THREE.Vector3(30, -7.75, 0),
            scale: new THREE.Vector3(2, 2, 2),
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
          position: new THREE.Vector3(100, 100, -25),
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
        },
      },
    },
  ],
};
