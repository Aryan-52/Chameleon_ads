import React, { useState, useEffect } from "react";
import heroImg from "../assets/hero.png";

export default function Dashboard() {
  // LIVE STATE
  const [activeSessions, setActiveSessions] = useState(52);
  const [monthlyTx, setMonthlyTx] = useState(5431);
  const [frauds, setFrauds] = useState(2);

  // Ticker Items
  const [tickerItems, setTickerItems] = useState([
    "08:12 — Acct ••••2345 — Deposit $4200",
    "08:10 — Acct ••••1130 — Transfer $1200",
    "08:40 — Acct ••••8890 — Withdrawal $120",
    "08:11 — Acct ••••6541 — Deposit $900",
    "08:32 — Acct ••••2233 — Deposit $3500",
  ]);

  // CHART STATES
  const [deposits, setDeposits] = useState([12, 15, 18, 13, 20, 17, 19]);
  const [withdrawals, setWithdrawals] = useState([6, 7, 5, 4, 6, 8, 5]);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // ----------------------------------------
  // ⭐ REAL LIVE UPDATES (smooth & safe)
  // ----------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSessions((n) => n + (Math.random() > 0.5 ? 1 : -1));
      setMonthlyTx((n) => n + Math.floor(Math.random() * 5));
      setFrauds((n) => (Math.random() > 0.92 ? n + 1 : n));

      // light chart flicker-update
      setDeposits((a) => a.map((v) => v + Math.floor(Math.random() * 2)));
      setWithdrawals((a) => a.map((v) => v + Math.floor(Math.random() * 2)));

    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // ----------------------------------------
  // ⭐ ADD NEW TICKER ITEM EVERY 6s
  // ----------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const types = ["Deposit", "Withdrawal", "Transfer"];
      const t = types[Math.floor(Math.random() * types.length)];
      const acc = Math.floor(1000 + Math.random() * 9000);
      const amt = Math.floor(50 + Math.random() * 5000);

      const line = `${time} — Acct ••••${acc} — ${t} $${amt}`;

      setTickerItems((prev) => [line, ...prev.slice(0, 10)]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-wrapper">

      {/* HERO */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(9,96,109,0.6), rgba(7,80,87,0.6)), url(${heroImg})`,
        }}
      >
        <div className="hero-inner">
          <h2>Banking Intelligence Dashboard</h2>
          <p>Monitor accounts, security events and real-time activity.</p>
        </div>
      </section>

      {/* PRIMARY METRICS */}
      <section className="metrics">
        <div className="card metric">Accounts<span>895</span></div>
        <div className="card metric">Monthly Tx<span>{monthlyTx.toLocaleString()}</span></div>
        <div className="card metric">Total Deposits<span>$1,234,000</span></div>
        <div className="card metric">Active Sessions<span>{activeSessions}</span></div>
        <div className="card metric">Fraud Alerts<span style={{ color: "red" }}>{frauds}</span></div>
      </section>

      {/* SECONDARY */}
      <section className="metrics">
        <div className="card metric">Threat Score<span>18%</span></div>
        <div className="card metric">USD Rate<span>₹81.70</span></div>
        <div className="card metric">Server Ping<span>70 ms</span></div>
      </section>

      {/* FIXED TICKER — STOP OVERFLOW */}
      <div className="ticker-strip" style={{ overflow: "hidden", maxWidth: "100%" }}>
        <h3>Live Transaction Stream</h3>

        <div
          className="ticker-track"
          style={{
            display: "inline-flex",
            whiteSpace: "nowrap",
            animation: "ticker-scroll 18s linear infinite",
            width: "auto"
          }}
        >
          {tickerItems.map((t, i) => (
            <span key={i} className="ticker-item">{t}</span>
          ))}
        </div>
      </div>

      {/* WEEKLY CHART */}
      <h3>Weekly Deposits vs Withdrawals (k$)</h3>
      <div className="card trend-card">
        <div className="trend-grid">
          {days.map((day, i) => (
            <div className="trend-column" key={i}>
              <div className="trend-bars">
                <div className="trend-bar deposit" style={{ height: `${deposits[i] * 6}px` }}></div>
                <div className="trend-bar withdraw" style={{ height: `${withdrawals[i] * 6}px` }}></div>
              </div>
              <div className="trend-day">{day}</div>
            </div>
          ))}
        </div>

        <div className="trend-legend">
          <span className="legend-dot deposit-dot"></span> Deposits
          <span className="legend-dot withdraw-dot"></span> Withdrawals
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <section className="card" style={{ marginTop: "24px" }}>
        <h3>Recent Activity</h3>

        <table className="logtable">
          <thead>
            <tr>
              <th>Time</th>
              <th>Account</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr><td>09:12</td><td>Acct ••••2345</td><td>Deposit</td><td>$4200</td></tr>
            <tr><td>08:40</td><td>Acct ••••8890</td><td>Withdrawal</td><td>$120</td></tr>
            <tr><td>08:10</td><td>Acct ••••1130</td><td>Transfer</td><td>$1200</td></tr>
            <tr><td>08:11</td><td>Acct ••••6541</td><td>Deposit</td><td>$900</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
