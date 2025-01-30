import React, { useState } from 'react';
import AddLeavePopup from './AddLeavePopup.jsx';
import './LeaveSection.css';

const LeaveSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="leave-section">
      <div className="sidebar">
        <div className="logo">LOGO</div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
        </div>
        <div className="menu">
          <ul>
            <li>Recruitment</li>
            <li>Candidates</li>
            <li>Organization</li>
            <li>Employees</li>
            <li>Attendance</li>
            <li className="active">Leaves</li>
            <li>Others</li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <div className="leave-header">
          <h2>Leaves</h2>
          <div className="header-buttons">
            <input type="text" placeholder="Search" className="search-input" />
            <button onClick={openPopup} className="add-leave-button">Add Leave</button>
          </div>
        </div>
        <div className="leave-content">
          <div className="applied-leaves">
            <h3>Applied Leaves</h3>
            <table>
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Docs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><img src="profile.jpg" alt="Profile" /></td>
                  <td>Cody Fisher</td>
                  <td>8/09/24</td>
                  <td>Visiting House</td>
                  <td>Approved</td>
                  <td><button>View</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="leave-calendar">
            <h3>Leave Calendar</h3>
            <div className="calendar">
              {/* Calendar component can be added here */}
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && <AddLeavePopup onClose={closePopup} />}
    </div>
  );
};

export default LeaveSection;
