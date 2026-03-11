import { MouseEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const baseClass =
  "relative flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-magenta/60 bg-blue-black-base/80 px-6 py-3 text-center font-space-grotesk text-lg font-medium text-white backdrop-blur-md transition-all duration-200 hover:scale-[1.08] hover:border-magenta hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-blue-black-base disabled:pointer-events-none disabled:opacity-50";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  to?: string;
  rippleColor?: string;
}

export function CTAButton({
  className,
  children,
  label = "GET ACCESS",
  to,
  rippleColor = "rgba(236, 72, 153, 0.4)",
  onClick,
  disabled,
  ...props
}: CTAButtonProps) {
  const navigate = useNavigate();
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; size: number; key: number }>
  >([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    setRipples((prev) => [
      ...prev,
      {
        x: e.clientX - rect.left - size / 2,
        y: e.clientY - rect.top - size / 2,
        size,
        key: Date.now(),
      },
    ]);
    if (to && e.currentTarget.tagName === "BUTTON") navigate(to);
    onClick?.(e as MouseEvent<HTMLButtonElement>);
  };

  useEffect(() => {
    if (ripples.length === 0) return;
    const last = ripples[ripples.length - 1];
    const t = setTimeout(
      () => setRipples((p) => p.filter((r) => r.key !== last.key)),
      600
    );
    return () => clearTimeout(t);
  }, [ripples]);

  const content = (
    <>
      <span className="relative z-10">{children ?? label}</span>
      <span className="pointer-events-none absolute inset-0">
        {ripples.map((r) => (
          <span
            key={r.key}
            className="absolute animate-rippling rounded-full"
            style={{
              width: r.size,
              height: r.size,
              left: r.x,
              top: r.y,
              backgroundColor: rippleColor,
            }}
          />
        ))}
      </span>
    </>
  );

  if (to && !disabled) {
    return (
      <Link
        to={to}
        className={cn(baseClass, "no-underline", className)}
        onClick={handleClick}
        aria-label={label}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={cn(baseClass, className)}
      onClick={handleClick}
      disabled={disabled}
      aria-label={label}
      {...props}
    >
      {content}
    </button>
  );
}
