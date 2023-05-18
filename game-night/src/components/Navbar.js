import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { 
  Grid,
  Typography
} from "@mui/material";
import UserContext from "../context/UserContext"
import LoggedInLinks from "./LoggedInLinks";
import AnonUserLinks from "./AnonUserLinks";
import { StyledGrid, StyledContainer } from "./styled";
import theme from "../theme";

export default function Navbar() {
  const {currentUser} = useContext(UserContext)

  return (
    <StyledContainer maxWidth="xl">
      <StyledGrid container>
        <Grid alignItems="center" item xs={2}>
          <Typography variant="h5">
            <Link to="/">
              Game Night
            </Link>
          </Typography>
        </Grid>
        <Grid height="100%" item xs={4}>
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