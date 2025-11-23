import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const isAdmin = user && user.email.toLowerCase().endsWith("@spit.ac.in");

  return (
    <nav className="navbar">
      <div className="brand">Chameleon</div>
      <div className="nav-right">
        {user && (
          <>
            <span className="user-email">{user.email}</span>
            <span className="user-role">{isAdmin ? "ADMIN" : "USER"}</span>
            <button className="btn-ghost" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
