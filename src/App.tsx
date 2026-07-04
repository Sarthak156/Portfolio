import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="grain relative min-h-screen bg-paper text-ink">
      <Nav />
      <main>
        <Hero />
        <div className="mx-auto h-px w-full max-w-6xl bg-line" />
        <About />
        <div className="mx-auto h-px w-full max-w-6xl bg-line" />
        <Experience />
        <div className="mx-auto h-px w-full max-w-6xl bg-line" />
        <Projects />
        <div className="mx-auto h-px w-full max-w-6xl bg-line" />
        <Skills />
        <div className="mx-auto h-px w-full max-w-6xl bg-line" />
        <Resume />
        <div className="mx-auto h-px w-full max-w-6xl bg-line" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
