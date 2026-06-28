import {
  attendees,
  feelings,
  getSectionOffsets,
  intro,
  outline,
  steps,
} from "../sections.mjs";
import { defaultEntryExitAnimation } from "../animation-system.mjs";
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
      ...defaultEntryExitAnimation(
        { scale: new THREE.Vector3(0, 0, 0) },
        { scale: new THREE.Vector3(3, 3, 3) },
      ),
      steps: [
        {
          get offset() {
            return getSectionOffsets(intro).startOffset;
          },
          startTransform: {
            position: new THREE.Vector3(-55, 15, 10),
            scale: new THREE.Vector3(3, 3, 3),
          },
          idleAnimation,
        },
        {
          get offset() {
            return getSectionOffsets(attendees).startOffset;
          },
          startTransform: {
            position: new THREE.Vector3(-150, -75, -75),
            scale: new THREE.Vector3(2, 2, 2),
          },
          idleAnimation,
        },
        {
          get offset() {
            return getSectionOffsets(steps).startOffset;
          },
          startTransform: {
            position: new THREE.Vector3(-40, 0, -5),
            scale: new THREE.Vector3(6, 6, 6),
          },
          idleAnimation,
        },
        {
          get offset() {
            return getSectionOffsets(feelings).startOffset;
          },
          startTransform: {
            position: new THREE.Vector3(-150, 75, -75),
            scale: new THREE.Vector3(2, 2, 2),
          },
          idleAnimation,
        },
      ],

      end: {
        get offset() {
          return getSectionOffsets(outline).startOffset;
        },

        transform: {
          position: new THREE.Vector3(-200, 50, -25),
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
        },
      },
    },
  ],
};
