import MaxWWrapper from "@/components/max-w-wrapper";
import Section from "../section";

export default function LandingSection({ id }: { id: string }) {
  return (
    <Section id={id}>
      <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", maxWidth: "100%", gap: "5rem" }} className="text-center">
        <hgroup>
          <h1 className="h1">Treppentakt</h1>
          <p className="h4">Ups and Downs</p>
        </hgroup>
        <MaxWWrapper asChild center small>
          <p className="fs-medium">
            Treppentakt uncovers the (literal) “ups and downs” of school life,
            mapping every stair-rise and fall across buildings and floors.
            Explore the patterns, download the data, and marvel at the zigs and
            zags of school life.
          </p>
        </MaxWWrapper>
      </div>
    </Section>
  );
}
