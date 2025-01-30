import React from 'react';
import './AddLeavePopup.css';

const AddLeavePopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Add New Leave</h2>
        <button className="close-button" onClick={onClose}>×</button>
        <form>
          <label>
            Search Employee Name:
            <input type="text" />
          </label>
          <label>
            Designation:
            <input type="text" />
          </label>
          <label>
            Leave Date:
            <input type="date" />
          </label>
          <label>
            Documents:
            <input type="file" />
          </label>
          <label>
            Reason:
            <input type="text" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddLeavePopup;
