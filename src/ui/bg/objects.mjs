
"use strict";
import * as THREE from "three";
import { loaders } from "@/lib/three_utils.mjs";
/**@import { Loaders } from "@/lib/three_utils.mjs" */

/**
 * @param {keyof typeof objs} name
 * @returns {THREE.Object3D<THREE.Object3DEventMap> | Promise<THREE.Object3D<THREE.Object3DEventMap>>}
}
 */
export function getObject(name) {
  const obj = /** @type {SceneObjectDefinition<(typeof objs)[name]["type"]>} */(
    objs[name]
  );

  if (!obj) {
    throw new Error(`Unknown object: ${name}`);
  }

  if (obj.cache) {
    return obj.cache
  }

  const loader = loaders.threeD[obj.type];

  return async function () {
    const loaded = await loader.loadAsync(obj.path).then(loaded => "scene" in loaded ? loaded.scene : loaded);
    loaded.scale.set(obj.initialScale, obj.initialScale, obj.initialScale)
    const group = new THREE.Group();
    group.add(loaded);
    group.name = name;

    obj.cache = group;

    return group;
  }();
}

/** @satisfies {Objs} */
export const objs = Object.freeze({
  accessibilityBoy: {
    type: "gltf",
    path: "./assets/Blender Output/3D/Accessibility Blocky.glb",
    initialScale: 3,
    cache: null,
  },
  calender: {
    type: "gltf",
    path: "./assets/Blender Output/3D/Calender.glb",
    initialScale: 10,
    cache: null,
  },
  campus: {
    type: "gltf",
    path: "assets/Blender Output/3D/Campus.glb",
    initialScale: 1,
    cache: null,
  },
  clipBoard: {
    type: "gltf",
    path: "./assets/Blender Output/3D/ClipBoard.glb",
    initialScale: 10,
    cache: null,
  },
  letter: {
    type: "gltf",
    path: "./assets/Blender Output/3D/letter.glb",
    initialScale: 10,
    cache: null,
  },
  lightSimple: {
    type: "gltf",
    path: "./assets/Blender Output/3D/lightbulb Simple.glb",
    initialScale: 10,
    cache: null,
  },
  lightComplex: {
    type: "gltf",
    path: "./assets/Blender Output/3D/lightbulb.glb",
    initialScale: 10,
    cache: null,
  },
  moodBoard: {
    type: "gltf",
    path: "./assets/Blender Output/3D/moodboard.glb",
    initialScale: 4,
    cache: null,
  },
  palette: {
    type: "gltf",
    path: "./assets/Blender Output/3D/palette.glb",
    initialScale: 12,
    cache: null,
  },
  penStation: {
    type: "gltf",
    path: "./assets/Blender Output/3D/PenStation.glb",
    initialScale: 8,
    cache: null,
  },
  questionMark: {
    type: "gltf",
    path: "./assets/Blender Output/3D/question-mark.glb",
    initialScale: 4,
    cache: null,
  },
  stairs: {
    type: "gltf",
    path: "./assets/Blender Output/3D/stairs.glb",
    initialScale: 4,
    cache: null,
  },
  stress: {
    type: "gltf",
    path: "./assets/Blender Output/3D/stress.glb",
    initialScale: 8,
    cache: null,
  },
  telescope: {
    type: "gltf",
    path: "./assets/Blender Output/3D/telescope.glb",
    initialScale: 5,
    cache: null,
  },
  threeJs: {
    type: "gltf",
    path: "./assets/Blender Output/3D/Threejs.glb",
    initialScale: 2,
    cache: null,
  },
  image: {
    type: "gltf",
    path: "./assets/Blender Output/3D/image.glb",
    initialScale: 8,
    cache: null,
  },
});


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
 * @property {number} initialScale
 * Startskalierung.
 *
 * @property {THREE.Object3D | null} cache
 * Geladenes Objekt.
 */

/**
 * @typedef {{
 *   [key: string]: SceneObjectDefinition<keyof Loaders["threeD"]>
 * }} Objs
 */