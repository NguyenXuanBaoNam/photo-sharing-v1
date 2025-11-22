import React, { useState, useEffect } from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchModel(`${API_BASE_URL}/user/list`);
        setUsers(data);
      } catch (error) {
        console.error("Lỗi khi load users:", error);
      }
    }
    loadUsers();
  }, []);

  return (
    <div>
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem button component={Link} to={`/users/${user._id}`} selected={location.pathname === `/users/${user._id}`}>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
