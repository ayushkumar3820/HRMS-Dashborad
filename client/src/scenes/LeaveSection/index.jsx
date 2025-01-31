import React, { useState } from 'react';
import './LeaveSection.css';
import { X } from 'lucide-react';

const LeaveSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCalendarPicker, setShowCalendarPicker] = useState(false);

  return (
    <div className="main-container">
      <div className="content-grid">
        {/* Left Panel */}
        <button className="add-leave-button" onClick={() => setShowModal(true)}>
        Add Leave
      </button>
        <div className="panel">
          <div className="panel-header">
            <h2>Applied Leaves</h2>
            <div className="leave-header">
              <span>Profile</span>
              <span>Name</span>
              <span>Date</span>
              <span>Reason</span>
              <span>Status</span>
              <span>Docs</span>
            </div>
          </div>
          <div className="leave-item">
            <div className="profile-circle"></div>
            <div className="employee-details">
              <div>Cody Fisher</div>
              <div className="designation">Senior Backend Developer</div>
            </div>
            <div>8/09/24</div>
            <div>Visiting House</div>
            <div className="status-pill">Approved ▾</div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="panel">
          <div className="calendar-header">
            <h2>Leave Calendar</h2>
            <div className="month-nav">
              <button>‹</button>
              <span>September, 2024</span>
              <button>›</button>
            </div>
          </div>
          
          <div className="calendar">
            <div className="weekdays">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="days">
              {[...Array(31)].map((_, i) => (
                <div key={i} className={i + 1 === 8 ? 'day selected' : 'day'}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="approved-section">
            <h3>Approved Leaves</h3>
            <div className="approved-item">
              <div className="profile-circle"></div>
              <div className="employee-details">
                <div>Cody Fisher</div>
                <div className="designation">Senior Backend Developer</div>
              </div>
              <div className="approved-date">8/09/24</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Leave Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <span>Add New Leave</span>
              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <div className="form-field">
                  <input type="text" placeholder="Search Employee Name" />
                  {/* Add X button when input has value */}
                </div>
                <div className="form-field">
                  <input type="text" placeholder="Designation*" />
                </div>
                <div className="form-field">
                  <input 
                    type="text" 
                    placeholder="Leave Date*"
                    onClick={() => setShowCalendarPicker(!showCalendarPicker)}
                  />
                  {showCalendarPicker && (
                    <div className="date-picker">
                      <div className="picker-header">
                        <button>‹</button>
                        <span>September, 2024</span>
                        <button>›</button>
                      </div>
                      <div className="picker-calendar">
                        {/* Calendar content */}
                      </div>
                    </div>
                  )}
                </div>
                <div className="form-field">
                  <input type="text" placeholder="Reason*" />
                </div>
                <div className="form-field">
                  <button className="document-button">
                    <span>Documents</span>
                    <span>↓</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LeaveSection;