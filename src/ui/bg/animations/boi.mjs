import {
  attendees,
  feelings,
  getSectionOffsets,
  intro,
  steps,
} from "../sections.mjs";
import * as THREE from "three";
/**
 * @import {AnimationObject, IdleAnimation} from "../animation-system.mjs"
 */

/** @type {IdleAnimation} */
const idleAnimation = ({ deltaTime, object }) => {
  object.rotation.y += deltaTime * 0.001;
  object.rotation.x = Math.sin(4);
  object.rotation.z = Math.sin(0.5);
};

/** @satisfies {AnimationObject} */
export const accessibilityBoy = {
  segments: [
    {
      steps: [
        {
          get offset() {
            return getSectionOffsets(intro).startOffset;
          },
          startTransform: {
            position: new THREE.Vector3(100, -50, -50),
            scale: new THREE.Vector3(1, 1, 1),
          },
          idleAnimation,
        },
        {
          get offset() {
            return getSectionOffsets(attendees).startOffset;
          },
          startTransform: {
            position: new THREE.Vector3(-45, 0, -5),
            scale: new THREE.Vector3(1.5, 1.5, 1.5),
          },
          idleAnimation,
        },
        {
          get offset() {
            return getSectionOffsets(steps).startOffset;
          },
          startTransform: {
            position: new THREE.Vector3(-100, 50, -25),
            scale: new THREE.Vector3(0.5, 0.5, 0.5),
          },
          idleAnimation,
        },
      ],

      end: {
        get offset() {
          return getSectionOffsets(feelings).startOffset;
        },

        transform: {
          position: new THREE.Vector3(-200, 50, -25),
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
        },
      },
    },
  ],
};
