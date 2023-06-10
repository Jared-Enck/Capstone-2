import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { 
  Grid,
  Typography,
  Container
} from "@mui/material";
import UserContext from "../../context/UserContext"
import LoggedInLinks from "./LoggedInLinks";
import AnonUserLinks from "./AnonUserLinks";
import SearchBar from "../search/SearchBar";
import styled from "@emotion/styled";

const StyledGrid = styled(Grid)(() => ({
  gridTemplateRows: 'auto',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  fontSize: '1.2rem',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: '4rem'
}));

const Brand = styled(Typography)(({ theme }) => ({
  marginLeft: '2rem',
  fontSize: '1.7rem',
  color: theme.palette.primary.contrastText
}));

export default function Navbar() {
  const {currentUser} = useContext(UserContext)

  return (
    <StyledContainer maxWidth="xl">
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
                ? <LoggedInLinks />
                : <AnonUserLinks />
            }
          </Grid>
        </Grid>
      </StyledGrid>
    </StyledContainer>
  );
};