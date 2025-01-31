import React, { useState } from "react";
import axios from "axios"; // Import Axios

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // For Signup only
  const [loading, setLoading] = useState(false); // Loading state for button

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const apiUrl = isLogin ? "/api/login" : "/api/signup"; // Set the URL based on login or signup
    const payload = isLogin ? { email, password } : { fullName, email, password }; // Adjust payload for Signup

    axios
      .post(apiUrl, payload)
      .then((response) => {
        if (response.status === 200) {
          // Handle success (e.g., redirect to dashboard or show success message)
          console.log("Success:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error (e.g., show error message to user)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="register-container">
      {/* Left Section */}
      <div className="left-section">
        <img src="dashboard-image.jpg" alt="Dashboard Preview" className="dashboard-img" />
        <h2>Welcome to Dashboard</h2>
        <p>Manage your HR operations efficiently with our dashboard.</p>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <h2>{isLogin ? "Login to Dashboard" : "Sign Up for Dashboard"}</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* Show Full Name only for SignUp */}
          {!isLogin && (
            <>
              <label>Full Name*</label>
              <input
                type="text"
                placeholder="Full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </>
          )}

          <label>Email Address*</label>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password*</label>
          <div className="password-input">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setPasswordVisible(!passwordVisible)}>👁️</span>
          </div>

          {/* Show Confirm Password only for SignUp */}
          {!isLogin && (
            <>
              <label>Confirm Password*</label>
              <div className="password-input">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                />
                <span onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>👁️</span>
              </div>
            </>
          )}

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Loading..." : isLogin ? "Login" : "Register"}
          </button>

          {/* Toggle between Login and Signup */}
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button type="button" className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

