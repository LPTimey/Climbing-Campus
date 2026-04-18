import Section from "../section";
// TODO: Better MapBG
import map from "@/assets/temp/THI_map.jpeg";
import mapDark from "@/assets/temp/THI_map-dark.jpeg";

export function Map({ id }: { id: string }) {
  return (
    <Section id={id} width="full">
      <img
        src={map}
        alt=""
        draggable="false"
        loading="lazy"
        style={{ maxHeight: "80vh", display: "none" }}
      />
      <img
        src={mapDark}
        alt=""
        draggable="false"
        loading="lazy"
        style={{ maxHeight: "80vh" }}
      />
    </Section>
  );
}
