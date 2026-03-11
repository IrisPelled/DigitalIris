import { useState, useEffect, useCallback } from "react";
import { getLeads } from "@/lib/leadApi";
import { getAllLeads } from "@/lib/leadStorage";
import type { Lead } from "@/lib/leadStorage";
import { UsersTable } from "@/components/UsersTable";

export default function RegisteredUsersPage() {
  const [users, setUsers] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await getLeads();
      setUsers(data);
    } catch {
      setUsers(getAllLeads().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="min-h-screen bg-blue-black-base px-4 py-12 md:px-8 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <h1 className="font-space-grotesk text-3xl font-bold text-white">
            Registered Users
          </h1>
          <p className="mt-2 font-space-grotesk text-lg text-muted-slate">
            Students and educators who joined the Iris community
          </p>
        </header>
        {error && (
          <p className="mb-4 font-space-grotesk text-magenta">{error}</p>
        )}
        <UsersTable users={users} isLoading={isLoading} />
      </div>
    </div>
  );
}
