import React from 'react'
import Navigation from './Navigation'
import { useEffect } from 'react';
import axios from 'axios';
import Enroll from './Enrollcourses';
const Mycourses = () => {
  useEffect(() => {
    axios.get("http://localhost:8080/enrollments/mine", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`  }
  })
      .then((response) => {
        console.log("My courses data:", response.data);});},[])
  return (
    <>
    <Navigation/>
    <div>
        <h1>This is Mycourses page</h1>
        <p>Here you can see your enrolled courses.</p>
        <p>More features coming soon!</p>
        <p>Stay tuned!</p>
        <p>Thank you for using our app!</p>
        <p>We hope you enjoy your learning experience!</p>
        <p>If you have any feedback, please let us know!</p> 
        
                       
      
    </div>
    </>
  )
}

export default Mycourses
