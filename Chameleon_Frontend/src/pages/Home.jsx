import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import heroImg from "../assets/hero.png";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="home-page">

      {/* ================= HERO SECTION ================= */}
      <section
        className="home-hero"
        style={{
          height: "420px",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 12px 32px rgba(0,0,0,0.20)",
          marginBottom: "30px",
          backgroundImage: `linear-gradient(180deg, rgba(9,80,85,0.6), rgba(9,80,85,0.35)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="hero-text" style={{ padding: "60px", color: "white" }}>
          <h1 style={{ fontSize: "42px", margin: 0 }}>
            Smart. Secure. Modern Banking.
          </h1>

          <p style={{ opacity: 0.95, marginTop: "10px", maxWidth: "600px" }}>
            Manage your money with intelligent insights and powerful security.
          </p>

          <div style={{ marginTop: 22 }}>
            <button
              className="btn-primary large"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>

            <button
              className="btn-ghost large"
              style={{
                marginLeft: "12px",
                background: "rgba(255,255,255,0.15)",
                padding: "12px 22px",
                borderRadius: "8px",
                color: "white",
                border: "1px solid rgba(255,255,255,0.25)",
                cursor: "pointer",
              }}
              onClick={() => navigate("/vault")}
            >
              Access Vault
            </button>
          </div>
        </div>
      </section>

      {/* ================= WELCOME BACK ================= */}
      <section style={{ marginTop: 40 }}>
        <h2 style={{ marginBottom: 10 }}>Welcome Back 👋</h2>

        <p style={{ maxWidth: "720px", color: "#587b7c" }}>
          You are now securely logged into your Online Data Bank.  
          Access your dashboard for real-time updates, manage your vault 
          and view system activity with complete security and transparency.
        </p>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section style={{ marginTop: 40 }}>
        <h3 style={{ marginBottom: 18 }}>Why Online Data Bank?</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          <div className="card" style={{ padding: 18 }}>
            <h4>Enterprise-Grade Security</h4>
            <p style={{ color: "#587b7c" }}>
              Military-level encryption protects all transactions and vault records.
            </p>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <h4>Real-Time Insights</h4>
            <p style={{ color: "#587b7c" }}>
              Stay updated with instant tracking of deposits and withdrawals.
            </p>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <h4>Intelligent Fraud Alerts</h4>
            <p style={{ color: "#587b7c" }}>
              Instantly detect suspicious activity using AI-based scanning.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SYSTEM STATUS SECTION ================= */}
      <section style={{ marginTop: 40, marginBottom: 50 }}>
        <h3 style={{ marginBottom: 18 }}>System Status</h3>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div className="card" style={{ padding: "14px 20px", flex: "1" }}>
            <h4>Active Users</h4>
            <p style={{ fontSize: "20px", fontWeight: 700 }}>52 Online</p>
          </div>

          <div className="card" style={{ padding: "14px 20px", flex: "1" }}>
            <h4>Today's Transactions</h4>
            <p style={{ fontSize: "20px", fontWeight: 700 }}>8,432 Processed</p>
          </div>

          <div className="card" style={{ padding: "14px 20px", flex: "1" }}>
            <h4>Server Health</h4>
            <p style={{ fontSize: "20px", fontWeight: 700 }}>Optimal ✓</p>
          </div>
        </div>
      </section>

    </div>
  );
}
