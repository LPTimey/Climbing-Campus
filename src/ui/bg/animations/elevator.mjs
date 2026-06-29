import { easing } from "../animation-system.mjs";
import { defaultEntryExitAnimation, mouse } from "../animation-system.mjs";
import { getSectionOffsets, accessibility } from "../sections.mjs";
import * as THREE from "three";
/**
 * @import {AnimationObject,IdleAnimation} from "../animation-system.mjs"
 */

const frontRad = (3.14/2)*3

/** @type {IdleAnimation} */
const idleAnimation = ({ object, deltaTime, absTime }) => {
  // const doorL = object.children[0].children.find((item)=>item.name="Elevatordoor_L"); // doesn't work
  // const doorR = object.children[0].children.find((item)=>item.name="Elevatordoor_R"); // doesn't work
  const doorL = object.children[0].children[1];
  const doorR = object.children[0].children[2];

  const mouseTop=window.innerHeight*0.38
  const mouseBottom=window.innerHeight*0.65
  const shift = (
    0.23
    +THREE.MathUtils.mapLinear(
      Math.max(
        Math.min(
          mouse.y,
          mouseBottom
        ),
        mouseTop
      ),                        // input value
      mouseTop, mouseBottom,    // input MinValue, MaxValue
      0,0.5                     // output MinValue, MaxValue
    )
  )

  doorL.position.set(doorL.position.x,doorL.position.y,shift)
  doorR.position.set(doorR.position.x,doorR.position.y,-shift)

};

/** @satisfies {AnimationObject} */
export const elevator = {
  segments: [
    {

      ...defaultEntryExitAnimation(
        { 
          scale: new THREE.Vector3(0, 0, 0),
          rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(
            0,frontRad-0.40, 0
          ))
        },
        {
          scale: new THREE.Vector3(8, 8, 8),
          rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(
            0,frontRad-0.40, 0
          ))

        },
      ),
      steps: [
        {
          get offset() {
            return (
              getSectionOffsets(accessibility).startOffset
            );
          },
          startTransform: {
            position: new THREE.Vector3(19, 0, 0),
            scale: new THREE.Vector3(8, 8, 8),
            rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(
              0,frontRad-0.40, 0
            ))
          },
          idleAnimation,
        },
      ],

      end: {
        get offset() {
          return (
            getSectionOffsets(accessibility).endOffset
          );
        },

        transform: {
          position: new THREE.Vector3(-100, 100, -25),
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
          rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(
            0,frontRad-0.40, 0
          ))
        },
      },
    },
  ],
};
