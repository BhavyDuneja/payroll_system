import Login from './components/login';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/adminpannel.js';
import EmployeeManagement from './components/employeemanagement.js';
import PayrollDisplay from './components/payroll.js';
import Settings from './components/setting.js';

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/admin" element={<AdminPanel />}>
                    <Route path="employee-management" element={<EmployeeManagement />} />
                    <Route path="payroll-display" element={<PayrollDisplay />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </Router>
    </div>
  );
}
export default App;
