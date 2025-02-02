import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './logout.css';

const Logout1 = () => {
  const [showLogout, setShowLogout] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await axios.post('http://localhost:5000/api/auth/logout');
      console.log("Logout successful");
      
      // Clear any stored authentication data (if you're using any)
      localStorage.removeItem('token'); // If you're using JWT
      sessionStorage.removeItem('token'); // If you're using session storage
      
      setShowLogout(false);
      
      // Redirect to login page using navigate
      navigate('/login');
      
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleCancel = () => {
    setShowLogout(false);
    // Optionally navigate back to the previous page
    navigate(-1);
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
                  onClick={handleCancel}
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