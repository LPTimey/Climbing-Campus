"use strict";

import { accessibilityBoy } from "./animations/boi.mjs";
import { campus } from "./animations/campus.mjs";
import { questionMark } from "./animations/questionmark.mjs";
import { steps3D } from "./animations/steps.mjs";

/**
 * @import {Animation} from "./animation-system.mjs"
 */

export const intro = /** @type {HTMLElement} */ (
  document.getElementById("Intro") ??
    (() => {
      throw new Error('Element "Intro" nicht gefunden');
    })()
);
export const attendees = /** @type {HTMLElement} */ (
  document.getElementById("Attendees") ??
    (() => {
      throw new Error('Element "Attendees" nicht gefunden');
    })()
);
export const steps = /** @type {HTMLElement} */ (
  document.getElementById("Steps") ??
    (() => {
      throw new Error('Element "Steps" nicht gefunden');
    })()
);
export const feelings = /** @type {HTMLElement} */ (
  document.getElementById("Feelings") ??
    (() => {
      throw new Error('Element "Feelings" nicht gefunden');
    })()
);
export const outline = /** @type {HTMLElement} */ (
  document.getElementById("MetaOutline") ??
    (() => {
      throw new Error('Element "MetaOutline" nicht gefunden');
    })()
);
export const map = /** @type {HTMLElement} */ (
  document.getElementById("Map") ??
    (() => {
      throw new Error('Element "Map" nicht gefunden');
    })()
);
export const charts = /** @type {HTMLElement} */ (
  document.getElementById("Charts") ??
    (() => {
      throw new Error('Element "Charts" nicht gefunden');
    })()
);
export const explanation = /** @type {HTMLElement} */ (
  document.getElementById("Explanation") ??
    (() => {
      throw new Error('Element "Explanation" nicht gefunden');
    })()
);

/**
 *
 * @param {HTMLElement} el
 * @returns
 */
export function getSectionOffsets(el) {
  const rect = el.getBoundingClientRect();
  const scroll = window.scrollY;

  return {
    startOffset: rect.top + scroll,
    endOffset: rect.top + scroll + rect.height,
  };
}

/** @satisfies {Animation} */
export const animations = {
  accessibilityBoy,
  campus,
  stairs: steps3D,
  questionMark,
};
