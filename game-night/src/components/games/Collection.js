import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Container, Grid, Typography } from "@mui/material";

export default function Collection() {
  const {currentUser} = useContext(UserContext);

  const noGamesMsg = (
    <Typography variant="h5">
      No games yet? Try searching for games and then adding them to your collection.
    </Typography>
  )

  return (
    <Container maxWidth="xl">
      <Grid 
        container
        justifyContent="center"
      >
        {
          currentUser.games
           ? currentUser.games.map(g => {
            <Grid key={g.id} item>
              <span>
                {g.id}
              </span>
            </Grid>
           })
           : noGamesMsg
        }
      </Grid>
    </Container>
  );
};