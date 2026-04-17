import Section from "../section";
import Game from "./three-setup";

export default function GameSection({ id }: { id: string }) {
  return (
    <Section id={id} width="full">
      <Game />
    </Section>
  );
}
