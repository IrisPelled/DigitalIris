import { Link } from "react-router-dom";
import type { Lead } from "@/lib/leadStorage";
import { BOTS } from "@/lib/botData";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function getBotDisplayName(botId: string): string {
  return BOTS.find((b) => b.id === botId)?.name ?? botId;
}

function getBotGradient(botId: string): string {
  return BOTS.find((b) => b.id === botId)?.gradientColors[0] ?? "hsl(190, 85%, 65%)";
}

interface UsersTableProps {
  users: Lead[];
  isLoading?: boolean;
}

export function UsersTable({ users, isLoading }: UsersTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-deep-shadow/50 p-8 text-center">
        <p className="font-space-grotesk text-muted-slate">Loading…</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-deep-shadow/50 p-12">
        <img
          src="/assets/svgs/LogoDI.svg"
          alt=""
          className="h-24 w-auto opacity-40"
        />
        <p className="text-center font-space-grotesk text-lg text-muted-slate">
          No registered users yet. Be the first!
        </p>
        <Link
          to="/contact"
          className="rounded-xl border-2 border-cyan px-4 py-2 font-space-grotesk font-medium text-cyan hover:bg-cyan/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-blue-black-base"
        >
          Choose your bot
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-deep-shadow/50 shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" role="table">
          <thead>
            <tr className="sticky top-0 z-10 bg-deep-shadow">
              <th
                scope="col"
                className="border-b border-white/10 px-4 py-3 text-left font-space-grotesk text-sm font-medium uppercase tracking-wide text-muted-slate"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="border-b border-white/10 px-4 py-3 text-left font-space-grotesk text-sm font-medium uppercase tracking-wide text-muted-slate"
              >
                Phone Number
              </th>
              <th
                scope="col"
                className="border-b border-white/10 px-4 py-3 text-left font-space-grotesk text-sm font-medium uppercase tracking-wide text-muted-slate"
              >
                Selected Bot
              </th>
              <th
                scope="col"
                className="border-b border-white/10 px-4 py-3 text-left font-space-grotesk text-sm font-medium uppercase tracking-wide text-muted-slate"
              >
                Date Registered
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={cn(
                  "border-b border-white/5 transition-colors hover:border-l-4 hover:border-l-cyan hover:bg-cyan/5",
                  index % 2 === 0 ? "bg-deep-shadow/80" : "bg-blue-black-base/80"
                )}
              >
                <td className="px-4 py-3 font-space-grotesk text-sm text-white">
                  {user.fullName}
                </td>
                <td className="px-4 py-3 font-space-grotesk text-sm text-white">
                  {user.phoneNumber}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: getBotGradient(user.selectedBot) }}
                    />
                    <span className="font-dancing-script text-base font-bold text-white">
                      {getBotDisplayName(user.selectedBot)}
                    </span>
                  </span>
                </td>
                <td className="px-4 py-3 font-space-grotesk text-sm text-white">
                  {formatDate(user.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
