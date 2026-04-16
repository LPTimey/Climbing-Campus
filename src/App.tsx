import "./App.css";
import MaxWWrapper from "./components/max-w-wrapper";
import ToTop from "./components/to-top";
import Footer from "./ui/footer";
import Game from "./ui/game";
import Header from "./ui/header";
import Section from "./ui/section";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* Intro */}
        <Section id="Intro">
          <div style={{ display: "grid", gap: "5rem" }} className="text-center">
            <hgroup>
              <h1 className="h1">Treppentakt</h1>
              <p className="h4">Ups and Downs</p>
            </hgroup>
            <MaxWWrapper asChild center small>
              <p className="fs-medium">
                {/* TODO: Explainer/Teaser Text */}
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
            </MaxWWrapper>
          </div>
        </Section>
        {/* Game */}
        <Section id="Game" width="full">
          <Game />
        </Section>
        {/* Map */}
        <Section id="Map"></Section>
        {/* Charts */}
        <Section id="Charts"></Section>
        {/* Explanation */}
        <Section id="Explanation"></Section>
      </main>
      <Footer />
      <ToTop />
    </>
  );
}

export default App;
