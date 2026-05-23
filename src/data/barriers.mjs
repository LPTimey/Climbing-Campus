"use strict";
import { parseCsv } from "@/lib/parse-csv.mjs";

export async function getBarrierData() {
  let text = await fetch(
    "./assets/data/Treppenstufen nach Gebäude - Barrieren.csv",
  ).then((res) => res.text());

  let res = parseCsv(text, {
    delimiter: ",",
    hasHeaders: true,
    parsers: {
      building: (v) => v,
      levels: (v) => v.split(";").map(Number),
      note: (v) => v,
    },
  });

  return res;
}
