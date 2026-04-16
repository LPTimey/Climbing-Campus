import "./App.css";
import ToTop from "./components/to-top";
import Footer from "./ui/footer";
import Header from "./ui/header";
import Section from "./ui/section";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* Intro */}
        <Section id="Intro" width={{ center: true }}>
          <hgroup className="h1">
            <h1>TreppenTakt</h1>
            <p>Ups &amp; Downs</p>
          </hgroup>
          <p>{/* Explainer/Teaser Text */}</p>
        </Section>
        {/* Game */}
        <Section id="Game" width={{ center: true }}>
          <canvas></canvas>
        </Section>
        {/* Map */}
        <Section id="Map" width={{ center: true }}></Section>
        {/* Charts */}
        <Section id="Charts" width={{ center: true }}></Section>
        {/* Explanation */}
        <Section id="Explanation" width={{ center: true }}></Section>
      </main>
      <Footer />
      <ToTop />
    </>
  );
}

export default App;
