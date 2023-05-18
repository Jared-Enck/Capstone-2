import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { 
  Grid,
  Typography
} from "@mui/material";
import UserContext from "../context/UserContext"
import LoggedInLinks from "./LoggedInLinks";
import AnonUserLinks from "./AnonUserLinks";
import { 
  StyledGrid, 
  StyledContainer,
  Brand
} from "./styled";
import SearchForm from "./SearchForm";

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

        <SearchForm />

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