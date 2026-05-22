import { FBXLoader, GLTFLoader, USDLoader } from "three/addons";
import * as THREE from "three";
import { resize, resizeIfNeeded } from "@/lib/three_utils.mjs";

const canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("SiteBG")
);

const loaders = Object.freeze({
  gltf: new GLTFLoader(),
  usd: new USDLoader(),
  fbx: new FBXLoader(),
  image: new THREE.ImageLoader(),
});

const Objs = Object.freeze({
  person: loaders.fbx.loadAsync("./assets/Threejs.fbx"),
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// Load model and add to scene
const person = await Objs.person;


scene.add(person);

// Optional positioning/scaling
person.position.set(0, 0, 0);
person.scale.set(0.1, 0.1, 0.1);

// Animation loop
let lastTime = 0;
/** @type {XRFrameRequestCallback} */
const animate = (time, _frame) => {
  const deltaTime = time - lastTime;
  resizeIfNeeded(renderer, camera);

  person.rotation.y += deltaTime * 0.001;
  person.rotation.x += deltaTime * 0.001;

  lastTime = time;
  renderer.render(scene, camera);
};

resize(renderer, camera);
renderer.setAnimationLoop(animate);
