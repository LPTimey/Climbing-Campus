import MaxWWrapper from "@/components/max-w-wrapper";
import Section from "../section";

/// TODO: Text
export function Explanation({ id }: { id: string }) {
  return (
    <Section id={id} paddingBlock="6rem">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          maxWidth: "100%",
          gap: "5rem",
        }}
      >
        <article>
          <hgroup>
            <h2 className="h2">Explanations</h2>
            <h3 className="h4">What we did</h3>
          </hgroup>
          <MaxWWrapper asChild center small>
            <p className="fs-medium">
              Treppentakt uncovers the (literal) “ups and downs” of school life,
              mapping every stair-rise and fall across buildings and floors.
              Explore the patterns, download the data, and marvel at the zigs
              and zags of school life.
            </p>
          </MaxWWrapper>
        </article>
        <article>
          <hgroup>
            <h3 className="h4">What we did</h3>
          </hgroup>
          <MaxWWrapper asChild center small>
            <p className="fs-medium">
              Treppentakt uncovers the (literal) “ups and downs” of school life,
              mapping every stair-rise and fall across buildings and floors.
              Explore the patterns, download the data, and marvel at the zigs
              and zags of school life.
            </p>
          </MaxWWrapper>
        </article>
        <article>
          <hgroup>
            <h3 className="h4">What we did</h3>
          </hgroup>
          <MaxWWrapper asChild center small>
            <p className="fs-medium">
              Treppentakt uncovers the (literal) “ups and downs” of school life,
              mapping every stair-rise and fall across buildings and floors.
              Explore the patterns, download the data, and marvel at the zigs
              and zags of school life.
            </p>
          </MaxWWrapper>
        </article>
        <article>
          <hgroup>
            <h3 className="h4">What we did</h3>
          </hgroup>
          <MaxWWrapper asChild center small>
            <p className="fs-medium">
              Treppentakt uncovers the (literal) “ups and downs” of school life,
              mapping every stair-rise and fall across buildings and floors.
              Explore the patterns, download the data, and marvel at the zigs
              and zags of school life.
            </p>
          </MaxWWrapper>
        </article>
        <article>
          <hgroup>
            <h3 className="h4">What we did</h3>
          </hgroup>
          <MaxWWrapper asChild center small>
            <p className="fs-medium">
              Treppentakt uncovers the (literal) “ups and downs” of school life,
              mapping every stair-rise and fall across buildings and floors.
              Explore the patterns, download the data, and marvel at the zigs
              and zags of school life.
            </p>
          </MaxWWrapper>
        </article>
      </div>
    </Section>
  );
}
