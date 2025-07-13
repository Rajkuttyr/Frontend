import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

function Subtopics(props){

    
    const location = useLocation();
    console.log(location)
    const subtopics= location.state.subtopic;
    console.log(subtopics);
    const x=subtopics.map((item) => item.title);
    const y=subtopics.map((item)=>item.videoUrl);
    console.log(x);
    console.log(y);
    const navigate=useNavigate();
    
   

    return (
        <>
        <ul>
           {x.map((item, index) => (
            <li key={index}>
                <button onClick={() => {
                    
                    navigate('/coursecontents', { state: { url: y[index] } });
                }}>
                    {item}
                </button>
                
            </li>
           ))}
        



        </ul>
        </>
    );
}
export default Subtopics