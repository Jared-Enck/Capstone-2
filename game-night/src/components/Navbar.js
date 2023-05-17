import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Container, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../theme";

const StyledNavLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;

  :hover {
    color: green;
  }
`;

export default function Navbar() {
  return (
    <Container maxWidth="xl">
      <Typography color="inherit">
        <Link to="/">
          Game Night
        </Link>
      </Typography>
      <Grid display={"flex"} spacing={3}>
        <StyledNavLink to="/login">
          Login
        </StyledNavLink>
        <StyledNavLink to="/signup">
          Sign Up
        </StyledNavLink>
      </Grid>
    </Container>
  );
};