import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "./Navigation";

function Controllrole() {
  const [data, setData] = useState([]);

  const fetchUsers = () => {
    axios.get('http://localhost:8080/users/all', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(response => {
      setData(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error("Error fetching users:", error);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/users/userid/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(response => {
      console.log("Deleted:", response.data);
      fetchUsers(); // Refresh data after deletion
    })
    .catch(error => {
      console.error("Error deleting user:", error);
    });
  };

  const handleChangeRole = (id) => {
    // You can toggle or show a dropdown input here to change the role
    // Example stub:
    console.log(`Change role clicked for user ID: ${id}`);
  };

  return (
    <>
    <Navigation/>
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          <p>Username: {item.username}, Role: {item.roles}</p>
          <button onClick={() => handleChangeRole(item.id)}>Change Role</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
    </>
  );
}

export default Controllrole;
