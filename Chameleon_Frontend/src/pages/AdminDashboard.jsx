import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({});
  const [logs, setLogs] = useState([]);

  const fetchMetrics = async () => {
    const r = await fetch("http://localhost:4000/metrics");
    const j = await r.json();
    setMetrics(j);
  };

  const fetchLogs = async () => {
    const r = await fetch("http://localhost:4000/logs");
    const j = await r.json();
    setLogs(j);
  };

  useEffect(() => {
    fetchMetrics();
    fetchLogs();
    const interval = setInterval(() => {
      fetchMetrics();
      fetchLogs();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Overview</h2>
      <div className="cards">
        <div className="card">
          <h3>Total Events</h3>
          <p>{metrics.total_events || 0}</p>
        </div>
        <div className="card">
          <h3>Unique IPs</h3>
          <p>{metrics.unique_ips || 0}</p>
        </div>
        <div className="card">
          <h3>Top Attack Types</h3>
          <p>
            {metrics.top_attack_types
              ? metrics.top_attack_types.map(([type, count]) => `${type}: ${count}`).join(", ")
              : "-"}
          </p>
        </div>
      </div>
      <h2>Recent Events</h2>
      <table className="logs-table">
        <thead>
          <tr>
            <th>Time</th><th>IP</th><th>Type</th><th>Payload</th>
          </tr>
        </thead>
        <tbody>
          {logs.slice(0, 10).map((e, i) => (
            <tr key={i}>
              <td>{new Date(e.timestamp).toLocaleString()}</td>
              <td>{e.ip}</td>
              <td>{e.attack_type}</td>
              <td><code>{e.payload}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
