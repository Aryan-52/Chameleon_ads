import React, { useState } from "react";

export default function Vault() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [access, setAccess] = useState(false);

  function validate() {
    if (password.trim() === "vault123") {
      setAccess(true);
      setError("");
    } else {
      setError("Invalid access key. Unauthorized attempt logged.");
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
            <p className="vault-subtext">Enter the secure access key to unlock encrypted records.</p>

            <input
              type="password"
              placeholder="Enter access key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn-access" onClick={validate}>Unlock Vault</button>
          </div>
        </>
      ) : (
        <div>
          <h2 className="vault-title">Encrypted Vault Records</h2>

          <div className="vault-data-box">
            ACCESS_GRANTED: LEVEL_5  
            FILES_LOADED: 128  
            CONTENT: ▮▮ ENCRYPTED DATA STREAM ▮▮  
            SECURITY: AES-512 + SHA-X HYBRID  
            STATUS: MONITORING LIVE ACCESS  
          </div>
        </div>
      )}

    </div>
  );
}
