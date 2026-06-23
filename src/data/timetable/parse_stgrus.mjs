// @ts-nocheck
import fs from "fs";
import * as cheerio from "cheerio";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, "stgrus.html");
const html = fs.readFileSync(INPUT_FILE, "utf8");
const $ = cheerio.load(html);

/**
 * Extracts the second parameter from:
 * STPL.Stgru.StgruSet(17, 174)
 */
function extractLeafData(li) {
  const onclick = $(li).attr("onclick");

  if (!onclick) return null;

  const match = onclick.match(/StgruSet\(\s*\d+\s*,\s*(\d+)\s*\)/);

  if (!match) return null;

  return {
    id: Number(match[1]),
    title: $(li).attr("title")?.trim() ?? "",
    short: $(li).find("> a").text().trim(),
  };
}

function parseNode(li) {
  // Leaf node (contains StgruSet)
  if ($(li).attr("onclick")) {
    return extractLeafData(li);
  }

  // Intermediate node
  const label = $(li).find("> label").first().text().trim();

  if (!label) return null;

  const childOl = $(li).children("ol").first();

  const children = [];

  childOl.children("li").each((_, childLi) => {
    const child = parseNode(childLi);

    if (child) {
      children.push(child);
    }
  });

  return {
    name: label,
    children,
  };
}

const result = [];

$("ol.tree > li").each((_, li) => {
  const node = parseNode(li);

  if (node) {
    result.push(node);
  }
});

fs.writeFileSync(
  path.join(__dirname, "stgrus.json"),
  JSON.stringify(result, null, 2),
  "utf8",
);

console.log(`Written ${result.length} root nodes to output.json`);
