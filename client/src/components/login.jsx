import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import './LoginPage.css' // Import useNavigate

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For Signup only
  const [fullName, setFullName] = useState(""); // For Signup only
  const [loading, setLoading] = useState(false); // Loading state for button

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const apiUrl = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register"; // Set the URL based on login or signup
    const payload = isLogin
      ? { email, password }
      : { fullName, email, password, confirmPassword, role: "user" }; // Adjust payload for Signup

    axios
      .post(apiUrl, payload)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          // Handle success (e.g., redirect to dashboard or show success message)
          console.log("Success:", response.data);
          if (isLogin) {
            navigate("/dashboard"); // Redirect to dashboard only on login
          } else {
            // Show a success message or any other action for registration
            alert("Registration successful! Please log in.");
            setIsLogin(true); // Switch to login form
          }
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
    <>
      <div className="logo-container">
        <div className="logo-box"></div>
        <span className="logo-text">LOGO</span>
      </div>
      <div className="register-container">
        {/* Left Section */}
        <div className="left-section">
          <img
            src="dashboard-image.jpg"
            alt="Dashboard Preview"
            className="dashboard-img"
          />
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
              <span onClick={() => setPasswordVisible(!passwordVisible)}>
                👁️
              </span>
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    👁️
                  </span>
                </div>
              </>
            )}

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Loading..." : isLogin ? "Login" : "Register"}
            </button>

            {/* Toggle between Login and Signup */}
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
