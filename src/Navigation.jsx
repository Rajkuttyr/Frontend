import React from 'react'
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
      <NavLink className="nav-link" to="/courses">Courses</NavLink>
      <NavLink className="nav-link" to="/mycourses">My Courses</NavLink>
      <NavLink className="nav-link" to="/">Logout</NavLink>
    </div>
  )
}

export default Navigation
