import { useLocation } from "react-router-dom";

function Contents() {
  const location = useLocation();
  const x = location.state.url;
  return (
    <div>
      <iframe
        src={x}
        title="Course Content"
        width="500px"
        height="500px"
        
      ></iframe>
    </div>
  );
}
export default Contents;