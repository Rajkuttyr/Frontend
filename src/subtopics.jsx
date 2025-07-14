import React, { useEffect,useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigation";

function Subtopics(props){
    const navigate = useNavigate();

    
    const location = useLocation();
    console.log(location)
    const subtopics= location.state.subtopic;
    console.log(subtopics);
    const [topics,setTopics]=useState([]);
    useEffect(() => {
      axios.get(`http://localhost:8080/api/courses/${subtopics}/subtopics`)
        .then((response) => {
          setTopics(response.data);
        })
        .catch((error) => {
          console.error("Error fetching subtopics:", error);
        });
    }, [subtopics]) // Add subtopics here
    
   
    
    
    
    
    
   

    return (
        <>
        <Navigation/>
        {
            topics.map((item) => {
                return <button key={item.id || item.title}onClick={()=>{
                navigate('/coursecontents',{state:{url: item.videoUrl}})

                }}>{item.title}</button>;
            })
        }
      
        
     
    
        </>
    );
}
export default Subtopics