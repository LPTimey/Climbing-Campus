"use strict";

import { resize } from "@/lib/three_utils.mjs";
import { createScene } from "./setup.mjs";
import { createAnimation } from "./animation-system.mjs";
import { animations as animation } from "./animation.mjs";

const canvas = /** @type {HTMLCanvasElement} */(
  document.getElementById("SiteBG")
);

const { scene, camera, renderer } = createScene(canvas);

const animate = createAnimation({
  renderer,
  camera,
  scene,
  animation
});

resize(renderer, camera);

renderer.setAnimationLoop(animate);