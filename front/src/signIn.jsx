import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './context/AuthProvider';

export default function SignIn() {
  const { login } = useContext(AuthContext);
  const [data, setData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:8081/signin', data);
      if (res.data.token) {
        login(res.data.token);
        navigate('/');
      } else {
        setError("Failed to sign in: No token received");
      }
    } catch (err) {
      setError("Failed to sign in: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="w-25 bg-white rounded p-4 shadow">
        <h2 className="mb-4 text-center">Sign In</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="username"
              value={data.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/forgot-password" className="d-block text-primary">Forgot Password?</Link>
          <Link to="/create-account" className="d-block text-primary mt-2">Create New Account</Link>
        </div>
      </div>
    </div>
  );
}