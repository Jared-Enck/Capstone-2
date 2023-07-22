import React from "react";
import { Skeleton } from "@mui/material";

export default function BaseSkeleton({
  variant = "rounded",
  width = "100%",
  height = "2rem"
}) {
  return (
    <Skeleton
      variant={variant}
      sx={{
        bgcolor: "primary.light",
        width: width,
        height: height
      }}
    />
  );
};