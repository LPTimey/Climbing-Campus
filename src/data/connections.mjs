"use strict";
import { parseCsv } from "@/lib/parse-csv.mjs";

export async function getConnectionData() {
  let text = await fetch(
    "./assets/Treppenstufen nach Gebäude - Verbindungen.csv",
  ).then((res) => res.text());

  console.log(text)

  let res = parseCsv(text, {
    delimiter: ",",
    hasHeaders: true,
    parsers: {
      fromBuilding: (v) => v,
      fromLevel: (v) => (v === "0" ? 0 : Number(v)),
      toBuilding: (v) => v,
      toLevel: (v) => (v === "0" ? 0 : Number(v)),
      steps: (v) => (v === "0" ? 0 : Number(v)),
      notes: (v) => v,
    },
  });

  return res;
}
