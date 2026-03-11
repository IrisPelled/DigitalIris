import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-black-base">
        <p className="font-space-grotesk text-muted-slate">Loading…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
