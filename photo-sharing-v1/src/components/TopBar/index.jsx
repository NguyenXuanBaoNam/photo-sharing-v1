import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { matchPath, useLocation } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();
  const pathname = location.pathname;

  let rightText = "";
  const userMatch = matchPath({ path: "/users/:userId" }, pathname);
  const photosMatch = matchPath({ path: "/photos/:userId" }, pathname);

  if (userMatch && userMatch.params?.userId) {
    const user = models.userModel(userMatch.params.userId);
    if (user) rightText = `${user.first_name} ${user.last_name}`;
  } else if (photosMatch && photosMatch.params?.userId) {
    const user = models.userModel(photosMatch.params.userId);
    if (user) rightText = `Photos of ${user.first_name} ${user.last_name}`;
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Họ tên: Your Name
        </Typography>
        <Typography variant="h6" color="inherit" style={{ marginLeft: "auto" }}>
          {rightText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
