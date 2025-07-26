
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/auth/login', form);
      const { token, role } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userId', res.data.user.id);
      if (role === 'admin') navigate('/admin');
      else if (role === 'user') navigate('/user');
      else if (role === 'store_owner') navigate('/store-owner');
    } catch (err) {
      toast.error('Invalid credentials!');
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>Login</h2>
      <input
        className="form-control my-2"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        className="form-control my-2"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      <p className="mt-3">Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;
