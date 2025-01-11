import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import LeadsPage from './components/LeadsList';
import './App.css';
import './style/leads.css';
import './style/tasks.css';

const App = () => {
  return (
    <Router basename="/TaskManagement_Frontend">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/leads" element={<LeadsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
