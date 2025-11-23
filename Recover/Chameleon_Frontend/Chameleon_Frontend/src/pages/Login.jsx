import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login(){
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e){
    e.preventDefault();
    if(!email) return alert("Enter email");
    login(email.trim());
  }

  return (
    <div className="login-page">
      <div className="login-card" role="main">
        <h1>Online Data Bank</h1>
        <p className="muted">Secure Access Portal</p>

        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input type="email" placeholder="you@mail.com" value={email} onChange={e=>setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn-primary" type="submit">Login</button>
        </form>

        <p style={{textAlign:'center', marginTop:12}}>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
