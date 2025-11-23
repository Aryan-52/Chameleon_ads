import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register(){
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e){
    e.preventDefault();
    if(!email) return alert("Enter email");
    // mock register -> auto login
    register(email.trim());
  }

  return (
    <div className="login-page">
      <div className="login-card" role="main">
        <h1>Create account</h1>
        <p className="muted">Join Online Data Bank</p>

        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input type="email" placeholder="you@mail.com" value={email} onChange={e=>setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder="Create password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn-primary" type="submit">Register</button>
        </form>

        <p style={{textAlign:'center', marginTop:12}}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
