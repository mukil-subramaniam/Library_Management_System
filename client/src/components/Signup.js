import { useState } from 'react';
import { userSignup } from '../api/api';
import '../styles/Signup.css';

const Signup = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
    phone: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userSignup(
        user.username,
        user.email,
        user.name,
        user.password,
        user.phone
      );
      setSuccess('Signup successful! You can now log in.');
      setError('');
    } catch (err) {
      console.error('Signup error:', err);
      setError('Signup failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="signup-outer-wrapper">
      <div className="signup-container">
        <h2 className="signup-header">User Signup</h2>
        {error && <p className="signup-error-message">{error}</p>}
        {success && <p className="signup-success-message">{success}</p>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label className="signup-label">Username</label>
            <input
              type="text"
              name="username"
              className="signup-input"
              placeholder="Enter Username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-form-group">
            <label className="signup-label">Email</label>
            <input
              type="email"
              name="email"
              className="signup-input"
              placeholder="Enter Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-form-group">
            <label className="signup-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="signup-input"
              placeholder="Enter Full Name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-form-group">
            <label className="signup-label">Password</label>
            <input
              type="password"
              name="password"
              className="signup-input"
              placeholder="Enter Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-form-group">
            <label className="signup-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="signup-input"
              placeholder="Enter Phone Number"
              value={user.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-button">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
