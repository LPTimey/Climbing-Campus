"use strict";

import { resize } from "@/lib/three_utils.mjs";
import { createScene } from "./setup.mjs";
import { getObject } from "./objects.mjs";
import { createAnimation } from "./animation.mjs";

const canvas = /** @type {HTMLCanvasElement} */(
  document.getElementById("SiteBG")
);

const { scene, camera, renderer } = createScene(canvas);

const model = await getObject("accessibilityBoy");

scene.add(model);

model.position.set(0, 0, 0);

const animate = createAnimation({
  renderer,
  camera,
  scene,
});

resize(renderer, camera);

renderer.setAnimationLoop(animate);