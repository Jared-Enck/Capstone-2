import React from "react";
import { Typography } from "@mui/material";

export default function ErrorMessage() {
  return (
    <Typography variant="h5" sx={{ color: "primary.text" }}>
      Oops something went wrong...
    </Typography>
  );
};