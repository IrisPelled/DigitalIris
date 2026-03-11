import { cn } from "@/lib/utils";

interface BotChooserCardProps {
  botName: string;
  tagline: string;
  svgThumbnailPath: string;
  gradientColors: [string, string];
  isSelected: boolean;
  onSelect: () => void;
}

export function BotChooserCard({
  botName,
  tagline,
  svgThumbnailPath,
  gradientColors,
  isSelected,
  onSelect,
}: BotChooserCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex min-h-[44px] min-w-[140px] max-w-[160px] flex-shrink-0 flex-col items-center gap-2 rounded-2xl border-2 p-4 shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-blue-black-base",
        isSelected
          ? "scale-105 border-transparent opacity-100 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          : "scale-100 border-transparent opacity-60 grayscale hover:scale-[1.08] hover:opacity-90 hover:grayscale-0"
      )}
      style={
        isSelected
          ? {
              borderImage: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]}) 1`,
              boxShadow: `0 0 24px ${gradientColors[0]}40`,
            }
          : undefined
      }
      aria-pressed={isSelected}
      aria-label={`Select ${botName}`}
    >
      <div className="h-14 w-14 overflow-hidden rounded-xl">
        <img
          src={svgThumbnailPath}
          alt=""
          className={cn("h-full w-full object-contain", !isSelected && "grayscale")}
        />
      </div>
      <span className="font-dancing-script text-xl font-bold leading-tight text-white">
        {botName}
      </span>
      <span className="text-center font-space-grotesk text-sm text-muted-slate leading-tight">
        {tagline}
      </span>
    </button>
  );
}
