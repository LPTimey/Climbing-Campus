import Section from "../section";
// TODO: Better MapBG
import map from "@/assets/THI_map.jpeg";

export function Map({ id }: { id: string }) {
  return <Section id={id} width="full">
    <img src={map} alt="" draggable="false" loading="lazy" style={{maxHeight:"80vh"}} />
  </Section>;
}
