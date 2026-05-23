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
  accessibilityBoy: {
    scene: loaders.usd.loadAsync("./assets/Blender Output/3D/Accessibility Blocky.usdz"),
    initialScale: new THREE.Vector3(2, 2, 2)
  },
  stairs: {
    scene: loaders.usd.loadAsync("./assets/Blender Output/3D/stairs.usdz"),
    initialScale: new THREE.Vector3(1, 1, 1),
  },
  palette: {
    scene: loaders.usd.loadAsync("./assets/Blender Output/3D/palette.usdz"),
    initialScale: new THREE.Vector3(1, 1, 1),
  },
  lightSimple: {
    scene: loaders.usd.loadAsync("./assets/Blender Output/3D/lightbulb Simple.usdz"),
    initialScale: new THREE.Vector3(1, 1, 1),
  },
  lightComplex: {
    scene: loaders.usd.loadAsync("./assets/Blender Output/3D/lightbulb.usdz"),
    initialScale: new THREE.Vector3(1, 1, 1),
  },
  letter: {
    scene: loaders.usd.loadAsync("./assets/Blender Output/3D/letter.usdz"),
    initialScale: new THREE.Vector3(1, 1, 1),
  },
  telescope: {
    scene: loaders.usd.loadAsync("./assets/Blender Output/3D/telescope.usdz"),
    initialScale: new THREE.Vector3(1, 1, 1),
  },
  spiral: {
    scene: loaders.usd.loadAsync("./assets/Blender Output/3D/stess.usdz"),
    initialScale: new THREE.Vector3(1, 1, 1),
  },
  questionMark: {
    scene: loaders.usd.loadAsync("./assets/Blender Output/3D/question-mark.usdz"),
    initialScale: new THREE.Vector3(1, 1, 1),
  },
  survey: {
    scene: loaders.usd.loadAsync("./assets/Blender Output/3D/ClipBoard.usdz"),
    initialScale: new THREE.Vector3(1, 1, 1),
  },
  image: {
    scene: loaders.usd.loadAsync("./assets/Blender Output/3D/"),
    initialScale: new THREE.Vector3(1, 1, 1),
  },
  threeJs: {
    scene: loaders.fbx.loadAsync("./assets/Blender Output/3D/Threejs.fbx"),
    initialScale: new THREE.Vector3(0.01, 0.01, 0.01)
  },
  penStation: {
    scene: loaders.usd.loadAsync("./assets/Blender Output/3D/PenStation.usdz"),
    initialScale: new THREE.Vector3(1, 1, 1),
  },
  moodBoard: {
    scene: loaders.usd.loadAsync("./assets/Blender Output/3D/moodboard.usdz"),
    initialScale: new THREE.Vector3(1, 1, 1),
  },
  calender: {
    scene: loaders.usd.loadAsync("./assets/Blender Output/3D/Calender.usdz"),
    initialScale: new THREE.Vector3(1, 1, 1),
  },
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
const three = await Objs.accessibilityBoy.scene;


scene.add(three);

// Optional positioning/scaling
three.position.set(0, 0, 0);
three.scale.set(Objs.accessibilityBoy.initialScale.x, Objs.accessibilityBoy.initialScale.z, Objs.accessibilityBoy.initialScale.z);

// Animation loop
let lastTime = 0;
/** @type {XRFrameRequestCallback} */
const animate = (time, _frame) => {
  const deltaTime = time - lastTime;
  resizeIfNeeded(renderer, camera);

  three.rotation.y += deltaTime * 0.001;
  three.rotation.x += deltaTime * 0.001;

  lastTime = time;
  renderer.render(scene, camera);
};

resize(renderer, camera);
renderer.setAnimationLoop(animate);
