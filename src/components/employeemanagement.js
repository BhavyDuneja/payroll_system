// src/components/EmployeeManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        // Fetch all employees when the component mounts
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleInputChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    const addEmployee = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/employees', newEmployee);
            fetchEmployees();  // Refresh the employee list
            setNewEmployee({ name: '', email: '', phone: '' });
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`/api/employees/${id}`);
            fetchEmployees();  // Refresh the employee list
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.phone.includes(searchTerm)
    );

    return (
        <div>
            <h1>Employee Management</h1>

            <div>
                <input
                    type="text"
                    placeholder="Search by name, email or phone"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <form onSubmit={addEmployee}>
                <input
                    type="text"
                    name="name"
                    placeholder="Employee Name"
                    value={newEmployee.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Employee Email"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Employee Phone"
                    value={newEmployee.phone}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Employee</button>
            </form>

            <ul>
                {filteredEmployees.map((employee) => (
                    <li key={employee.id}>
                        {employee.name} - {employee.email} - {employee.phone}
                        <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeManagement;
