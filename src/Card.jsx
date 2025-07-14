import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Card(props){
    const [coursedata,setCourseData]=useState([]);
    const [subtopic, setSubtopic] = useState("");
    const navigate =useNavigate();
    return (
        <div className="card">
        <img src={props.image} alt={props.title} />
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <button onClick={() => {
            
                axios.delete(`http://localhost:8080/api/courses/delete/${props.sub}`)
                  .then(() => {
                    setCourseData(prev => prev.filter(c => c.id !== course.id));
                  });
              }}>
                Delete
              </button>
              <button onClick={() => {setSubtopic(props.sub);
                navigate('/subtopics',{state:{subtopic: props.sub}}); 
              }}>
               Enroll</button>

        </div>
    );
}
export default Card;