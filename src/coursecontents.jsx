import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";

function Contents() {
  const location = useLocation();
  const x = location.state.url;
  return (
    <div>
      <Navigation />
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