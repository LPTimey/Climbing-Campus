import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { TimeTable } from "./src/data/timetable/parse_timetable.mjs";
import path from "node:path";

/** @import {} from "@types/node/index.d.ts" */

const help = `\
Usage:
  node parse-timetables.mjs [options]

Options:
  -h, --help                  Show this help
  -d <dir>                    Directory containing API .json files
  -r                          Recurse into subdirectories (only with -d)
  -f <file>                   Single API .json file
  -o <dir>                   Output directory (default: ./assets/data/parsed_timetables/)
`;

async function main() {
  //#region PARSER

  /** @type {{
   *   help: boolean,
   *   directory: string | null,
   *   recurse: boolean,
   *   file: string | null,
   *   output: string
   * }}
   */
  const options = {
    help: false,
    directory: null,
    recurse: false,
    file: null,
    output: "./assets/data/parsed_timetables/",
  };

  const args = process.argv.slice(2);

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case "-h":
      case "--help":
        options.help = true;
        break;

      case "-d":
        if (i + 1 >= args.length) {
          throw new Error("-d requires a directory path");
        }
        options.directory = args[++i];
        break;

      case "-r":
        options.recurse = true;
        break;

      case "-f":
        if (i + 1 >= args.length) {
          throw new Error("-f requires a file path");
        }
        options.file = args[++i];
        break;

      case "-o":
        if (i + 1 >= args.length) {
          throw new Error("-o requires an output directory");
        }
        options.output = args[++i];
        break;

      default:
        throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (options.help) {
    console.log(help);
    return;
  }

  if (options.directory && options.file) {
    throw new Error("Use either -d or -f, not both.");
  }

  if (!options.directory && !options.file) {
    throw new Error("Either -d or -f must be specified.");
  }

  if (options.recurse && !options.directory) {
    throw new Error("-r can only be used together with -d.");
  }

  console.log(options);

  //#endregion PARSER

  //#region COLLECT FILES

  let files = [];

  if (options.file) {
    files.push(options.file);
  }

  if (options.directory) {
    async function collectJsonFiles(dir) {
      const entries = await readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          if (options.recurse) {
            await collectJsonFiles(fullPath);
          }
        } else if (entry.isFile() && entry.name.endsWith(".json")) {
          files.push(fullPath);
        }
      }
    }

    await collectJsonFiles(options.directory);
  }

  //#endregion COLLECT FILES

  //#region PROCESS + OUTPUT

  await mkdir(options.output, { recursive: true });
  console.log("start")

  const timetables = [];

  for (const file of files) {
    const jsonStr = await readFile(file, "utf-8");
    const api = JSON.parse(jsonStr);
    
    const timetable = TimeTable.fromAPI(api);
    timetables.push(timetable);

    const baseName = path.basename(file, ".json");
    const outPath = path.join(options.output, `${baseName}.json`);

    await writeFile(outPath, JSON.stringify(timetable, null, 2), "utf-8");
  }

  // console.dir(timetables, { depth: 8 });

  //#endregion PROCESS + OUTPUT
}

await main().catch((err) => {
  console.error(err.stack);
  console.error(`Error: ${err}\n`);
  console.log(help);
  process.exit(1);
});
