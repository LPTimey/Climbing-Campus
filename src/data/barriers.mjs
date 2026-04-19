import { parseCsv } from "@/lib/parse-csv.mjs";

export async function getBarrierData() {
  let text = await fetch(
    "./assets/Treppenstufen nach Gebäude - Barrieren.csv",
  ).then((res) => res.text());

  let res = parseCsv(text, {
    delimiter: ",",
    hasHeaders: true,
    parsers: {
      building: (v) => v,
      level: (v) => Number(v),
      note: (v) => v,
    },
  });

  return res;
}
