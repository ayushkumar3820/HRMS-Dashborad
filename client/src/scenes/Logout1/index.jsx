import React, { useState } from 'react';
import './logout.css';

const Logout1 = () => {
  const [showLogout, setShowLogout] = useState(true);

  const handleLogout = () => {
    console.log("Logging out...");
    setShowLogout(false);
  };

  return (
    <div className="app">
      {showLogout && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-header">
              <h2>Log Out</h2>
            </div>

            <div className="popup-content">
              <p>Are you sure you want to log out?</p>

              <div className="button-group">
                <button
                  onClick={() => setShowLogout(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="logout-button"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logout1;
