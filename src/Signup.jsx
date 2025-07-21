import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    domain: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/users/auth/signup/post", {
        username: form.username,
        email: form.email,
        password: form.password,
        domain: form.domain
      });
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (error) {
      alert("Signup failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <p className="signup-label">Username:</p>
        <input
          className="signup-input"
          type="text"
          name="username"
          placeholder="Enter username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <p className="signup-label">Email:</p>
        <input
          className="signup-input"
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <p className="signup-label">Password:</p>
        <input
          className="signup-input"
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <p className="signup-label">Confirm Password:</p>
        <input
          className="signup-input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <p className="signup-label">Domain:</p>
        <input
          className="signup-input"
          type="text"
          name="domain"
          placeholder="Enter domain"
          value={form.domain}
          onChange={handleChange}
        />
        <button className="signup-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
}
export default Signup;