import React from "react";
import {useParams } from "react-router-dom";

function Subtopics(){
    
    const params = useParams();
   

    return (
        <p>{params.id}</p>
    );
}
export default Subtopics