import { useEffect, useState } from "react";
import Section from "../section";
import { getStepData } from "@/data/steps";
import { getConnectionData } from "@/data/connections";
import { getBarrierData } from "@/data/barriers";

export function Charts({ id }: { id: string }) {
  const [steps, setSteps] = useState<any>(null);
  const [connections, setConnections] = useState<any>(null);
  const [barriers, setBarriers] = useState<any>(null);

  useEffect(() => {
    getStepData().then(setSteps);
    getConnectionData().then(setConnections);
    getBarrierData().then(setBarriers);
  }, []); // leeres Dependency‑Array → nur beim Mounten ausführen

  return (
    <Section id={id} paddingBlock="6rem">
      <pre>{steps ? JSON.stringify(steps, null, 2) : "Loading Schritte…"}</pre>
      <pre>
        {connections
          ? JSON.stringify(connections, null, 2)
          : "Lade Verbindungen…"}
      </pre>
      <pre>
        {barriers ? JSON.stringify(barriers, null, 2) : "Lade Barrieren…"}
      </pre>
    </Section>
  );
}
