import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Square } from "lucide-react";
import { BeamsBackground } from "@/components/BeamsBackground";
import { BotPanel } from "@/components/BotPanel";
import { BOTS } from "@/lib/botData";
import { useAudio } from "@/lib/useAudio";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const { play, stop, currentSrc } = useAudio();

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowScrollHint(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      setScrollLeft(el.scrollLeft);
      setScrollTop(el.scrollTop);
    };
    el.addEventListener("scroll", onScroll);
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  const isMobile = viewportWidth < 768;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-black-base">
      <BeamsBackground
        className="!absolute inset-0 !min-h-0"
        intensity="strong"
      />
      <div
        ref={scrollRef}
        className={cn(
          "relative z-10 flex w-full",
          isMobile
            ? "flex-col snap-y snap-mandatory overflow-x-hidden overflow-y-auto"
            : "h-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
        )}
        style={{
          scrollSnapType: isMobile ? "y mandatory" : "x mandatory",
          height: isMobile ? "100vh" : "100%",
        }}
        role="region"
        aria-label="Iris bots showcase"
      >
        {BOTS.map((bot, index) => (
          <BotPanel
            key={bot.id}
            bot={bot}
            scrollLeft={scrollLeft}
            scrollTop={scrollTop}
            isMobile={isMobile}
            panelIndex={index}
            reduceMotion={reduceMotion}
            onCtaClick={() => {}}
            currentAudioSrc={currentSrc}
            onAudioPlay={(src) => play(src)}
          />
        ))}
      </div>
      {/* Stop audio — visible when audio is playing */}
      {currentSrc && (
        <button
          type="button"
          onClick={() => stop()}
          aria-label="Stop audio"
          className="absolute right-[6%] top-[20%] z-20 flex items-center gap-2 rounded-full border-2 border-cyan/80 bg-magenta/30 px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-cyan hover:bg-magenta/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-blue-black-base"
        >
          <Square className="h-4 w-4" fill="currentColor" />
          Stop
        </button>
      )}
      {/* כפתור חץ חזרה — מופיע מהמסך השני ואילך */}
      <button
        type="button"
        onClick={() => {
          const el = scrollRef.current;
          if (!el) return;
          if (isMobile) {
            el.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
          } else {
            el.scrollBy({ left: -viewportWidth, behavior: "smooth" });
          }
        }}
        aria-label="Scroll to previous bot"
        className={cn(
          "absolute left-[6%] top-[40%] z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cyan/80 bg-magenta/30 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-cyan hover:bg-magenta/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-blue-black-base md:h-16 md:w-16",
          isMobile ? scrollTop > 100 : scrollLeft > viewportWidth * 0.3
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <ChevronLeft className="h-8 w-8 md:h-9 md:w-9" strokeWidth={2.5} />
      </button>
      {/* כפתור חץ לגלילה — לצד תמונת הרקע, בלי מילים */}
      <button
        type="button"
        onClick={() => {
          const el = scrollRef.current;
          if (!el) return;
          if (isMobile) {
            el.scrollBy({ top: window.innerHeight, behavior: "smooth" });
          } else {
            el.scrollBy({ left: viewportWidth, behavior: "smooth" });
          }
        }}
        aria-label="Scroll to next bot"
        className={cn(
          "absolute right-[6%] top-[40%] z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cyan/80 bg-magenta/30 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-cyan hover:bg-magenta/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-blue-black-base md:h-16 md:w-16",
          showScrollHint && scrollLeft < viewportWidth * 2.85
            ? "opacity-100"
            : "pointer-events-none opacity-0",
          !reduceMotion && showScrollHint && scrollLeft < viewportWidth * 2.85 && "animate-pulse"
        )}
      >
        <ChevronRight className="h-8 w-8 md:h-9 md:w-9" strokeWidth={2.5} />
      </button>
    </div>
  );
}
