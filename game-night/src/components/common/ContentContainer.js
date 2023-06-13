import React from "react";
import {
  Box,
  Container
} from "@mui/material";
import styled from "@emotion/styled";

const ContentBox = styled(Box)(({ theme }) => ({
  margin: 0,
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  padding: "1.5rem"
}));

export default function ContentContainer({ children }) {
  return (
    <ContentBox>
      <Container maxWidth={"lg"}>
        { children }
      </Container>
    </ContentBox>
  );
};