import { parseCsv } from "@/lib/parse-csv.mjs";

export async function getConnectionData() {
  let text = await fetch(
    "./assets/Treppenstufen nach Gebäude - Verbindungen.csv",
  ).then((res) => res.text());

  let res = parseCsv(text, {
    delimiter: ",",
    hasHeaders: true,
    parsers: {
      fromBuilding: (v) => v,
      fromLevel: (v) => Number(v),
      toBuilding: (v) => v,
      toLevel: (v) => Number(v),
    },
  });

  return res;
}
