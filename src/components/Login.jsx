import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import '../style/login.css';
import { loginAPI, registerAPI } from '../apis/LoginAPIs';
const Login = () => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI({ email: loginData.email, password: loginData.password });
      localStorage.setItem('token', response.access_token);
      console.log('response', response)
      navigate("/leads")
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerAPI({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        password: registerData.password
      })
      console.log('response', response)
      alert('Registration successful!');
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="tab-container">
        <button
          onClick={() => setActiveTab('login')}
          className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
        >
          Register
        </button>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="auth-form">
              <h2>Login</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="auth-input"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="auth-input"
                required
              />
              <button type="submit" className="auth-button">Login</button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="auth-form">
              <h2>Register</h2>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={registerData.firstName}
                onChange={handleRegisterChange}
                className="auth-input"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={registerData.lastName}
                onChange={handleRegisterChange}
                className="auth-input"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className="auth-input"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className="auth-input"
                required
              />
              <button type="submit" className="auth-button">Register</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
