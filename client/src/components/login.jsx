import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./LoginPage.css"; // Import the CSS file for styling

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For Signup only
  const [fullName, setFullName] = useState(""); // For Signup only
  const [loading, setLoading] = useState(false); // Loading state for button

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const apiUrl = isLogin ? "/api/auth/login" : "/api/auth/register"; // Set the URL based on login or signup
    const payload = isLogin
      ? { email, password }
      : { fullName, email, password, confirm_password: confirmPassword }; // Adjust payload for Signup

    axios
      .post(apiUrl, payload)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
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
    <div className="container">
      <div className="logo">LOGO</div>
      <div className="content">
        <div className="left-section">
          <img src="dashboard-image.jpg" alt="Dashboard Preview" className="dashboard-img" />
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="right-section">
          <h2>Welcome to Dashboard</h2>
          <form className="form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Full Name*</label>
                <input
                  type="text"
                  placeholder="Full name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}
            <div className="form-group">
              <label>Email Address*</label>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
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
            </div>
            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password*</label>
                <div className="password-input">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>👁️</span>
                </div>
              </div>
            )}
            {isLogin && (
              <button type="button" className="forgot-password-btn">
                Forgot password?
              </button>
            )}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Loading..." : isLogin ? "Login" : "Register"}
            </button>
            <p className="toggle-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button type="button" className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
