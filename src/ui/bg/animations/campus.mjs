import { easing } from "../animation-system.mjs";
import { defaultEntryExitAnimation } from "../animation-system.mjs";
import {
  attendees,
  getSectionOffsets,
  intro,
  steps,
  buildings,
  sectionOrErr,
} from "../sections.mjs";
import * as THREE from "three";
/**
 * @import {AnimationObject,IdleAnimation} from "../animation-system.mjs"
 */

const PopA = sectionOrErr("part_A");
const PopB = sectionOrErr("part_B");
const PopC = sectionOrErr("part_C");
const PopD = sectionOrErr("part_D");
const PopE = sectionOrErr("part_E");
const PopG = sectionOrErr("part_G");
const PopJ = sectionOrErr("part_J");
const PopK = sectionOrErr("part_K");

/** @type {[HTMLElement,string][]} */
const popMap = [
  [PopA, "empty_A"],
  [PopB, "empty_B"],
  [PopC, "empty_C"],
  [PopD, "empty_D"],
  [PopE, "empty_E"],
  [PopG, "empty_G"],
  [PopJ, "empty_J"],
  [PopK, "empty_K"],
];

/** @type {{position:THREE.Vector3,scale:THREE.Vector3}|null} */
let original = null
let emptyOffset = new THREE.Vector3(0,2,0);
const zoomFactor = 2

/** @type {IdleAnimation} */
const idleAnimation = ({ object, deltaTime }) => {
  const root = object.children[0];

  if (!original) {
    original = {
      position:root.position.clone(),
      scale:root.scale.clone(),
    };
  }

  let targetEmpty = null;

  for (const [popover, emptyName] of popMap) {
    if (popover.matches(":popover-open")) {
      targetEmpty = root.children.find(o => o.name === emptyName);
      break;
    }
  }

  if (targetEmpty) {
    // Root so verschieben, dass der Empty auf dem Ursprung landet
    root.position.copy(original.position).sub(targetEmpty.position.clone().sub(emptyOffset));
    root.scale.setScalar(zoomFactor)
  } else {
    // Zur Ausgangsposition zurück
    root.position.copy(original.position);
    root.scale.copy(original.scale);
  }

  // subtle idle rotation
  object.rotateY(0.0001 * deltaTime);
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
            return getSectionOffsets(buildings).startOffset;
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
          return getSectionOffsets(buildings).endOffset;
        },

        transform: {
          position: new THREE.Vector3(-100, 300, -25),
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
        },
      },
    },
  ],
};
