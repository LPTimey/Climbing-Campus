"use strict";

import { arrow } from "./animations/arrow.mjs";
import { accessibilityBoy } from "./animations/boi.mjs";
import { campus } from "./animations/campus.mjs";
import { questionMark } from "./animations/questionmark.mjs";
import { steps3D } from "./animations/steps.mjs";
import { buildings } from "./animations/buildings.mjs";
import { clock } from "./animations/clock.mjs";
import { smiley } from "./animations/smiley.mjs";
import { stress } from "./animations/stress.mjs";
import { wheelchair } from "./animations/wheelchair.mjs";

/**
 * @import {Animation} from "./animation-system.mjs"
 */

/** @satisfies {Animation} */
export const animations = {
  arrow,
  accessibilityBoy,
  buildings,
  campus,
  clock,
  questionMark,
  smiley,
  stairs: steps3D,
  stress,
  wheelchair,
};
