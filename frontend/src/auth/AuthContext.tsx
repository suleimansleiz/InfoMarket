/* eslint-disable react-refresh/only-export-components */
// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Role = "user" | "seller" | "admin" | null;

interface AuthContextType {
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(null);

  // Load saved role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem("authRole");
    if (savedRole) {
      setRole(savedRole as Role);
    }
  }, []);

  const login = (newRole: Role) => {
    setRole(newRole);
    if (newRole) {
      localStorage.setItem("authRole", newRole);
    }
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("authRole");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
