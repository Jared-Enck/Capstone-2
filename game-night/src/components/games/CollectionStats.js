import React from "react";
import {
  Stack,
  Typography
} from "@mui/material";

export default function CollectionStats({ size, value }) {
  return (
    <Stack spacing={1} sx={{ padding: 2 }}>
      <Typography variant="h5" color={"primary.contrastText"}>
        Collection
      </Typography>
      <Typography color={"primary.text"}>
        Total Games: {size}
      </Typography>
      <Typography color={"primary.text"}>
        Estimated Value: {`$${value.toLocaleString('en-Us')}`}
      </Typography>
    </Stack>
  );
};