import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import Navigation from './Navigation'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Card from './Card'


const Courses = () => {
  const [coursedata, setCourseData] = useState([]);
 

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
        
          {coursedata.map((course) =>
          <Card title={course.title} image={course.thumbnailUrl} content={course.description} key={course.id} sub={course.id}/>
          )}
              
              {/* Remove setSubtopics from render, it's a side effect */}
              
            
          
          

        
        
        
      
      
    </div>
  )
}

export default Courses
