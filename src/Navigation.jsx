import React from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div className="navigation">
      <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
      <NavLink className="nav-link" to="/courses">Courses</NavLink>
      <NavLink className="nav-link" to="/mycourses">My Courses</NavLink>
      <button className="nav-link" onClick={() => {
        navigate('/');
        localStorage.removeItem("token");}}
      >Logout</button>
    </div>
  )
}

export default Navigation
