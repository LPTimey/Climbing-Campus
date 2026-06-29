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
const idleAnimation = ({ object, deltaTime, absTime }) => {
  object.children[0].children[0].rotation.set(0,THREE.MathUtils.DEG2RAD*(absTime/7)%360,0)
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
            rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(
              THREE.MathUtils.DEG2RAD * 27.4, THREE.MathUtils.DEG2RAD*130, THREE.MathUtils.DEG2RAD*41.8
            ))
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
          rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(
            THREE.MathUtils.DEG2RAD * 27.4, THREE.MathUtils.DEG2RAD*130, THREE.MathUtils.DEG2RAD*41.8
          ))
        },
      },
    },
  ],
};
