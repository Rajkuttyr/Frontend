import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Subtopics from "./subtopics";
function CourseDetailPage() {
  const location = useLocation();
  const courseId = location.state.courseId;
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [syllabus, setSyllabus] = useState([]);
  const [Mycourses, setMycourses] = useState([]);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/courses/courseid/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log("Course details:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
      });
  }, [courseId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/subtopics/courseid/${courseId}/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setSyllabus(response.data);
        console.log("Syllabus data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching the syllabus:", error);
      });
  }, [courseId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/enrollments/mine`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setMycourses(response.data);
        console.log("My courses:", response.data);
      })
      .catch((error) => {
        console.log(`Error fetching the data: ${error}`);
      });
  }, [courseId]);

  useEffect(() => {
    for (const element of Mycourses) {
      if (element.id == courseId) {
        
        setEnrolled(true);
        break;
      }
    }
  }, [Mycourses, courseId]);
  const handleEnroll = () => {
  axios
    .post(
      "http://localhost:8080/enrollments/add",
      {
        courseId: courseId,
        enrollmentDate: new Date().toISOString(), // or Date.now()
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      console.log("Enrollment successful:", response.data);
      setEnrolled(true); // update button to "View"
    })
    .catch((error) => {
      console.error("Error enrolling:", error);
    });
};
const handleView =()=>{
  navigate("/subtopics",{
    state:{
      subtopic:courseId,
    }
  }

  )
  
}


  return (
    <div className="course-detail-page">
      <h1>Course Detail Page</h1>
      <h2>Course Name: {data.title}</h2>
      <img src={data.thumbnailUrl} alt={data.title} />
      <p>
        <strong>Description:</strong> {data.description}
      </p>
      <p>
        <strong>Instructor Name:</strong> {data.instructor}
      </p>
      <p>
        <strong>No of Enrollments:</strong> {data.noOfEnrolledStudents}
      </p>

      <h3>Syllabus:</h3>
      <ol type="1">
        {syllabus.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ol>

      
      {enrolled ? (
        <button onClick={handleView}>View</button>
      ) : (
        <button onClick={
          handleEnroll
         
        }>Enroll</button>
      )}
    </div>
  );
}

export default CourseDetailPage;
