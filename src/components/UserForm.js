import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./UserForm.module.css";

const UserForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    company: { name: "" },
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(response.data);
    } catch (err) {
      alert("Failed to fetch user.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
        alert("User updated successfully.");
      } else {
        await axios.post("https://jsonplaceholder.typicode.com/users", user);
        alert("User added successfully.");
      }
      navigate("/");
    } catch (err) {
      alert("Failed to save user.");
    }
  };

  useEffect(() => {
    if (id) fetchUser(id);
  }, [id]);

  return (
    <div className={styles.container}>
      <h1>{id ? "Edit User" : "Add User"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </label>
        <label>
          Department:
          <input
            type="text"
            value={user.company.name}
            onChange={(e) =>
              setUser({ ...user, company: { ...user.company, name: e.target.value } })
            }
            required
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" className="cancel" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserForm;
