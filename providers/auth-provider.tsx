"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthData {
  user: {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    profile_picture: string | null;
  };
  restaurant: {
    uuid: string;
    name: string;
    logo: string | null;
    staff_members: Array<{
      uuid: string;
      role: string;
      user: {
        uuid: string;
        name: string;
        email: string;
      };
    }>;
  };
  role: string;
}

interface AuthContextType {
  authData: AuthData | null;
  setAuthData: (data: AuthData | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authData, setAuthData] = useState<AuthData | null>(null);

  useEffect(() => {
    // Load auth data from localStorage on mount
    const loadAuthData = () => {
      try {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
          const parsedAuth = JSON.parse(storedAuth);
          setAuthData(parsedAuth);
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
      }
    };

    loadAuthData();
  }, []);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 