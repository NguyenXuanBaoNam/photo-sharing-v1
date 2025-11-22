import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        const data = await fetchModel(`${API_BASE_URL}/user/${userId}`);
        setUser(data);
      } catch (error) {
        console.error("Lỗi khi load user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    if (userId) {
      loadUser();
    }
  }, [userId]);

  if (loading) {
    return <Typography variant="body1">Đang tải...</Typography>;
  }

  if (!user) {
    return <Typography variant="body1">Không tìm thấy người dùng.</Typography>;
  }

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1">Location: {user.location}</Typography>
      <Typography variant="body1">Occupation: {user.occupation}</Typography>
      <Typography variant="body1" paragraph>
        Description: {user.description}
      </Typography>
      <Button variant="contained" component={Link} to={`/photos/${user._id}`}>
        Xem ảnh của {user.first_name}
      </Button>
    </Box>
  );
}

export default UserDetail;
