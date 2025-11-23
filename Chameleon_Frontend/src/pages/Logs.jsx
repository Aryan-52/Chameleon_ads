import React, { useEffect, useState } from "react";

export default function Logs() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:4000/logs");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEntries(data);
      setError(null);
    } catch (err) {
      console.error("Could not fetch logs:", err);
      setError("Could not fetch logs. Try again later.");
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); // every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="logs-page">
      <h2>Honeypot Activity Logs (Admin)</h2>
      {error && <div className="logs-error">{error}</div>}
      <table className="logs-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>IP</th>
            <th>Label</th>
            <th>Acc</th>
            <th>Type</th>
            <th>Payload</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => {
            const dateObj = new Date(e.timestamp);
            const timeStr = isNaN(dateObj) ? "N/A" : dateObj.toLocaleString();
            return (
              <tr key={i}>
                <td>{timeStr}</td>
                <td>{e.ip}</td>
                <td>{e.label}</td>
                <td>{e.probability !== null ? (e.probability * 100).toFixed(2) + "%" : "-"}</td>
                <td>{e.attack_type}</td>
                <td><code>{e.payload}</code></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
