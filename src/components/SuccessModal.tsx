import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getBotLink } from "@/lib/botLinks";

interface SuccessModalProps {
  botName: string;
  /** Bot id for optional "Go to [Bot Name]" link; if getBotLink(id) is set, show the button */
  selectedBotId?: string;
  onDismiss: () => void;
  onViewList: () => void;
}

export function SuccessModal({ botName, selectedBotId, onDismiss, onViewList }: SuccessModalProps) {
  const botLink = selectedBotId ? getBotLink(selectedBotId) : undefined;
  const navigate = useNavigate();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const h = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      onDismiss();
      onViewList();
    }, 5000);
    return () => clearTimeout(t);
  }, [onDismiss, onViewList]);

  const handleViewList = () => {
    onDismiss();
    onViewList();
    navigate("/registrants");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      onClick={(e) => e.target === e.currentTarget && (onDismiss(), onViewList())}
    >
      <div
        className="mx-4 flex max-w-md flex-col items-center gap-6 rounded-3xl border border-white/10 bg-blue-black-base/95 p-8 shadow-2xl backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-full bg-cyan/20 text-cyan shadow-[0_0_24px_rgba(34,211,238,0.4)]",
            !reduceMotion && "animate-scale-in"
          )}
        >
          <Check className="h-10 w-10" strokeWidth={2.5} />
        </div>
        <h2
          id="success-modal-title"
          className="font-dancing-script text-3xl font-bold text-white"
        >
          Welcome aboard!
        </h2>
        <p className="text-center font-space-grotesk text-lg text-muted-slate">
          You've registered for {botName}. We'll be in touch soon.
        </p>
        {botLink && (
          <a
            href={botLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "min-h-[44px] rounded-xl border-2 border-cyan/60 bg-blue-black-base/80 px-6 py-3 font-space-grotesk text-base font-medium text-white no-underline backdrop-blur-md",
              "hover:scale-[1.02] hover:border-cyan hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-blue-black-base"
            )}
          >
            Go to {botName}
          </a>
        )}
        <button
          type="button"
          onClick={handleViewList}
          className={cn(
            "min-h-[44px] rounded-xl border-2 border-magenta bg-blue-black-base/80 px-6 py-3 font-space-grotesk text-base font-medium text-white backdrop-blur-md",
            "hover:scale-[1.02] hover:border-magenta hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-blue-black-base"
          )}
        >
          View registered users
        </button>
      </div>
    </div>
  );
}
