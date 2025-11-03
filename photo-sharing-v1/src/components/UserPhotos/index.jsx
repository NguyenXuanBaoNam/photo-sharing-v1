import React from "react";
import { Box, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

function formatDate(dateString) {
  try {
    const d = new Date(dateString);
    return d.toLocaleString();
  } catch (_) {
    return dateString;
  }
}

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);

  if (!photos || photos.length === 0) {
    return <Typography variant="body1">Không có ảnh cho người dùng này.</Typography>;
  }

  return (
    <Box p={2}>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 3 }}>
          {/** Ảnh */}
          <CardMedia
            component="img"
            alt={photo.file_name}
            image={require("../../images/" + photo.file_name)}
          />
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              Chụp lúc: {formatDate(photo.date_time)}
            </Typography>
            <Divider sx={{ my: 1 }} />
            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((c) => (
                <Box key={c._id} mb={2}>
                  <Typography variant="body2" color="text.secondary">
                    Bình luận lúc: {formatDate(c.date_time)}
                  </Typography>
                  <Typography variant="body1">
                    <Link to={`/users/${c.user._id}`}>
                      {c.user.first_name} {c.user.last_name}
                    </Link>
                    : {c.comment}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Chưa có bình luận.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
