import React, { useState } from 'react';
import axios from 'axios';
import './logout.css';
import { useNavigate } from 'react-router-dom';


const Logout1 = () => {
  const [showLogout, setShowLogout] = useState(true);

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await axios.post('http://localhost:5000/api/auth/logout');
      console.log("Logout successful");
      navigate('/')
      
      setShowLogout(false);
      // Optionally, you can redirect the user to the login page or home page
      // window.location.href = '/login';
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
