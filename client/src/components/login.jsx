import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = isLogin
  ? "http://localhost:5000/api/auth/login"
  : "http://localhost:5000/api/auth/register";

    const payload = isLogin ? { email, password } : { fullName, email, password, confirmPassword };

    try {
      const response = await axios.post(apiUrl, payload);
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log("Success:", response.data);
        localStorage.setItem("idToken",response.data.token)
        navigate('/dashboard')
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="left-section">
        <img src="dashboard-image.jpg" alt="Dashboard Preview" className="dashboard-img" />
        <h2>Welcome to Dashboard</h2>
        <p>Manage your HR operations efficiently with our dashboard.</p>
      </div>

      <div className="right-section">
        <h2>{isLogin ? "Login to Dashboard" : "Sign Up for Dashboard"}</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Full Name*</label>
              <input type="text" placeholder="Full name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </>
          )}

          <label>Email Address*</label>
          <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password*</label>
          <div className="password-input">
            <input type={passwordVisible ? "text" : "password"} placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <span onClick={() => setPasswordVisible(!passwordVisible)}>👁️</span>
          </div>

          {!isLogin && (
            <>
              <label>Confirm Password*</label>
              <div className="password-input">
                <input type={confirmPasswordVisible ? "text" : "password"} placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <span onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>👁️</span>
              </div>
            </>
          )}

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Loading..." : isLogin ? "Login" : "Register"}
          </button>

          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button type="button" className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};
