import { readdir, readFile } from "node:fs/promises";
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
`;

async function main() {
  //#region PARSER
  /** @type {{
   *   help: boolean,
   *   directory: string | null,
   *   recurse: boolean,
   *   file: string | null
   * }}
   */
  const options = {
    help: false,
    directory: null,
    recurse: false,
    file: null,
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

  //#region IMPL
  let files = [];

  if (options.file) {
    files.push(options.file);
  }
  if (options.dir) {
    /**
     * @param {string} dir
     */
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

    await collectJsonFiles(options.dir);
  }

  let timetables = [];
  for (const file of files) {
    let jsonStr = await readFile(file);
    let api = JSON.parse(jsonStr);
    timetables.push(TimeTable.fromAPI(api));
  }

  console.dir(timetables, { depth: 8 });

  //#endregion IMPL
}

await main().catch(
  /** @param {Error} err */ (err) => {
    console.error(err.stack);
    console.error(`Error: ${err}\n`);
    console.log(help);
    process.exit(1);
  },
);
