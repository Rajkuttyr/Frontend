import {Link, NavLink, Route, useNavigate} from "react-router-dom";
import Dashboard from "./Dashboard";
import { useState } from "react";
import axios from "axios";




function Loginpages() {
  const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data,setData] = useState([]);

  const checkLogin = () => {
  if (username === "admin" && password === "admin") {
    setIsLoggedIn(true);
    navigate("/dashboard");
    return;
  }

  axios
    .get(`http://localhost:8080/api/users/search?username=${username}`)
    .then((response) => {
      const users = response.data;
      setData(users);
      if (Array.isArray(users) && users.length > 0 && users[0].password === password) {
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        setIsLoggedIn(false);
        alert("Invalid username or password");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Login failed. Please try again.");
    });
};
    
   





  return (
    <>
 
    <p>Username:</p>
      <input type="text" placeholder="Enter your username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
      
      <br/>
      <p>Password:</p>
      <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      
      <br/>
      <button onClick={checkLogin}>login</button>
      </>
  );
}
export default Loginpages