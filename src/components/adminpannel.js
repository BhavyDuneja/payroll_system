// src/components/AdminPanel.js
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../style/admin.css';  // Include some CSS for layout

const AdminPanel = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div className="admin-panel">
            {/* Sidebar with navigation links */}
            <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
                <button className="hamburger" onClick={toggleMenu}>
                    ☰
                </button>
                <nav>
                    <ul>
                        <li>
                            <Link to="employee-management">Employee Management</Link>
                        </li>
                        <li>
                            <Link to="payroll-display">Payroll Display</Link>
                        </li>
                        <li>
                            <Link to="settings">Settings</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Content area where the selected subpage will be displayed */}
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPanel;
