import React, { useState } from 'react';
import { register } from '../services/authService';
import './form.css';

export default function Register() {
  const [form, setForm] = useState({ full_name:'', email:'', username:'', password:'', confirmPassword:'' });
  const [msg, setMsg] = useState('');

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    setMsg('');
    if (!form.full_name || !form.email || !form.username || !form.password || !form.confirmPassword) {
      setMsg('Fill all fields');
      return;
    }
    if (form.password !== form.confirmPassword) { setMsg('Passwords do not match'); return; }
    try {
      const resp = await register({ full_name: form.full_name, email: form.email, username: form.username, password: form.password });
      localStorage.setItem('token', resp.data.token);
      setMsg('Registered — token saved');
      window.location.href = '/dashboard';
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="form-card">
      <h2>Register</h2>
      {msg && <div className="msg">{msg}</div>}
      <form onSubmit={onSubmit}>
        <input name="full_name" placeholder="Full Name" value={form.full_name} onChange={onChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input name="username" placeholder="Username" value={form.username} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={onChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
