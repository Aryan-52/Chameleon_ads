import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function login(email) {
    const clean = email.trim().toLowerCase();
    const isAdmin = clean.endsWith("@spit.ac.in");
    const u = { email: clean, role: isAdmin ? "admin" : "user" };
    setUser(u);
    // then we let the Login page handle navigation
  }

  function register(email) {
    login(email);
  }

  function logout() {
    setUser(null);
    navigate("/");
  }

  return (
    <AuthCtx.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
