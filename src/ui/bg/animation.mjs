"use strict";

import { accessibilityBoy } from "./animations/boi.mjs";
import { campus } from "./animations/campus.mjs";
import { questionMark } from "./animations/questionmark.mjs";
import { steps3D } from "./animations/steps.mjs";

/**
 * @import {Animation} from "./animation-system.mjs"
 */

/** @satisfies {Animation} */
export const animations = {
  accessibilityBoy,
  campus,
  stairs: steps3D,
  questionMark,
};
