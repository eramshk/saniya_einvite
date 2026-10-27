import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "@/App.css";
import {
  AudioToggle,
  Arabesque,
  FloatingParticles,
  PalaceGates,
  RevealPanel,
} from "@/components/royal/RoyalUI";
import {
  BismillahSection,
  DateSection,
  EventSection,
  VenueSection,
  DinnerSection,
  ClosingSection,
} from "@/components/royal/ContentSections";

const NASHEED_URL = `${process.env.PUBLIC_URL}/noor-ul-nikah.mp3`;

const NASHEED_VOLUME = 0.55;
const SCROLL_OFFSET = ["start start", "end start"];
const FADE_RANGE_IN = [0, 1];
const FADE_RANGE_OUT = [1, 0];

const useNasheed = (audioRef) => {
  const [playing, setPlaying] = useState(false);

  const play = async () => {
    if (!audioRef.current) return false;
    try {
      audioRef.current.volume = NASHEED_VOLUME;
      await audioRef.current.play();
      setPlaying(true);
      return true;
    } catch (err) {
      // Autoplay/user-gesture errors are expected — log for debugging only.
      console.warn("[nasheed] playback blocked:", err?.message || err);
      setPlaying(false);
      return false;
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const toggle = () => (playing ? pause() : play());

  return { playing, play, toggle };
};

const Home = () => {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef(null);
  const contentRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: SCROLL_OFFSET,
  });
  const heroFade = useTransform(scrollYProgress, FADE_RANGE_IN, FADE_RANGE_OUT);

  const { playing, play, toggle } = useNasheed(audioRef);

  const handleEnter = () => {
    setOpened(true);
    play();
  };

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.title = "Saniya weds Mubeen — A Royal Nikah";
  }, []);

  return (
    <div className="royal-root" data-testid="royal-root">
      <audio
        ref={audioRef}
        src={NASHEED_URL}
        loop
        preload="auto"
        crossOrigin="anonymous"
        data-testid="nasheed-audio"
      />
      <AudioToggle playing={playing} onToggle={toggle} />

      {/* HERO with gates */}
      <motion.div ref={heroRef} style={{ opacity: heroFade }} className="hero">
        <div className="hero-bg" />
        <FloatingParticles />
        <PalaceGates opened={opened} onEnter={handleEnter} />
        <RevealPanel show={opened} onScroll={scrollToContent} />
        <div className="hero-foreground" aria-hidden="true">
          <div className="hero-arch-frame" />
        </div>
      </motion.div>

      {/* CONTENT */}
      <main ref={contentRef} className="content">
        <Arabesque />
        <BismillahSection />
        <DateSection />
        <EventSection />
        <VenueSection />
        <DinnerSection />
        <ClosingSection />
      </main>
    </div>
  );
};

const App = () => <Home />;

export default App;
