import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Grid,
  AppBar,
  Typography,
  Container
} from "@mui/material";
import UserContext from "../../context/UserContext";
import UserAccountMenu from "./UserAccountMenu";
import SearchBar from "../search/SearchBar";
import styled from "@emotion/styled";

const StyledGrid = styled(Grid)(() => ({
  gridTemplateRows: 'auto',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  fontSize: '1.2rem',
}));

const Brand = styled(Typography)(({ theme }) => ({
  marginLeft: '2rem',
  fontSize: '1.7rem',
  color: theme.palette.primary.contrastText
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.primary.muted,
  marginRight: '2rem',
  '&:hover': {
    color: theme.palette.primary.contrastText
  }
}));

export default function Navbar() {
  const { currentUser } = useContext(UserContext)

  const AnonUserLinks = () => (
    <>
      <StyledNavLink to="/login">
        Login
      </StyledNavLink>
      <StyledNavLink to="/signup">
        Sign Up
      </StyledNavLink>
    </>
  );

  return (
    <AppBar position="fixed">
      <Container
        sx={{
          height: '4rem'
        }}
        maxWidth="xl"
      >
        <StyledGrid container>
          <Link to="/">
            <Brand>
              Game Night
            </Brand>
          </Link>

          <SearchBar />

          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              height="100%"
            >
              {
                currentUser
                  ? <UserAccountMenu />
                  : <AnonUserLinks />
              }
            </Grid>
          </Grid>
        </StyledGrid>
      </Container>
    </AppBar>
  );
};