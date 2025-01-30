import React, { useState } from 'react';

const  Logout1 =()=> {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    console.log('Logging out...');
    setShowLogoutPopup(false);
  };

  return (
    <div className="p-4">
      <button 
        onClick={() => setShowLogoutPopup(true)}
        className="px-4 py-2 bg-purple-700 text-white rounded-md"
      >
        Open Logout
      </button>

      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-[450px] overflow-hidden rounded-[24px] bg-white shadow-xl">
            {/* Purple Header */}
            <div className="bg-purple-700 px-6 py-4 text-center">
              <h2 className="text-white text-lg font-medium">Log Out</h2>
            </div>
            
            {/* Content */}
            <div className="p-8">
              <p className="text-center text-gray-700 mb-8 text-lg">
                Are you sure you want to log out?
              </p>
              
              {/* Buttons Container */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowLogoutPopup(false)}
                  className="px-8 py-2.5 rounded-full bg-purple-700 text-white text-sm font-medium hover:bg-purple-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-8 py-2.5 rounded-full border border-red-500 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Backdrop click to close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={() => setShowLogoutPopup(false)}
          />
        </div>
      )}
    </div>
  );
}

export default Logout1;