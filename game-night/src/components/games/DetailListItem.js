import React from "react";
import {
  Typography,
  Grid
} from "@mui/material";

export default function DetailListItem({ name, lastItem }) {
  return (
    <Grid item>
      <Typography
        sx={{
          color: "primary.text"
        }}
      >
        {
          lastItem
            ? name
            : name + ","
        }
      </Typography>
    </Grid>
  );
};