import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import Navigation from './Navigation'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Courses = () => {
  const [coursedata,setCourseData]=useState([]);
  const [subtopic, setSubtopic] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get("http://localhost:8080/api/courses/all")
    .then((response)=>{
    const courses = response.data;
    setCourseData(courses);



    }
  )

  },[])
  return (
    <div>
        <Navigation/>
        <ul>
          {coursedata.map((course) =>
            <li key={course.id}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <button onClick={() => {
                axios.delete(`http://localhost:8080/api/courses/delete/${course.id}`)
                  .then(() => {
                    setCourseData(prev => prev.filter(c => c.id !== course.id));
                  });
              }}>
                Delete
              </button>
              {/* Remove setSubtopics from render, it's a side effect */}
              <button onClick={() => {setSubtopic(course.subtopics);
                navigate('/subtopics',{state:{subtopic: course.subtopics}}); 
              }}>
               Enroll</button>
            </li>
          )}
          

        </ul>
        
        
      
      
    </div>
  )
}

export default Courses
