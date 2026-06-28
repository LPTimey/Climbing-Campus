import { getSectionOffsets, outline } from "../sections.mjs";
import * as THREE from "three";
/**
 * @import {AnimationObject, IdleAnimation} from "../animation-system.mjs"
 */

/** @type {IdleAnimation} */
const idleAnimation = ({ deltaTime, object }) => {};

/** @satisfies {AnimationObject} */
export const arrow = {
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
            rotation: new THREE.Quaternion().setFromEuler(
              new THREE.Euler(0.5, -1, 0.25),
            ),
          },
        },
      ],

      end: {
        get offset() {
          return getSectionOffsets(outline).endOffset;
        },

        transform: {
          scale: new THREE.Vector3(0.25, 0.25, 0.25),
          rotation: new THREE.Quaternion().setFromEuler(
            new THREE.Euler(0.5, -1, 0.25),
          ),
        },
      },
    },
  ],
};
