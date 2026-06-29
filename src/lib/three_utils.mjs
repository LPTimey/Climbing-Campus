"use strict";
import * as THREE from "three";
import { FBXLoader, GLTFLoader, USDLoader } from "three/addons";


export const loaders = Object.freeze({
  threeD: {
    gltf: new GLTFLoader(),
    usd: new USDLoader(),
    fbx: new FBXLoader(),
  },
  image: new THREE.TextureLoader(),
});

/**
 * @typedef {typeof loaders} Loaders
 */

/**
 *
 * @param {THREE.Scene} scene
 * @param {THREE.Vector3} position
 * @param {number} [intensity=2]
 */
export function addLight(scene, position, intensity = 2) {
  const color = 0xffffff;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(position.x, position.y, position.z);
  scene.add(light);
}

/**
 *
 * @param {THREE.WebGLRenderer} renderer
 * @returns
 */
export function rendererNeedsResize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = Math.floor(canvas.clientWidth * pixelRatio);
  const height = Math.floor(canvas.clientHeight * pixelRatio);
  const needResize = canvas.width !== width || canvas.height !== height;
  return needResize;
}

/**
 *
 * @param {THREE.WebGLRenderer} renderer
 * @param {THREE.PerspectiveCamera | THREE.OrthographicCamera} camera
 */
export function resize(renderer, camera) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  canvas.removeAttribute("width");
  canvas.removeAttribute("height");
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height, false);

  if (camera instanceof THREE.PerspectiveCamera) {
    camera.aspect = width / height;
  } else if (camera instanceof THREE.OrthographicCamera) {
    const frustumHeight = camera.top - camera.bottom;
    const aspect = width / height;
    const frustumWidth = frustumHeight * aspect;

    const dx = (camera.left + camera.right) / 2;
    const dy = (camera.top + camera.bottom) / 2;

    camera.left = dx - frustumWidth / 2;
    camera.right = dx + frustumWidth / 2;
    camera.top = dy + frustumHeight / 2;
    camera.bottom = dy - frustumHeight / 2;
  }

  camera.updateProjectionMatrix();
}
/**
 *
 * @param {THREE.WebGLRenderer} renderer
 * @param {THREE.PerspectiveCamera | THREE.OrthographicCamera} camera
 * @returns
 */
export function resizeIfNeeded(renderer, camera) {
  if (!rendererNeedsResize(renderer)) {
    return false;
  }
  resize(renderer, camera);
  return true;
}


export function createAxesHelper(size = 1) {
  const group = new THREE.Group();

  const materialX = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const materialY = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  const materialZ = new THREE.LineBasicMaterial({ color: 0x0000ff });

  const makeAxis = (to, material) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      to,
    ]);
    return new THREE.Line(geometry, material);
  };

  group.add(makeAxis(new THREE.Vector3(size, 0, 0), materialX));
  group.add(makeAxis(new THREE.Vector3(0, size, 0), materialY));
  group.add(makeAxis(new THREE.Vector3(0, 0, size), materialZ));

  return group;
}
