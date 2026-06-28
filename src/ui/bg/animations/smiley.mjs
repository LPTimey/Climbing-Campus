import { getSectionOffsets, outline } from "../sections.mjs";
import * as THREE from "three";
/**
 * @import {AnimationObject, IdleAnimation} from "../animation-system.mjs"
 */

/** @type {IdleAnimation} */
const idleAnimation = ({ deltaTime, object }) => {};

/** @satisfies {AnimationObject} */
export const smiley = {
  segments: [
    {
      steps: [
        {
          idleAnimation,
          get offset() {
            return getSectionOffsets(outline).startOffset;
          },
          startTransform: {
            scale: new THREE.Vector3(0.25, 0.25, 0.25),
            position: new THREE.Vector3(-50, -5, 0),
          },
        },
      ],

      end: {
        get offset() {
          return getSectionOffsets(outline).endOffset;
        },

        transform: {
          scale: new THREE.Vector3(0.25, 0.25, 0.25),
          position: new THREE.Vector3(-50, -5, 0),
        },
      },
    },
  ],
};
