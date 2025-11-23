import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="brand-small">Online Data Bank</div>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          "side-link" + (isActive ? " active" : "")
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/vault"
        className={({ isActive }) =>
          "side-link" + (isActive ? " active" : "")
        }
      >
        Vault
      </NavLink>

      {user?.role === "admin" && (
        <NavLink
          to="/logs"
          className={({ isActive }) =>
            "side-link" + (isActive ? " active" : "")
          }
        >
          Logs
        </NavLink>
      )}

      <NavLink
        to="/home"
        className={({ isActive }) =>
          "side-link" + (isActive ? " active" : "")
        }
      >
        Home
      </NavLink>
    </aside>
  );
}
