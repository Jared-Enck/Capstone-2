import React from "react";
import {
  ListItem,
  Typography
} from "@mui/material";

export default function DetailListItem({items}) {
  return (
    <ListItem alignItems="flex-start">
      <Typography
        sx={{
          fontWeight: "bold",
          color: "primary.light"
        }}
      >
        Year Published
      </Typography>
      <Typography
        sx={{
          color: "primary.light"
        }}
      >
        {game.year_published}
      </Typography>
    </ListItem>
  );
};