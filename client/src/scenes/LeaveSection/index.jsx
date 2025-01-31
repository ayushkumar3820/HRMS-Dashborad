import React, { useState } from 'react';
import { Calendar as CalendarIcon, Search, Filter, X, Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import './LeaveSection.css'; // Import the CSS file for styling

function LeaveSection() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const dummyLeaves = [
    {
      id: '1',
      name: 'Cody Fisher',
      date: '2024-08-09',
      reason: 'Visiting House',
      status: 'Approved',
      designation: 'Senior Backend Developer'
    },
    // Add more dummy data as needed
  ];

  const filteredLeaves = dummyLeaves.filter(leave => {
    const matchesSearch = leave.name.toLowerCase().includes(searchTerm.toLowerCase());
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
              <Filter className="filter-icon" />
            </div>
            <div className="search-input">
              <input
                type="text"
                placeholder="Search"
                className="input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="search-icon" />
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
          <div className="applied-leaves">
            <div className="card">
              <h2 className="card-title">Applied Leaves</h2>
              <div className="leaves-list">
                {filteredLeaves.map((leave) => (
                  <div key={leave.id} className="leave-item">
                    <div className="leave-details">
                      <img
                        src={`https://source.unsplash.com/random/40x40?face&${leave.id}`}
                        alt={leave.name}
                        className="avatar"
                      />
                      <div>
                        <h3 className="leave-name">{leave.name}</h3>
                        <p className="leave-designation">{leave.designation}</p>
                      </div>
                    </div>
                    <div className="leave-date">{leave.date}</div>
                    <div className="leave-reason">{leave.reason}</div>
                    <div className={`leave-status ${leave.status.toLowerCase()}`}>
                      {leave.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="leave-calendar">
            <div className="card">
              <h2 className="card-title">Leave Calendar</h2>
              <div className="calendar-header">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}>
                  <ChevronLeft className="icon" />
                </button>
                <h3 className="calendar-month">
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}>
                  <ChevronRight className="icon" />
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
                      filteredLeaves.some(leave => new Date(leave.date).getDate() === i + 1)
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
                {filteredLeaves.map((leave) => (
                  <div key={leave.id} className="approved-leave-item">
                    <div className="leave-details">
                      <img
                        src={`https://source.unsplash.com/random/40x40?face&${leave.id}`}
                        alt={leave.name}
                        className="avatar"
                      />
                      <div>
                        <h3 className="leave-name">{leave.name}</h3>
                        <p className="leave-designation">{leave.designation}</p>
                      </div>
                    </div>
                    <div className="leave-date">{leave.date}</div>
                  </div>
                ))}
              </div>
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
                <X className="icon" />
              </button>
            </div>
            <form className="modal-form">
              <div className="form-group">
                <input
                  type="text"
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
                  placeholder="Leave Date*"
                  className="input"
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Reason*"
                  className="textarea"
                  rows={3}
                />
              </div>
              <div className="form-group upload-section">
                <Upload className="upload-icon" />
                <p className="upload-text">Upload Documents</p>
              </div>
              <button
                type="submit"
                className="save-btn"
              >
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
