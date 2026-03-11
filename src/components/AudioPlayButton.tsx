import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayButtonProps {
  label: string;
  audioSrc: string;
  isPlaying?: boolean;
  onPlay: (src: string) => void;
  onEnd?: () => void;
  className?: string;
}

export function AudioPlayButton({
  label,
  audioSrc,
  isPlaying,
  onPlay,
  className,
}: AudioPlayButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onPlay(audioSrc)}
      className={cn(
        "flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-full border-2 border-cyan bg-blue-black-base/80 px-4 py-2 backdrop-blur-md transition-all duration-200 hover:scale-[1.08] hover:border-cyan hover:shadow-[0_0_12px_rgba(34,211,238,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-blue-black-base",
        className
      )}
      aria-label={label}
    >
      <Volume2
        className={cn("h-5 w-5 text-cyan", isPlaying && "animate-pulse")}
      />
      <span className="font-space-grotesk text-sm font-medium text-white">
        {label}
      </span>
    </button>
  );
}
