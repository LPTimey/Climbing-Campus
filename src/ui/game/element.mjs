"use strict";
import { resizeIfNeeded } from "@/lib/three_utils.mjs";
import * as THREE from "three";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: block;
    }
  </style>

  <canvas></canvas>
`;

class ResultsGame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true),
    );
  }
  connectedCallback() {
    if (!this.shadowRoot) return;
    const canvas = /** @type {HTMLCanvasElement} */(this.shadowRoot.querySelector("canvas"));
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhysicalMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Light
    const light = new THREE.PointLight();
    light.position.set(1, 2, 1);
    scene.add(light);

    // Animation loop
    let lastTime = 0;
    /** @type {XRFrameRequestCallback} */
    const animate = (time, _frame) => {
      const deltaTime = time - lastTime;
      resizeIfNeeded(renderer, camera);

      cube.rotation.x += 0.001 * deltaTime;
      cube.rotation.y += 0.001 * deltaTime;

      lastTime = time;
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);
  }
}

customElements.define("results-game", ResultsGame);
