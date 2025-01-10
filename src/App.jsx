import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="container">
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </div>
        <div
          className={`tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </div>
      </div>
      <div>
        {activeTab === 'login' && <Login />}
        {activeTab === 'register' && <Register />}
      </div>
    </div>
  );
}

export default App;