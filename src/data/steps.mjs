"use strict";
import { parseCsv } from "@/lib/parse-csv.mjs";

export async function getStepData() {
  let text = await fetch(
    "./assets/Treppenstufen nach Gebäude - Stufen.csv",
  ).then((res) => res.text());

  let res = parseCsv(text, {
    delimiter: ",",
    hasHeaders: true,
    parsers: {
      building: (v) => v,
      toLevel: (v) => Number(v),
      steps: (v) => Number(v),
      notes: (v) => v,
    },
  });

  return res;
}
