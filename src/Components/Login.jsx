import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Image6 from '../assets/slogo.png'; // Adjust the path as needed
import './Login.css'; // Make sure to create and import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    axios.post('http://18.60.190.183:4000/s2admin', { email, password })
      .then(response => {
        if (response.status === 200) {
          alert('Successfully logged in');
          navigate('/Home'); // Navigate to the dashboard after a successful login
        } else {
          alert('Login failed');
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        alert('Error logging in. Please try again later.');
      });
  };

  const clearError = (field) => {
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <div className="login-wrapper">
      {/* Logo at the top */}
      <img src={Image6} alt="Logo" className="login-logo" />

      <div className="login-form-wrapper">
        <h1 className="login-title">Login</h1>

        {/* Form Container */}
        <div className="input-group">
          {/* Email field */}
          <div className="input-item">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
            />
          </div>
          {errors.email && <p className="error-message">{errors.email}</p>}

          {/* Password field */}
          <div className="input-item">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              id="password"
              type="password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
            />
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        {/* Login Button */}
        <button className="submit-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
