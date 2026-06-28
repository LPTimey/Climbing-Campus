import { getSectionOffsets, outline } from "../sections.mjs";
import { defaultEntryExitAnimation } from "../animation-system.mjs";
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
      ...defaultEntryExitAnimation(
        {
          scale: new THREE.Vector3(0, 0, 0),
        },
        {
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
        },
      ),
      steps: [
        {
          idleAnimation,
          get offset() {
            return getSectionOffsets(outline).startOffset;
          },
          startTransform: {
            scale: new THREE.Vector3(0.5, 0.5, 0.5),
            position: new THREE.Vector3(-60, -5, 0),
          },
        },
      ],

      end: {
        get offset() {
          return getSectionOffsets(outline).endOffset;
        },

        transform: {
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
          position: new THREE.Vector3(-60, -5, 0),
        },
      },
    },
  ],
};
