import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Registration.css';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: '',
    Cpass: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.pass !== formData.Cpass) {
      setError("Passwords didn't match");
      return;
    }

    if (formData.pass.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await axios.post('/api/register/', formData);
      if (response.data.success) {
        navigate('/signin', { state: { message: 'Registration successful! Please sign in.' } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="Cpass"
              value={formData.Cpass}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Register</button>
        </form>
        <p className="signin-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
