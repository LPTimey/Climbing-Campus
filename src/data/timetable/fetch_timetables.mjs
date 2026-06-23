import { readFile } from "node:fs/promises";
import fetchATimeTable from "./thi_api.mjs";
// import { fileURLToPath } from "node:url";
import path from "node:path";

/** @import {Root,RootChild,ChildChild} from "./stgrus" */

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const __dirname = path.join(".", "assets", "data", "stundenpläne", "metadata");

const INPUT_FILE = path.join(__dirname, "stgrus.json");

/** @type {Root} */
export const stgrus = JSON.parse(await readFile(INPUT_FILE, "utf8"));

/**
 * @param {{intervalMs: number}} param0
 * @returns {() => Promise<void>}
 */
function createRateLimiter({ intervalMs }) {
  let queue = Promise.resolve();

  return async () => {
    /** @type {(value?: void | PromiseLike<void>) => void} */
    let release;

    const wait = new Promise((r) => (release = r));

    const prev = queue;

    queue = queue.then(() =>
      new Promise((res) => setTimeout(res, intervalMs)).then(() => {
        release();
      }),
    );

    await prev;
    await wait;
  };
}

/**
 * @template T
 * @param {number} limit
 * @returns {(fn: () => Promise<T> | T) => Promise<T>}
 */
function createPool(limit) {
  /** @type {Array<{fn: () => Promise<any> | any, resolve: (value: any) => void, reject: (reason?: any) => void}>} */
  const queue = [];

  let active = 0;

  const runNext = () => {
    if (active >= limit) return;

    const job = queue.shift();
    if (!job) return;

    active++;

    Promise.resolve()
      .then(job.fn)
      .then(job.resolve, job.reject)
      .finally(() => {
        active--;
        runNext();
      });
  };

  return (fn) =>
    new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      runNext();
    });
}

// Global concurrency cap for API calls
const limit = createPool(2);

// Global rate limit (1 request per 2 seconds)
const withRateLimit = createRateLimiter({
  intervalMs: 2000,
});

/**
 * @param {string} username
 * @param {string} session
 */
export async function fetch_roots(username, session) {
  return Promise.all(
    stgrus.map(async (root) => ({
      name: root.name,
      children: await Promise.all(
        root.children.map((child) => fetch_child(username, session, child)),
      ),
    })),
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
 * @returns {Promise<import("./timetable_returntype").Welcome>}
 */
export async function fetch_child_child(username, session, child_child) {
  return limit(async () => {
    await withRateLimit();

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
  });
}
