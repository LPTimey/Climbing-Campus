export const intro = sectionOrErr("Intro");
export const attendees = sectionOrErr("Attendees");
export const steps = sectionOrErr("Steps");
export const feelings = sectionOrErr("Feelings");
export const outline = sectionOrErr("MetaOutline");
export const ux = sectionOrErr("UX");
export const time = sectionOrErr("Time");
export const infra = sectionOrErr("Infra");
export const buildings = sectionOrErr("Buildings");
export const accessibility = sectionOrErr("Accessibility");
export const map = sectionOrErr("Map");
export const charts = sectionOrErr("Charts");
export const explanation = sectionOrErr("Explanation");
export const testSect = sectionOrErr("Test");

/**
 * @param {string} id
 * @returns {HTMLElement}
 */
export function sectionOrErr(id) {
  const el = document.getElementById(id);

  if (!el) {
    throw new Error(`Element "${id}" nicht gefunden`);
  }

  return el;
}

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
