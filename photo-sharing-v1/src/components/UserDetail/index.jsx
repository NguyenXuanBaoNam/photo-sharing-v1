import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

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
