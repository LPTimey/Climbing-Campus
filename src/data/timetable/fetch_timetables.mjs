import { readFile } from "node:fs/promises";
import fetchATimeTable from "./thi_api.mjs";

/** @import {Root,RootChild,ChildChild} from "./stgrus" */

/** @type {Root} */
const stgrus = JSON.parse(await readFile("./stgrus.json", "utf8"));

/**
 * @param {string} username
 * @param {string} session
 */
export async function fetch_roots(username, session) {
  return Promise.all(
    stgrus.map(async (root) => {
      return {
        name: root.name,
        children: await Promise.all(
          root.children.map((child) => fetch_child(username, session, child)),
        ),
      };
    }),
  );
}

/**
 * @param {string} username
 * @param {string} session
 * @param {RootChild} child
 */
export async function fetch_child(username, session, child) {
  return {
    name: child.name,
    children: await Promise.all(
      child.children.map((c) => fetch_child_child(username, session, c)),
    ),
  };
}

/**
 * @param {string} username
 * @param {string} session
 * @param {ChildChild} child_child
 */
export async function fetch_child_child(username, session, child_child) {
  return fetchATimeTable({
    sem: 50,
    showdate: new Date().toLocaleDateString("en-US"),
    viewtype: "week",
    timezone: 2,
    Session: session,
    User: username,
    mode: "calendar",
    stgru: child_child.id,
    csrfToken: undefined,
  });
}
