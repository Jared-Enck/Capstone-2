import React from "react";
import {
  Container
} from "@mui/material";
import styled from "@emotion/styled";

const StyledContainer = styled(Container)(({ theme }) => ({
  margin: 0,
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  padding: "1.5rem",
  justifyContent: "center",
  alignSelf: "center"
}));

export default function ContentContainer({ children }) {
  return (
    <StyledContainer
      maxWidth={"lg"}
    >
      {children}
    </StyledContainer>
  );
};