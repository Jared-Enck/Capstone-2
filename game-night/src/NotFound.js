import React, { useEffect, useContext } from "react";
import { Typography, Stack } from "@mui/material";
import ContentContainer from "./components/common/ContentContainer";
import DataContext from "./context/DataContext";

export default function NotFound() {
  const { setIsLoading } = useContext(DataContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

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