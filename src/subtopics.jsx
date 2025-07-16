import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigation";
import './subtopics.css';

function Subtopics(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const subtopics = location.state.subtopic;
    const [topics, setTopics] = useState([]);
    const [url, setUrl] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/subtopics/courseid/${subtopics}/all`)
            .then((response) => {
                setTopics(response.data);
            })
            .catch((error) => {
                console.error("Error fetching subtopics:", error);
            });
    }, [subtopics]);

    return (
        <div className="subtopics-container">
            <Navigation />
            <div className="subtopics-flex">
                <iframe
                    src={url}
                    className="video-frame"
                    title="Video Player"
                    allowFullScreen
                ></iframe>
                <div className="subtopics-sidebar">
                    <div className="subtopics-list">
                        {topics.map((item) => (
                            <button
                                className="subtopic-btn"
                                key={item.id || item.title}
                                onClick={() => {
                                    setUrl(item.videoUrl);
                                }}
                            >
                                <span className="topic-title">{item.title}</span>
                            </button>
                        ))}
                    </div>
                    <button
                        className="quizz-btn"
                        onClick={() => {
                            navigate('/quizz', { state: { id: subtopics } });
                        }}
                    >
                        Quizz
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Subtopics;