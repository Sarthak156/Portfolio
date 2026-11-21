import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { PortfolioPage } from "@/pages/portfolio";
import { ResumePage } from "@/pages/resume";

type RouteName = "home" | "resume";

const TITLES: Record<RouteName, string> = {
  home: "AKAI — Sarthak Goyal · The Scroll of a Data Shinobi",
  resume: "Resume — Sarthak Goyal · Data Science & ML",
};

const DESCRIPTIONS: Record<RouteName, string> = {
  home: "The portfolio of Sarthak Goyal: data science, machine learning and software engineering. Explore real forecasting systems, computer vision projects and VECV experience.",
  resume: "Sarthak Goyal’s resume: education, VECV data science internship, machine learning projects, technical skills and certifications.",
};

function currentRoute(): RouteName {
  return typeof window !== "undefined" && window.location.hash.startsWith("#/resume")
    ? "resume"
    : "home";
}

/**
 * Tiny hash router (replaces TanStack Start's file-based SSR routing).
 * Page routes use "#/..." hashes; in-page chapter anchors keep using plain
 * "#chapter" fragments, which the GSAP scroll-story hook intercepts itself.
 */
export default function App() {
  const [route, setRoute] = useState<RouteName>(currentRoute);
  const [musicEnabled, setMusicEnabled] = useState(() => localStorage.getItem("akai-music") !== "muted");
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music/bgmusic.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.35;
    let startAttempted = false;

    const playMusic = async () => {
      if (!musicEnabled) return;
      try {
        await audio.play();
        setMusicPlaying(true);
      } catch {
        setMusicPlaying(false);
      }
    };

    const startOnInteraction = () => {
      if (startAttempted) return;
      startAttempted = true;
      void playMusic();
    };

    if (musicEnabled) void playMusic();
    document.addEventListener("pointerdown", startOnInteraction, { once: true });
    document.addEventListener("keydown", startOnInteraction, { once: true });
    window.addEventListener("scroll", startOnInteraction, { once: true, passive: true });

    (window as Window & { __akaiMusic?: HTMLAudioElement }).__akaiMusic = audio;
    return () => {
      document.removeEventListener("pointerdown", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
      window.removeEventListener("scroll", startOnInteraction);
      delete (window as Window & { __akaiMusic?: HTMLAudioElement }).__akaiMusic;
      audio.pause();
      audio.src = "";
    };
  }, [musicEnabled]);

  const toggleMusic = async () => {
    const audio = (window as Window & { __akaiMusic?: HTMLAudioElement }).__akaiMusic;
    const nextEnabled = !musicEnabled;

    setMusicEnabled(nextEnabled);
    localStorage.setItem("akai-music", nextEnabled ? "playing" : "muted");

    if (!nextEnabled) {
      audio?.pause();
      setMusicPlaying(false);
      return;
    }

    if (audio) {
      try {
        await audio.play();
        setMusicPlaying(true);
      } catch {
        setMusicPlaying(false);
      }
    }
  };

  useEffect(() => {
    const onHashChange = () => setRoute(currentRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.title = TITLES[route];
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = DESCRIPTIONS[route];
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <>
      {route === "resume" ? <ResumePage /> : <PortfolioPage />}
      <button
        type="button"
        className="music-toggle"
        onClick={toggleMusic}
        aria-label={musicEnabled ? "Mute background music" : "Play background music"}
        aria-pressed={musicPlaying}
        title={musicEnabled ? "Mute music" : "Play music"}
      >
        {musicEnabled ? <Volume2 /> : <VolumeX />}
      </button>
    </>
  );
}
