import React, { useState, useEffect } from 'react';
import { MoreVertical, Search } from 'lucide-react';
import './EmployeeTable.css';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/attendance', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add your token here
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${errorData.message || response.statusText}`);
      }
      const data = await response.json();
      if (!Array.isArray(data.attendances)) {
        throw new Error('API response is not an array');
      }
      setEmployees(data.attendances);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError(error.message);
    }
  };

  const updateAttendance = async (employeeId, status) => {
    try {
      const response = await fetch('http://localhost:5000/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add your token here
        },
        body: JSON.stringify({
          employeeId,
          date: new Date().toISOString().split('T')[0],
          status: status.toUpperCase(),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${errorData.message || response.statusText}`);
      }
      fetchEmployees();
    } catch (error) {
      console.error('Error updating attendance:', error);
      setError(error.message);
    }
  };

  const filteredEmployees = employees
    .filter((employee) =>
      statusFilter === 'All' ? true : employee.status === statusFilter
    )
    .filter((employee) =>
      employee.employeeId && employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="employee-container">
      <div className="filter-section">
        <select
          className="status-filter"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="All">Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Employee Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>
                  <img
                    src={employee.image || '/api/placeholder/40/40'}
                    alt=""
                    className="profile-image"
                  />
                </td>
                <td>{employee.employeeId}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>{employee.task || '--'}</td>
                <td>
                  <select
                    className={`status-select ${employee.status.toLowerCase()}`}
                    value={employee.status}
                    onChange={(e) =>
                      updateAttendance(employee.employeeId, e.target.value)
                    }
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
                <td>
                  <button className="action-button">
                    <MoreVertical className="action-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
