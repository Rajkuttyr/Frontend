import React from 'react'
import { createBrowserRouter, createRoutesFromElements, NavLink, Outlet, Route } from 'react-router'
import { Routes } from 'react-router-dom';
import Courses from './Courses';
import Mycourses from './Mycourses' // Assuming you have a Courses component
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const Dashboard = () => {
  const navigate = useNavigate();
    
   
  return (
    <div>
        <Navigation/>
        <Outlet/>
     
      <h1>This is Dashboard page</h1>
      <button onClick={() => {
        navigate('/addcourse');
      }}>Addcourse</button>
        

      
        
        
        
      
    </div>
  )
}

export default Dashboard
