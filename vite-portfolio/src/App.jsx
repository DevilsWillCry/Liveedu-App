import AboutSection from "./components/AboutSection";
import MainSection from "./components/MainSection";
import NavBar from "./components/NavBar";

function App() {
  return (
    <main className="w-screen h-auto items-center justify-center font-serif">
      <NavBar />
      <section id="home">
        <MainSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
    </main>
  );
}

export default App;
