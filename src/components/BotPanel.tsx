import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { BotInfo } from "@/lib/botData";
import { AudioPlayButton } from "./AudioPlayButton";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

interface BotPanelProps {
  bot: BotInfo;
  scrollLeft: number;
  scrollTop: number;
  isMobile: boolean;
  panelIndex: number;
  reduceMotion: boolean;
  onCtaClick: () => void;
  currentAudioSrc: string | null;
  onAudioPlay: (src: string) => void;
}

export function BotPanel({
  bot,
  scrollLeft,
  scrollTop,
  isMobile,
  panelIndex,
  reduceMotion,
  onCtaClick,
  currentAudioSrc,
  onAudioPlay,
}: BotPanelProps) {
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [charHover, setCharHover] = useState(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    // threshold גבוה כדי שתמיד יהיה פאנל אחד \"פעיל\" בלבד
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const panelWidth = typeof window !== "undefined" ? window.innerWidth : 1920;
  const panelHeight = typeof window !== "undefined" ? window.innerHeight : 1080;
  const scrollPos = isMobile ? scrollTop : scrollLeft;
  const size = isMobile ? panelHeight : panelWidth * 0.95;
  const offset = (panelIndex * size + size / 2) - scrollPos - size / 2;
  const parallaxScene = reduceMotion ? 0 : offset * 0.6;
  const parallaxChar = reduceMotion ? 0 : offset * 0.8;

  useEffect(() => {
    if (!inView) return;
    const img = new Image();
    img.src = bot.svgPath;
    img.onload = () => setSvgLoaded(true);
  }, [inView, bot.svgPath]);

  return (
    <section
      ref={panelRef}
      className="relative flex min-h-screen w-screen flex-shrink-0 snap-center snap-always flex-col items-center justify-center px-4 py-12 md:min-h-screen md:w-[95vw] md:flex-row md:px-0 md:py-0"
      aria-labelledby={`bot-name-${bot.id}`}
    >
      {/* Layer 2 — מלבן תמונת רקע */}
      <div
        className="absolute left-1/2 top-[38%] z-0 w-[70vw] max-w-[980px] -translate-x-1/2 -translate-y-1/2 aspect-[16/9] md:w-[68vw]"
        style={{
          background: `linear-gradient(135deg, ${bot.gradientColors[0]}, ${bot.gradientColors[1]})`,
          borderRadius: "32px",
          transform: isMobile
            ? `translate3d(-50%, calc(-50% + ${-parallaxScene * 0.5}px), 0)`
            : `translate3d(calc(-50% + ${-parallaxScene}px), -50%, 0)`,
          padding: "2px",
          opacity: inView ? 1 : 0,
          transition: "opacity 200ms ease-out",
        }}
      >
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[32px] bg-deep-shadow">
          <img
            src={bot.bgImagePath}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: "left center" }}
          />
        </div>
      </div>

      {/* Layer 3 — Bot character; בולט ב-hover (scale 1.1) */}
      <div
        className="absolute right-0 top-[65%] z-20 flex h-[50vh] w-[40%] -translate-y-1/2 items-center justify-end md:right-[1%] md:h-[60vh] md:w-[45%]"
        style={{
          transform: (() => {
            const t = isMobile
              ? `translate3d(0, calc(-50% + ${-parallaxChar * 0.5}px), 0)`
              : `translate3d(${-parallaxChar}px, -50%, 0)`;
            const s = !reduceMotion && charHover ? " scale(1.1)" : "";
            return t + s;
          })(),
          transition: "transform 300ms ease-out",
        }}
        onMouseEnter={() => setCharHover(true)}
        onMouseLeave={() => setCharHover(false)}
      >
        {inView && (
          <div
            className="relative h-full w-full max-w-[400px] md:max-w-[500px]"
            style={{
              // ורודה חזקה סביב הבוטית
              filter:
                "drop-shadow(0 0 30px rgba(236,72,153,0.9)) drop-shadow(0 0 55px rgba(236,72,153,0.6))",
            }}
          >
            {svgLoaded || (
              <div className="h-full w-full animate-pulse bg-deep-shadow/50 rounded" />
            )}
            <img
              src={bot.svgPath}
              alt=""
              className={cn(
                "h-full w-auto object-contain object-right",
                !svgLoaded && "hidden"
              )}
              onLoad={() => setSvgLoaded(true)}
            />
          </div>
        )}
      </div>

      {/* Layer 4 — שם + כפתורים מעל הדמות (z-30) כדי שיהיו ניתנים ללחיצה */}
      <h1
        id={`bot-name-${bot.id}`}
        className={cn(
          "absolute top-[48%] z-30 font-dancing-script text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl xl:text-8xl",
          bot.id === "iris-simulations" && "left-[13%] md:left-[17vw]",
          bot.id === "brain-boost-iris" && "left-[15%] md:left-[19vw]",
          !["iris-simulations", "brain-boost-iris"].includes(bot.id) && "left-[18%] md:left-[22vw]"
        )}
        style={{
          textShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
        }}
      >
        {bot.name}
      </h1>
      {/* פיסקה + כפתורים מתחת למלבן */}
      <div className="absolute bottom-[16%] left-[5%] z-30 flex max-w-[480px] flex-col items-start gap-3 md:left-[10vw]">
        <p className="font-space-grotesk text-lg text-muted-slate">
          {bot.subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <AudioPlayButton
            label={`Meet ${bot.name}`}
            audioSrc={bot.audioPath}
            isPlaying={currentAudioSrc === bot.audioPath}
            onPlay={onAudioPlay}
          />
          <CTAButton
            label="GET ACCESS"
            onClick={() => {
              navigate(`/contact?bot=${bot.id}`);
              onCtaClick();
            }}
          />
        </div>
      </div>
    </section>
  );
}
