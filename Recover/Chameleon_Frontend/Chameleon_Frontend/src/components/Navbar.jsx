import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="brand">Online Data Bank</div>

      {user && (
        <div className="nav-right">
          <span className="user-email">{user.email}</span>

          <span
            className="user-role"
            style={{
              color: user.role === "admin" ? "#ffcc00" : "#9ee2ff",
              fontWeight: 700,
              marginLeft: "6px",
            }}
          >
            {user.role.toUpperCase()}
          </span>

          <button className="btn-ghost" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
