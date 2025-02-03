import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Upload, ChevronLeft, ChevronRight, File } from 'lucide-react';
import axios from 'axios';
import './LeaveSection.css';

function LeaveSection() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [leaves, setLeaves] = useState([]);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`${API_URL}/leaves`);
        setLeaves(response.data.leaves);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };

    fetchLeaves();
  }, []);

  const handleAddLeave = async (leaveData) => {
    try {
      const response = await axios.post(`${API_URL}/leaves`, leaveData, {
        headers: {
          Authorization: 'sd' // Add your authorization token here
        }
      });
      setLeaves([...leaves, response.data.leave]);
      setShowModal(false);
    } catch (error) {
      console.error('Error posting leave:', error);
    }
  };

  const handleUpdateLeave = async (leaveId, leaveData) => {
    try {
      const response = await axios.put(`${API_URL}/leaves/${leaveId}`, leaveData, {
        headers: {
          Authorization: 'sd' // Add your authorization token here
        }
      });
      setLeaves(leaves.map(leave => leave._id === leaveId ? response.data.leave : leave));
    } catch (error) {
      console.error('Error updating leave:', error);
    }
  };

  const filteredLeaves = leaves.filter(leave => {
    const matchesSearch = leave.employeeId.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || leave.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  return (
    <div className="container">
      <div className="content">
        <div className="header">
          <div className="filters">
            <div className="filter-select">
              <select
                className="select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
              <Filter className="filter-icon" size={16} />
            </div>
            <div className="search-input">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search"
                className="input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="add-leave-btn"
          >
            Add Leave
          </button>
        </div>

        <div className="grid">
          <div className="card">
            <h2 className="card-title">Applied Leaves</h2>
            <div className="leaves-list">
              {filteredLeaves.map((leave) => (
                <div key={leave._id} className="leave-item">
                  <div className="leave-details">
                    <img
                      src="dashboard-image.jpg"
                      alt={leave.employeeId.name}
                      className="avatar"
                    />
                    <div>
                      <h3 className="leave-name">{leave.employeeId.name}</h3>
                      <p className="leave-designation">{leave.employeeId.designation}</p>
                    </div>
                  </div>
                  <div className="leave-date">{new Date(leave.startDate).toLocaleDateString()}</div>
                  <div className="leave-reason">{leave.reason}</div>
                  <div className={`leave-status ${leave.status.toLowerCase()}`}>
                    <select
                      value={leave.status}
                      onChange={(e) => handleUpdateLeave(leave._id, { ...leave, status: e.target.value })}
                    >
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <File className="docs-icon" size={16} />
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="card-title">Leave Calendar</h2>
            <div className="calendar-header">
              <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}>
                <ChevronLeft size={20} />
              </button>
              <h3 className="calendar-month">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h3>
              <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}>
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="calendar-grid">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <div key={day} className="calendar-day-label">
                  {day}
                </div>
              ))}
              {[...Array(getFirstDayOfMonth(currentMonth))].map((_, i) => (
                <div key={`empty-${i}`} className="calendar-day-empty"></div>
              ))}
              {[...Array(getDaysInMonth(currentMonth))].map((_, i) => (
                <div
                  key={i + 1}
                  className={`calendar-day ${
                    filteredLeaves.some(leave => new Date(leave.startDate).getDate() === i + 1)
                      ? 'has-leave'
                      : ''
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="approved-leaves">
              <h3>Approved Leaves</h3>
              {filteredLeaves
                .filter(leave => leave.status === 'Approved')
                .map((leave) => (
                  <div key={leave._id} className="approved-leave-item">
                    <div className="leave-details">
                      <img
                        src="dashboard-image.jpg"
                        alt={leave.employeeId.name}
                        className="avatar"
                      />
                      <div>
                        <h3 className="leave-name">{leave.employeeId.name}</h3>
                        <p className="leave-designation">{leave.employeeId.designation}</p>
                      </div>
                    </div>
                    <div className="leave-date">{new Date(leave.startDate).toLocaleDateString()}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Add New Leave</h2>
              <button onClick={() => setShowModal(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>
            <form
              className="modal-form"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  employeeId: e.target.employeeName.value,
                  startDate: e.target.leaveDate.value,
                  endDate: e.target.leaveDate.value,
                  reason: e.target.reason.value,
                  status: 'Pending',
                };
                handleAddLeave(formData);
              }}
            >
              <div className="form-group">
                <input
                  type="text"
                  name="employeeName"
                  placeholder="Search Employee Name"
                  className="input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Designation*"
                  className="input"
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  name="leaveDate"
                  placeholder="Leave Date*"
                  className="input"
                />
              </div>
              <div className="form-group">
                <textarea
                  name="reason"
                  placeholder="Reason*"
                  className="input"
                  rows={3}
                />
              </div>
              <div className="upload-section">
                <Upload className="upload-icon" size={20} />
                <p className="upload-text">Upload Documents</p>
              </div>
              <button type="submit" className="save-btn">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaveSection;
