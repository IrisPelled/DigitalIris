import { useCallback, useRef, useState } from "react";

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingSrcRef = useRef<string | null>(null);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    playingSrcRef.current = null;
    setCurrentSrc(null);
    setIsPlaying(false);
  }, []);

  const play = useCallback(
    (src: string, onEnd?: () => void) => {
      if (playingSrcRef.current === src && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        playingSrcRef.current = null;
        setCurrentSrc(null);
        setIsPlaying(false);
        return;
      }
      stop();
      const audio = new Audio(src);
      audioRef.current = audio;
      audio.addEventListener("ended", () => {
        playingSrcRef.current = null;
        setIsPlaying(false);
        setCurrentSrc(null);
        onEnd?.();
      });
      audio.play().then(() => {
        playingSrcRef.current = src;
        setCurrentSrc(src);
        setIsPlaying(true);
      });
    },
    [stop]
  );

  return { play, stop, currentSrc, isPlaying };
}
