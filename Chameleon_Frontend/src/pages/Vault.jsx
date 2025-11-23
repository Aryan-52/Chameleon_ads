import React, { useState } from "react";

export default function Vault() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [access, setAccess] = useState(false);

  const [payload, setPayload] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    if (password.trim() === "vault123") {
      setAccess(true);
      setError("");
    } else {
      setError("Invalid access key. Unauthorized attempt logged.");
    }
  }

  async function submitPayload() {
    setLoading(true);
    setResponse(null);
    try {
      const r = await fetch("http://localhost:4000/analyze-input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload }),
      });
      const j = await r.json();
      setResponse(j);
    } catch (e) {
      setResponse({ error: "Network error: backend may not be running." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="vault-container">
      {!access ? (
        <>
          <div className="classified-banner">
            HIGHLY CLASSIFIED — AUTHORIZED PERSONNEL ONLY
          </div>
          {error && <div className="vault-error">{error}</div>}
          <div className="vault-validation-card">
            <h2>Vault Access</h2>
            <p className="vault-subtext">
              Enter the secure access key to unlock encrypted records.
            </p>
            <input
              type="password"
              placeholder="Enter access key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-access" onClick={validate}>
              Unlock Vault
            </button>
          </div>
        </>
      ) : (
        <div className="vault-unlocked">
          <h2 className="vault-title">Encrypted Vault Records</h2>
          <div className="vault-data-box">
            ACCESS_GRANTED: LEVEL_5  <br />
            FILES_LOADED: 128  <br />
            CONTENT: ▮▮ ENCRYPTED DATA STREAM ▮▮  <br />
            SECURITY: AES-512 + SHA-X HYBRID  <br />
            STATUS: MONITORING LIVE ACCESS  <br />
          </div>
          <div className="vault-query-section" style={{ marginTop: 24 }}>
            <textarea
              rows={6}
              placeholder="Enter query or command"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #e6f2f3",
              }}
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            />
            <button
              className="btn-primary"
              onClick={submitPayload}
              disabled={loading}
              style={{ marginTop: 12 }}
            >
              {loading ? "Submitting..." : "Submit Query"}
            </button>
            {response && (
              <pre className="response" style={{ marginTop: 12 }}>
                {JSON.stringify(response, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
