import {
  attendees,
  feelings,
  getSectionOffsets,
  intro,
  outline,
  steps,
} from "../sections.mjs";
import * as THREE from "three";
/**
 * @import {AnimationObject, IdleAnimation} from "../animation-system.mjs"
 */

/** @type {IdleAnimation} */
const idleAnimation = ({ deltaTime, object }) => {
  object.rotation.z += deltaTime * 0.001;
  object.rotation.x += deltaTime * 0.001;
};

/** @satisfies {AnimationObject} */
export const steps3D = {
  segments: [
    {
      steps: [
        {
          get offset() {
            return getSectionOffsets(intro).startOffset;
          },
          startTransform: {
            position: new THREE.Vector3(-55, 15, 10),
            scale: new THREE.Vector3(1, 1, 1),
          },
          idleAnimation,
        },
        {
          get offset() {
            return (
              getSectionOffsets(attendees).startOffset
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
              getSectionOffsets(steps).startOffset
            );
          },
          startTransform: {
            position: new THREE.Vector3(-45, 0, -5),
            scale: new THREE.Vector3(1.5, 1.5, 1.5),
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
            position: new THREE.Vector3(-100, 50, -25),
            scale: new THREE.Vector3(0.5, 0.5, 0.5),
          },
          idleAnimation,
        },
      ],

      end: {
        get offset() {
          return (
            getSectionOffsets(outline).startOffset
          );
        },

        transform: {
          position: new THREE.Vector3(-200, 50, -25),
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
        },
      },
    },
  ],
};
