"use strict";
import { getConnectionData } from "./connections.mjs";

export async function getStepData() {
  let connections = await getConnectionData();
  const res = connections
    .filter((con) => con.toBuilding === con.fromBuilding)
    .map((con) => ({
      building: con.toBuilding,
      fromLevel: con.fromLevel,
      toLevel: con.toLevel,
      steps: con.steps,
      notes: con.notes,
    }));

  return res;
}
