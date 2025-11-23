import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar() {
  const { user } = useAuth();
  const isAdmin = user && user.email.toLowerCase().endsWith("@spit.ac.in");

  return (
    <aside className="sidebar">
      <div className="brand-small">Chameleon</div>
      <NavLink to="/" className="side-link">Home</NavLink>
      <NavLink to="/vault" className="side-link">Vault</NavLink>
      {isAdmin && (
        <>
          <NavLink to="/logs" className="side-link">Logs</NavLink>
          <NavLink to="/dashboard" className="side-link">Dashboard</NavLink>
        </>
      )}
    </aside>
  );
}
