"use strict";
import * as THREE from "three";

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @returns 
 */
export function createScene(canvas) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100000,
  );

  camera.position.z = 50;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  // Licht
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);

  scene.add(light, ambient);

  return {
    scene,
    camera,
    renderer,
  };
}