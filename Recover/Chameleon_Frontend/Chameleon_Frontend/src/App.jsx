import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Vault from "./pages/Vault.jsx";
import Logs from "./pages/Logs.jsx";
import NotFound from "./pages/NotFound.jsx";

import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";

export default function App() {
  const { user } = useAuth();
  const loggedIn = !!user;

  return (
    <div className="app-root">

      {loggedIn && <Navbar />}

      <div className={loggedIn ? "layout" : "layout-no-sidebar"}>
        {loggedIn && <Sidebar />}

        <main className="main-content">
          <Routes>

            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* Auth pages */}
            <Route
              path="/login"
              element={!loggedIn ? <Login /> : <Navigate to="/dashboard" replace />}
            />
            <Route
              path="/register"
              element={!loggedIn ? <Register /> : <Navigate to="/dashboard" replace />}
            />

            {/* Protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/vault"
              element={
                <ProtectedRoute>
                  <Vault />
                </ProtectedRoute>
              }
            />

            <Route
              path="/logs"
              element={
                <ProtectedRoute adminOnly={true}>
                  <Logs />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </main>
      </div>
    </div>
  );
}
