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

/** @type {THREE.Vector3|null} */
let originalPosition1 = null;
/** @type {THREE.Vector3|null} */
let originalPosition2 = null;

/** @type {IdleAnimation} */
const idleAnimation1 = ({ object, absTime }) => {
  const child = object.children[0];

  if (!originalPosition1) {
    originalPosition1 = child.position.clone();
  }

  const offset = Math.sin(absTime / 200) / 5;

  child.position.set(
    originalPosition1.x,
    originalPosition1.y,
    originalPosition1.z + offset
  );
};
/** @type {IdleAnimation} */
const idleAnimation2 = ({ object, absTime }) => {
  const child = object.children[0];

  if (!originalPosition2) {
    originalPosition2 = child.position.clone();
  }

  const offset = Math.sin(absTime / 200) / 5;

  child.position.set(
    originalPosition2.x,
    originalPosition2.y,
    originalPosition2.z + offset
  );
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
        }
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
          idleAnimation: idleAnimation1,
        },
      ],

      end: {
        get offset() {
          return (
            getSectionOffsets(ux).startOffset
          );
        },

        transform: {
          position: new THREE.Vector3(0, 100, -25),
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
          rotation: new THREE.Quaternion().setFromEuler(
            new THREE.Euler(THREE.MathUtils.DEG2RAD*15, THREE.MathUtils.DEG2RAD*-45, THREE.MathUtils.DEG2RAD*5)
          )
        },
      },
    },{

      ...defaultEntryExitAnimation(
        { 
          scale: new THREE.Vector3(0, 0, 0),
          rotation: new THREE.Quaternion().setFromEuler(
              new THREE.Euler(Math.PI/16, Math.PI/2, 0)
            )
        },
        {
          scale: new THREE.Vector3(1.5, 1.5, 1.5),
          rotation: new THREE.Quaternion().setFromEuler(
            new THREE.Euler(Math.PI/16, Math.PI/2, 0)
          )
        },
      ),
      steps: [
        {
          get offset() {
            return (
              getSectionOffsets(ux).startOffset
            );
          },
          startTransform: {
            position: new THREE.Vector3(6.5, -3, 5),
            scale: new THREE.Vector3(1.5, 1.5, 1.5),
            rotation: new THREE.Quaternion().setFromEuler(
              new THREE.Euler(Math.PI/16, Math.PI/2, 0)
            )
          },
          idleAnimation: idleAnimation2,
        },
      ],

      end: {
        get offset() {
          return (
            getSectionOffsets(ux).endOffset
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
