"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/user";
import { authService } from "@/services/auth-service";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 fetch /me dùng service
  const fetchUser = async () => {
    try {
      const res = await authService.me();
      setUser(res.data);
    } catch (error) {
      // ❗ nếu 401 thì coi như chưa login
      setUser(null);
    }
  };

  // load lần đầu
  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
      setIsLoading(false);
    };
    loadUser();
  }, []);

  // refresh user (sau login)
  const refreshUser = async () => {
    setIsLoading(true);
    await fetchUser();
    setIsLoading(false);
  };

  // logout
  const logout = async () => {
    try {
      await authService.logout();
    } catch {}

    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user, // 🔥 thêm cái này rất quan trọng
    refreshUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// hook dùng cho tiện
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
