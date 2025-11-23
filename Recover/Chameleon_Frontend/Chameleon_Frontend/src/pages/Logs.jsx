import React, { useEffect, useState } from "react";

/*
 Admin-only logs. Backend MUST validate admin access.
 */
export default function Logs(){
  const [logs, setLogs] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:4000/logs")
      .then(r=>r.json())
      .then(setLogs)
      .catch(()=>setLogs([]));
  },[]);

  return (
    <div className="logs-page">
      <h2>Honeypot Activity Logs (Admin)</h2>
      <div className="card">
        <table className="logtable">
          <thead><tr><th>Time</th><th>IP</th><th>Label</th><th>Payload</th></tr></thead>
          <tbody>
            {logs.map((l,i)=>(
              <tr key={i}>
                <td>{l.ts ? new Date(l.ts).toLocaleString() : "-"}</td>
                <td>{l.ip}</td>
                <td>{l.mlResult?.label || "N/A"}</td>
                <td style={{maxWidth:400,overflow:"hidden",textOverflow:"ellipsis"}}>{l.payload}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
