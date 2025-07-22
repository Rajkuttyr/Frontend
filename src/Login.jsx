import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";

function Loginpages() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({});

  const checkLogin = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:8080/auth/login",{
        username: username,
        password: password,
      });
      const {token}=response.data;
      console.log("Login successful:", token);
      setData(response.data);
      localStorage.setItem("token", token);
      navigate("/dashboard");
      setIsLoggedIn(true);
    }catch(err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <p className="login-label">Username:</p>
      <input
        className="login-input"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <p className="login-label">Password:</p>
      <input
        className="login-input"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className="login-btn" onClick={checkLogin}>
        Login
      </button>
      <br />
      <button
        className="signup-btn"
        onClick={() => navigate("/signup")}
        style={{ marginTop: "1rem" }}
      >
        Sign Up
      </button>
    </div>
  );
}
export default Loginpages;