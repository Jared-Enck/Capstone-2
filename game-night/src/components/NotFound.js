import React from "react";
import { Typography, Stack } from "@mui/material";
import ContentContainer from "./common/ContentContainer";

export default function NotFound() {
  return (
    <Stack>
      <ContentContainer>
        <Typography variant="h5" sx={{ color: "primary.text", textAlign: "center" }}>
          404 Sorry, can't find what you're looking for.
        </Typography>
      </ContentContainer>
    </Stack>
  )
};