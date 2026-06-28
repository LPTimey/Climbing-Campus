import { getSectionOffsets, outline } from "../sections.mjs";
import { defaultEntryExitAnimation } from "../animation-system.mjs";
import * as THREE from "three";
/**
 * @import {AnimationObject, IdleAnimation} from "../animation-system.mjs"
 */

/** @type {IdleAnimation} */
const idleAnimation = ({ deltaTime, object }) => {};

/** @satisfies {AnimationObject} */
export const buildings = {
  segments: [
    {
      ...defaultEntryExitAnimation(
        {
          scale: new THREE.Vector3(0, 0, 0),
          rotation: new THREE.Quaternion().setFromEuler(
            new THREE.Euler(0.5, -1, 0.25),
          ),
        },
        {
          scale: new THREE.Vector3(0.25, 0.25, 0.25),
          rotation: new THREE.Quaternion().setFromEuler(
            new THREE.Euler(0.5, -1, 0.25),
          ),
        },
      ),
      steps: [
        {
          idleAnimation,
          get offset() {
            return getSectionOffsets(outline).startOffset;
          },
          startTransform: {
            scale: new THREE.Vector3(0.25, 0.25, 0.25),
            position: new THREE.Vector3(25, -7.5, 0),
          },
        },
      ],

      end: {
        get offset() {
          return getSectionOffsets(outline).endOffset;
        },

        transform: {
          scale: new THREE.Vector3(0.25, 0.25, 0.25),
          position: new THREE.Vector3(25, -5, 0),
        },
      },
    },
  ],
};
