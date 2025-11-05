import React, { useState } from 'react';
import { login } from '../services/authService';
import './form.css';

export default function Login() {
  const [form, setForm] = useState({ identifier:'', password:'' });
  const [msg, setMsg] = useState('');

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      const resp = await login(form);
      localStorage.setItem('token', resp.data.token);
      setMsg('Logged in — token saved');
      window.location.href = '/dashboard';
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-card">
      <h2>Login</h2>
      {msg && <div className="msg">{msg}</div>}
      <form onSubmit={onSubmit}>
        <input name="identifier" placeholder="Username or Email" value={form.identifier} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
