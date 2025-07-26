import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'user'
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      toast.success('Registered successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error('Registration failed.');
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>Register</h2>
      <input
        className="form-control my-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
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
      <select
        className="form-control my-2"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="user">User</option>
        <option value="store_owner">Store Owner</option>
        <option value="admin">Admin</option>
      </select>
      <button className="btn btn-success" onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
