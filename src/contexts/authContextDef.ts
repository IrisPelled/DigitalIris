import { createContext } from "react";

export type AuthContextValue = {
  isAuthenticated: boolean | null;
  login: (password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
