import "./App.css";
import { Charts } from "./ui/charts";
import ToTop from "./components/to-top";
import { Explanation } from "./ui/explanation";
import { Map } from "./ui/map";
import Footer from "./ui/footer";
import GameSection from "./ui/game";
import Header from "./ui/header";
import LandingSection from "./ui/landing";

function App() {
  return (
    <>
      <Header />
      <main>
        <LandingSection id="Intro" />
        <GameSection id="Game" />
        <Map id="Map" />
        <Charts id="Charts" />
        <Explanation id="Explanation" />
      </main>
      <Footer />
      <ToTop />
    </>
  );
}

export default App;
