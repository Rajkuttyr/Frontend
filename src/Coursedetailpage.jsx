import { use } from "react";
import { useLocation } from "react-router";
function CourseDetailPage() {
    const location = useLocation();
    const courseId = location.state.courseId
    useEffect(() => {
        // Fetch course details using courseId
        axios.get(`http://localhost:8080/api/courses/${courseId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                // Handle the response data
                console.log("Course details:", response.data);
            })
            .catch(error => {
                console.error("Error fetching course details:", error);
            });
    }, [courseId]);
  return (
    <div className="course-detail-page">
      <h1>Course Detail Page</h1>
      <p>Course ID: {courseId}</p>
      {/* Add course details here */}
    </div>
  );
}
export default CourseDetailPage;