import fetchTimetable from "./src/data/timetable/thi_api.mjs";
import { writeFile } from "node:fs/promises";
/** @import {} from "@types/node/index.d.ts" */

const help = `
-h, --help:                    Show help string
-u [USER], --user [USER]:      (required) Set Username from THI
-s [TOKEN], --session [TOKEN]: (required) Set SessionToken from THI
`;

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("-h") || args.includes("--help")) {
    console.log(help);
    return;
  }

  if (
    !(args.includes("-u") || args.includes("--user")) ||
    !(args.includes("-s") || args.includes("--session"))
  ) {
    console.log(help);
    return;
  }

  const userIndex = args.includes("-u")
    ? args.indexOf("-u")
    : args.indexOf("--user");

  const sessionIndex = args.includes("-s")
    ? args.indexOf("-s")
    : args.indexOf("--session");

  const user = args[userIndex + 1];
  const session = args[sessionIndex + 1];

  try {
    const result = await fetchTimetable({
      sem: 50, // SoSe26
      showdate: "6/23/2026",
      viewtype: "week",
      timezone: 2,
      Session: session,
      User: user,
      mode: "calendar",
      stgru: 539,
    });

    await writeFile("timetable.json", JSON.stringify(result), "utf8");
    // console.log(result);
  } catch (error) {
    console.error("Failed to fetch timetable:", error);
  }
}

await main();
