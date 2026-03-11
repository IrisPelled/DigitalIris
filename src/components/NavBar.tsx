import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/contact", label: "Contact" },
  { path: "/registrants", label: "Registrations" },
] as const;

export default function NavBar() {
  const location = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex h-14 items-center justify-between bg-blue-black-base/80 px-6 backdrop-blur-md"
      aria-label="Main navigation"
    >
      <Link
        to="/"
        className="flex shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-blue-black-base"
      >
        <img
          src="/assets/svgs/LogoDI.svg"
          alt="Digital Iris"
          className="h-8 w-auto"
        />
      </Link>
      <ul className="flex items-center gap-6">
        {NAV_LINKS.map(({ path, label }) => {
          const isActive = location.pathname === path;
          return (
            <li key={path}>
              <Link
                to={path}
                className={cn(
                  "font-space-grotesk text-2xl font-medium tracking-tight transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-blue-black-base",
                  isActive
                    ? "text-white underline decoration-cyan underline-offset-4 decoration-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                    : "text-muted-slate hover:text-white hover:scale-[1.08]"
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
