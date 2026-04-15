// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import "./App.css";
import Footer from "./ui/footer";
import Header from "./ui/header";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* Intro */}
        <section id="Intro">
          <hgroup className="h1">
            <h1>{/* Titel */}</h1>
            <p>Ups &amp; Downs</p>
          </hgroup>
          <p>
            {/* Explainer/Teaser Text */}
          </p>
        </section>
        {/* Game */}
        <section id="Game">
          <canvas></canvas>
        </section>
        {/* Map */}
        <section id="Map"></section>
        {/* Charts */}
        <section id="Charts"></section>
        {/* Explanation */}
        <section id="Explanation"></section>
      </main>
      <Footer />
    </>
  );
}

export default App;
