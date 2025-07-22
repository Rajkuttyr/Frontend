import { useState,useEffect, use } from "react";
import { useLocation, useNavigate } from "react-router-dom";    

import axios from "axios";
import Navigation from "./Navigation";

function Quizz(){
    const navigate = useNavigate();
    const x= useLocation();
    const courseid = x.state.id;
    const [data, setData] = useState([]);
    const ca =[];
    const [passed, setPassed] = useState(false);
    useEffect(() => {
        axios.get(`http://localhost:8080/quizzes/courseid/${courseid}/questions/all`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response) => {
            setData(response.data);
        })
    },[courseid]);
    console.log(data);
    return <div className="quizz">
        <Navigation />

        <h1>Quizz</h1>
        <p>Welcome to the Quizz section. Here you can test your knowledge on various topics.</p>
        <ol>
            {data.map((item) => (
                <li key={item.id}>
                    <p>{item.questionText}</p>
                    <ol type="a">
                        {item.options.map((option, index) => (
                            <li key={index}>
                                <input
                                    type="radio"
                                    name={`question-${item.id}`}
                                    value={option}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        if(e.target.value ===item.correctAnswer){
                                            ca.push(item.id);
                                            
                                        }
                                        else{
                                            ca.pop(item.id);
                                        }
                                        
                                        
                                    }}
                                />
                                {option}
                            </li>
                        ))}
                        
                        </ol>
                    
                   
                    
                </li>
            ))}
           
            
        
            </ol>
             <button onClick={() => {
                if (ca.length === data.length) {
                    alert("Congratulations! You have passed the quiz.");
                    setPassed(true);
                    navigate('/courses',{state: { courseId: courseid } });
                } else {
                    alert("You have not passed the quiz. Please try again.");
                    setPassed(false);
                }
            }}>Submit</button>
       
    </div>;
}
export default Quizz;