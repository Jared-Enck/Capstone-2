import React, { useContext } from "react";
import { Container, Typography, Divider } from "@mui/material";
import styled from "@emotion/styled";
import UserContext from "../../context/UserContext";
import CircularLoading from "../common/CircularLoading";

const StyledContainer = styled(Container)(({ theme }) => ({
  margin: 0,
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  padding: "1.5rem",
  alignSelf: "center"
}));

export default function ContentContainer({ header = null, divider, children }) {
  const { isLoading } = useContext(UserContext);
  return (
    <StyledContainer
      maxWidth={"lg"}
    >
      {
        header
          ? (
            <Typography
              variant={"h5"}
              sx={{
                color: "primary.contrastText"
              }}
              gutterBottom
            >
              {header}
            </Typography>
          )
          : null
      }
      {
        divider
          ? <Divider />
          : null
      }
      {
        isLoading
          ? <CircularLoading size={"2rem"} />
          : children
      }
    </StyledContainer>
  );
};