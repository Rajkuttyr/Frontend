import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const username = localStorage.getItem("user");

  useEffect(() => {
    axios.get(`http://localhost:8080/enrollments/mine`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(response => {
      setData(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <Navigation />
      <Outlet />

      <div className="dashboard-content">
        <h1 className="dashboard-heading">Welcome back, {username} 👋</h1>

        <div className="dashboard-cards">
          <div className="dashboardcard">
            <p className="dashboard card-label">Enrolled Courses</p>
            <h2 className="dashboard card-value">{data.length}</h2>
          </div>

          <div className="dashboard card">
            <p className="dashboard card-label">Total Learning Hours</p>
            <h2 className="dashboard card-value">{data.length * 2} hrs</h2>
          </div>
        </div>

        <div className="dashboard-actions">
          <button className="add-course-btn" onClick={() => navigate('/addcourse')}>
            ➕ Add New Course
          </button>
        </div>
        
      </div>
      <div>
        <button onClick={()=>{
          navigate("/controlrole")
        }} >ControllRole</button>
      </div>
    </div>
    
  );
};

export default Dashboard;
