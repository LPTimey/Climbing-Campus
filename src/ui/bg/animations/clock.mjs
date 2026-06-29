import {
  attendees,
  feelings,
  getSectionOffsets,
  outline,
  steps,
  ux,
  time,
  infra,
} from "../sections.mjs";
import { defaultEntryExitAnimation } from "../animation-system.mjs";
import * as THREE from "three";
/**
 * @import {AnimationObject, IdleAnimation} from "../animation-system.mjs"
 */



const targetQuat = new THREE.Quaternion();
const targetEuler = new THREE.Euler();
const mouse = new THREE.Vector2();

window.addEventListener("pointermove", (event) => {
  mouse.set(event.clientX, event.clientY);
});




/** 
 * TODO: Better way of getting the "Pointer" child 
 * @returns {THREE.Object3D}
 */
function getPointer(obj) {
  return obj.children[0].children[0].children[2];
}

/** @type {IdleAnimation} */
const idleAnimation1 = ({ object, deltaTime }) => {
  // object.rotateY(0.0015 * deltaTime);
  const pointer = getPointer(object);
    pointer.rotateZ(-((2 * Math.PI) / 20000) * deltaTime); // jede 1/3 min 1 Umdrehung
};


/** @type {IdleAnimation} */
const idleAnimation2 = ({ object, deltaTime }) => {
  const pointer = getPointer(object);

  const dir = mouse.clone().sub(
    new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2)
  );

  targetEuler.set(0, 0, -(Math.atan2(dir.y, dir.x) + Math.PI / 2));
  targetQuat.setFromEuler(targetEuler);

  const t = 1 - Math.exp(-0.01 * deltaTime);
  pointer.quaternion.slerp(targetQuat, t);
};

/** @satisfies {AnimationObject} */
export const clock = {
  segments: [
    {
      ...defaultEntryExitAnimation(
        { scale: new THREE.Vector3(0, 0, 0) },
        { scale: new THREE.Vector3(6, 6, 6) },
      ),
      steps: [
        {
          get offset() {
            return getSectionOffsets(outline).startOffset;
          },
          startTransform: {
            position: new THREE.Vector3(-16.5, -5, -5),
            scale: new THREE.Vector3(6, 6, 6),
          },
          idleAnimation:idleAnimation1,
        },
      ],

      end: {
        get offset() {
          return getSectionOffsets(ux).startOffset;
        },

        transform: {
          position: new THREE.Vector3(200, 100, -25),
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
        },
      },
    },
    {
      ...defaultEntryExitAnimation(
        { scale: new THREE.Vector3(0, 0, 0) },
        { scale: new THREE.Vector3(11, 11, 11) },
      ),
      steps: [
        {
          get offset() {
            return getSectionOffsets(time).startOffset;
          },
          startTransform: {
            position: new THREE.Vector3(0,0,0),
            scale: new THREE.Vector3(11, 11, 11),
          },
          idleAnimation:idleAnimation2,
        },
      ],

      end: {
        get offset() {
          return getSectionOffsets(infra).startOffset;
        },

        transform: {
          position: new THREE.Vector3(0, 100, -25),
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
        },
      },
    },
  ],
};
