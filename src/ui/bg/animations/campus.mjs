import { easing } from "../animation-system.mjs";
import { attendees, getSectionOffsets, intro, steps } from "../animation.mjs";
import * as THREE from "three";
/**
 * @import {AnimationObject} from "../animation-system.mjs"
 */

/** @satisfies {AnimationObject} */
export const campus = {
  segments: [],
  onEnter({ startTime, absTime, object }) {
    const durationSecs = 0.25 * 1000;
    const scale1 = 0;
    const scale2 = 1;
    const t = THREE.MathUtils.clamp((absTime - startTime) / durationSecs, 0, 1);
    const scale = THREE.MathUtils.lerp(scale1, scale2, t);
    object.scale.set(scale, scale, scale);
    return t >= 1;
  },
  onExit({ startTime, absTime, object }) {
    const durationSecs = 0.25 * 1000;
    const scale1 = 1;
    const scale2 = 0;
    const t = THREE.MathUtils.clamp((absTime - startTime) / durationSecs, 0, 1);
    const scale = THREE.MathUtils.lerp(scale1, scale2, t);
    object.scale.set(scale, scale, scale);
    return t >= 1;
  },
};
