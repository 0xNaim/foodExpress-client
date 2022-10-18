import { Button, Typography } from "@mui/material";
import React from "react";

const FooterButton = () => {
  return (
    <div>
      <Typography
        variant="body1"
        sx={{ color: "#f1f1f1", marginBottom: "1rem", marginTop: ".5rem" }}
      >
        Ready to get started?
      </Typography>
      <Button variant="contained" color="success">
        Get Started
      </Button>
    </div>
  );
};

export default FooterButton;
