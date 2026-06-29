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
        { scale: new THREE.Vector3(2, 2, 2) },
      ),
      steps: [
        {
          get offset() {
            return getSectionOffsets(intro).startOffset;
          },
          startTransform: {
            position: new THREE.Vector3(-25, 10, 15),
            scale: new THREE.Vector3(2, 2, 2),
          },
          idleAnimation,
        },
        {
          get offset() {
            return getSectionOffsets(attendees).startOffset;
          },
          startTransform: {
            position: new THREE.Vector3(-95,-50,-75),
            scale: new THREE.Vector3(1.5, 1.5, 1.5),
          },
          idleAnimation,
        },
        {
          get offset() {
            return getSectionOffsets(steps).startOffset;
          },
          startTransform: {
            position: new THREE.Vector3(-25, 0, 0),
            scale: new THREE.Vector3(4, 4, 4),
          },
          idleAnimation,
        },
        {
          get offset() {
            return getSectionOffsets(feelings).startOffset;
          },
          startTransform: {
            position: new THREE.Vector3(-150, 70, -150),
            scale: new THREE.Vector3(1.5, 1.5, 1.5),
          },
          idleAnimation,
        },
      ],

      end: {
        get offset() {
          return getSectionOffsets(outline).startOffset;
        },

        transform: {
          position: new THREE.Vector3(-300, 70, -150),
          scale: new THREE.Vector3(1.5, 1.5, 1.5),
        },
      },
    },
  ],
};
