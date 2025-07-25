import React, { useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import Enroll from './Enrollcourses';
import './Mycourses.css'; // <-- Add this line to link the CSS file

const Mycourses = () => {
  const [courses, setCourses] = React.useState([]);
  const [Completed,setCompleted] = React.useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/enrollments/mine", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response) => {
      setCourses(response.data);
      console.log("My courses data:", response.data);
    });
  }, []);
   useEffect(() => {
    axios.get("http://localhost:8080/enrollments/mycompleted", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response) => {
      setCompleted(response.data);
      console.log("My courses data:", response.data);
    });
  }, []);


  return (
    <>
      <Navigation />
      <div className="mycourses-container">
        <h2 className="mycourses-heading">My Enrolled Courses</h2>
        <div className="courses-grid">
          {courses.map((course, index) => (
            <Enroll
              
              image={course.thumbnailUrl}
              title={course.title}
              sub={course.id}
            />
          ))}
        </div>
      </div>
      <div>
        <h2>Completed Course</h2>
         <div className="courses-grid">
          {Completed.map((course, index) => (
            <Enroll
              
              image={course.thumbnailUrl}
              title={course.title}
              sub={course.id}
            />
          ))}
        </div>
      </div>

    </>
  );
};

export default Mycourses;
