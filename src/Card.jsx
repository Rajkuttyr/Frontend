import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Card(props){
    const [coursedata,setCourseData]=useState([]);
    const [subtopic, setSubtopic] = useState("");
    const navigate =useNavigate();


   
    return (
        <div className="card">
        <img className="card-image" src={props.image} alt={props.title} />
        <h2 className="card-title">{props.title}</h2>
        <p className="card-content">{props.content}</p>
        <button
          className="card-delete-btn"
          onClick={() => {
            axios.delete(`http://localhost:8080/api/courses${props.sub}/delete/`)
              .then(() => {
                setCourseData(prev => prev.filter(c => c.id !== course.id));
              });
          }}
        >
          Delete
        </button>
        <button
          className="card-enroll-btn"
          onClick={() => {
            axios.post(`http://localhost:8080/enrollments/add`, {
              courseId: props.sub,
              enrollmentDate: new Date().toISOString(),},{
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            })
            setSubtopic(props.sub);
            navigate('/coursedetail', { state: { courseId: props.sub } });
            
          }}
        >
          Enroll
        </button>
        </div>
    );
}
export default Card;