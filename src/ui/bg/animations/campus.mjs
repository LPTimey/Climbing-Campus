import { easing } from "../animation-system.mjs";
import { defaultEntryExitAnimation } from "../animation-system.mjs";
import { attendees, getSectionOffsets, intro, steps, buildings } from "../sections.mjs";
import * as THREE from "three";
/**
 * @import {AnimationObject,IdleAnimation} from "../animation-system.mjs"
 */

/** @type {IdleAnimation} */
const idleAnimation = ({ object, deltaTime, absTime }) => {
  object.rotateY(0.0001*deltaTime)
};

/** @satisfies {AnimationObject} */
export const campus = {
  segments: [
    {

      ...defaultEntryExitAnimation(
        { 
          scale: new THREE.Vector3(0, 0, 0),
        },
        {
          scale: new THREE.Vector3(0.075, 0.075, 0.075),
        },
      ),
      steps: [
        {
          get offset() {
            return (
              getSectionOffsets(buildings).startOffset
            );
          },
          startTransform: {
            position: new THREE.Vector3(-15, -15, 0),
            scale: new THREE.Vector3(0.075, 0.075, 0.075),
          },
          idleAnimation,
        },
      ],

      end: {
        get offset() {
          return (
            getSectionOffsets(buildings).endOffset
          );
        },

        transform: {
          position: new THREE.Vector3(-100, 300, -25),
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
        },
      },
    },
  ],
};
