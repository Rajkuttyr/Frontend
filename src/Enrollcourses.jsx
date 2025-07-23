
import './Enroll.css'; // Link the CSS file
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Enroll(props) {
     const [subtopic, setSubtopic] = useState("");
    const navigate =useNavigate();
  return (
    <div className="course-card">
      <img src={props.image} alt={props.title} className="course-image" />
      <h2 className="course-title">{props.title}</h2>
      <button className="view-button"
      onClick={()=>{
         setSubtopic(props.sub);
        navigate('/subtopics', { state: { subtopic: props.sub } });
      }}>View</button>
    </div>
  );
}

export default Enroll;
