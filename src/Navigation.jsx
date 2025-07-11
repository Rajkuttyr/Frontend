import React from 'react'
import { NavLink } from 'react-router-dom';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Courses from './Courses';
import Mycourses from './Mycourses'; // Assuming you have a Mycourses component 

const Navigation = () => {
    const router=createBrowserRouter(
        createRoutesFromElements(
            <Route path="dashboard" element={<Dashboard />}>
                <Route path="courses" element={<Courses />} />
                <Route path="mycourses" element={<Mycourses />} />
                
            </Route>
        )
    );
  return (
    <div>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/mycourses">My Courses</NavLink>
        <NavLink to="/">Logout</NavLink>
     
      
    </div>
  )
}

export default Navigation
