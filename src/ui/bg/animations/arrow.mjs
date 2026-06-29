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
  object.children[0].position.add(new THREE.Vector3(0,0,Math.sin(absTime/200)/50))
};

/** @satisfies {AnimationObject} */
export const arrow = {
  segments: [
    {

      ...defaultEntryExitAnimation(
        { 
          scale: new THREE.Vector3(0, 0, 0),
          rotation: new THREE.Quaternion().setFromEuler(
              new THREE.Euler(THREE.MathUtils.DEG2RAD*15, THREE.MathUtils.DEG2RAD*-50, THREE.MathUtils.DEG2RAD*5)
            )
        },
        {
          scale: new THREE.Vector3(1.5, 1.5, 1.5),
          rotation: new THREE.Quaternion().setFromEuler(
            new THREE.Euler(THREE.MathUtils.DEG2RAD*15, THREE.MathUtils.DEG2RAD*-50, THREE.MathUtils.DEG2RAD*5)
          )
        },
      ),
      steps: [
        {
          get offset() {
            return (
              getSectionOffsets(outline).startOffset
            );
          },
          startTransform: {
            position: new THREE.Vector3(-0.5, -3, 5),
            scale: new THREE.Vector3(1.5, 1.5, 1.5),
            rotation: new THREE.Quaternion().setFromEuler(
              new THREE.Euler(THREE.MathUtils.DEG2RAD*15, THREE.MathUtils.DEG2RAD*-50, THREE.MathUtils.DEG2RAD*5)
            )
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
          rotation: new THREE.Quaternion().setFromEuler(
            new THREE.Euler(THREE.MathUtils.DEG2RAD*15, THREE.MathUtils.DEG2RAD*-45, THREE.MathUtils.DEG2RAD*5)
          )
        },
      },
    },
  ],
};
