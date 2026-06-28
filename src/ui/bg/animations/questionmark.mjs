import {
  attendees,
  feelings,
  getSectionOffsets,
  outline,
  steps,
} from "../sections.mjs";
import { defaultEntryExitAnimation } from "../animation-system.mjs";
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
      ...defaultEntryExitAnimation(
        { scale: new THREE.Vector3(0, 0, 0) },
        { scale: new THREE.Vector3(2, 2, 2) },
      ),
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
            position: new THREE.Vector3(-150, -75, -75),
            scale: new THREE.Vector3(2, 2, 2),
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
            position: new THREE.Vector3(-40, 0, -5),
            scale: new THREE.Vector3(6, 6, 6),
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
    },
  ],
};
