import { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";
import { CTAButton } from "@/components/CTAButton";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? "/registrants";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-black-base px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-blue-black-base/80 p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-6 font-space-grotesk text-2xl font-medium text-white">
          Staff login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-password" className="mb-1 block font-space-grotesk text-sm font-medium text-white">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-xl border-2 border-white/20 bg-deep-shadow px-4 py-2 font-space-grotesk text-white placeholder:text-white/50 focus:border-cyan focus:outline-none"
              placeholder="Admin password"
              required
            />
          </div>
          {error && (
            <p className="font-space-grotesk text-sm text-magenta">{error}</p>
          )}
          <CTAButton
            type="submit"
            label={isSubmitting ? "Signing in…" : "Log in"}
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}
