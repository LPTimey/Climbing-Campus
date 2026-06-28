"use strict";
import * as THREE from "three";
import { loaders } from "@/lib/three_utils.mjs";
/**@import { Loaders } from "@/lib/three_utils.mjs" */

/**
 * @param {keyof typeof objs} name
}
 */
export function getObject(name) {
  const obj =
    /** @type {SceneObjectDefinition<(typeof objs)[name]["type"]>} */ (
      objs[name]
    );

  if (!obj) {
    throw new Error(`Unknown object: ${name}`);
  }

  if (obj.cache) {
    return obj.cache;
  }
  if (obj.loading) {
    return;
  }

  const loader = loaders.threeD[obj.type];

  console.info(`start loading ${name} from ${obj.path}`);
  loader.load(
    obj.path,
    (loaded) => {
      console.info(`loaded ${name} from ${obj.path}`);
      const group = new THREE.Group();
      group.add(loaded.scene);
      group.name = name;

      obj.cache = group;
      obj.loading = false;
    },
    (event) => {
      console.debug(event);
    },
    (error) => {
      console.error(error);
    },
  );
  obj.loading = true;
  return;
}

/** @satisfies {Objs} */
export const objs = Object.freeze(
  /** @satisfies {Objs} */ {
    accessibilityBoy: {
      type: "gltf",
      path: "./assets/Blender Output/3D/Accessibility Blocky.glb",
    },
    arrow: {
      type: "gltf",
      path: "./assets/Blender Output/3D/Arrow.glb",
    },
    backpack: {
      type: "gltf",
      path: "./assets/Blender Output/3D/backpack.glb",
    },
    buildings: {
      type: "gltf",
      path: "./assets/Blender Output/3D/Buildings.glb",
    },
    calender: {
      type: "gltf",
      path: "./assets/Blender Output/3D/Calender.glb",
    },
    campus: {
      type: "gltf",
      path: "assets/Blender Output/3D/Campus.glb",
    },
    clipBoard: {
      type: "gltf",
      path: "./assets/Blender Output/3D/ClipBoard.glb",
    },
    clock: {
      type: "gltf",
      path: "./assets/Blender Output/3D/Clock.glb",
    },
    elevator: {
      type: "gltf",
      path: "./assets/Blender Output/3D/elevator.glb",
    },
    image: {
      type: "gltf",
      path: "./assets/Blender Output/3D/image.glb",
    },
    letter: {
      type: "gltf",
      path: "./assets/Blender Output/3D/letter.glb",
    },
    lightSimple: {
      type: "gltf",
      path: "./assets/Blender Output/3D/lightbulb Simple.glb",
    },
    lightComplex: {
      type: "gltf",
      path: "./assets/Blender Output/3D/lightbulb.glb",
    },
    moodBoard: {
      type: "gltf",
      path: "./assets/Blender Output/3D/moodboard.glb",
    },
    palette: {
      type: "gltf",
      path: "./assets/Blender Output/3D/palette.glb",
    },
    penStation: {
      type: "gltf",
      path: "./assets/Blender Output/3D/PenStation.glb",
    },
    questionMark: {
      type: "gltf",
      path: "./assets/Blender Output/3D/question-mark.glb",
    },
    smiley: {
      type: "gltf",
      path: "./assets/Blender Output/3D/Smiley.glb",
    },
    stairs: {
      type: "gltf",
      path: "./assets/Blender Output/3D/stairs.glb",
    },
    stress: {
      type: "gltf",
      path: "./assets/Blender Output/3D/stress.glb",
    },
    student: {
      type: "gltf",
      path: "./assets/Blender Output/3D/Student.glb",
    },
    telescope: {
      type: "gltf",
      path: "./assets/Blender Output/3D/telescope.glb",
    },
    threeJs: {
      type: "gltf",
      path: "./assets/Blender Output/3D/Threejs.glb",
    },
    wheelchair: {
      type: "gltf",
      path: "./assets/Blender Output/3D/wheelchair.glb",
    },
  },
);

/**
 * @template {keyof Loaders["threeD"]} T
 * @typedef {Object} SceneObjectDefinition
 *
 * @property {T} type
 * Loader-Typ.
 *
 * @property {string} path
 * Asset-Pfad.
 *
 * @property {boolean} [loading]
 * @property {THREE.Object3D} [cache]
 * Geladenes Objekt.
 */

/**
 * @typedef {{
 *   [key: string]: SceneObjectDefinition<keyof Loaders["threeD"]>
 * }} Objs
 */
