import {
  fetch_child_child,
  stgrus,
} from "./src/data/timetable/fetch_timetables.mjs";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
/** @import {} from "@types/node/index.d.ts" */

const help = `
-h, --help:                    Show help string
-u [USER], --user [USER]:      (required) Set Username from THI
-s [TOKEN], --session [TOKEN]: (required) Set SessionToken from THI
`;


const targets = new Set(["UXD2", "UXD4", "UXD6", "UXD7", "UXD_FW"]);
const OUT_PREFIX = path.join(".", "assets", "data", "timetables");


async function main() {
  const args = process.argv.slice(2);

  const userIndex = args.includes("-u")
    ? args.indexOf("-u")
    : args.indexOf("--user");

  const sessionIndex = args.includes("-s")
    ? args.indexOf("-s")
    : args.indexOf("--session");

  const user = args[userIndex + 1];
  const session = args[sessionIndex + 1];

  if (!user || !session) {
    console.error("Missing user or session");
    return;
  }


  const leafMap = new Map();

  for (const root of stgrus) {
    for (const child of root.children) {
      for (const leaf of child.children) {
        leafMap.set(leaf.short, {
          leaf,
          rootName: root.name,
          childName: child.name,
        });
      }
    }
  }

  await Promise.all(
    [...targets].map(async (short) => {
      const entry = leafMap.get(short);

      if (!entry) {
        throw new Error(`Leaf not found: ${short}`);
      }

      const { leaf, rootName, childName } = entry;

      const result = await fetch_child_child(user, session, leaf);

      // 🔥 build folder path
      const dirPath = path.join(OUT_PREFIX, rootName, childName);

      // 🔥 ensure directories exist
      await mkdir(dirPath, { recursive: true });

      // 🔥 final file path
      const filePath = path.join(dirPath, `${short}.json`);

      await writeFile(filePath, JSON.stringify(result, null, 2), "utf8");

      console.log(`✔ wrote ${filePath}`);
    }),
  );
}

await main();
