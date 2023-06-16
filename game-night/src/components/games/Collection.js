import React, { useCallback, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { Container, Grid, Typography } from "@mui/material";
import GameNightApi from "../../gameNightApi";

export default function Collection() {
  const {currentUser, userGames, setUserGames} = useContext(UserContext);
  const games = Array.from(userGames) || [];

  // const getGames = useCallback(async () => {
  //   const res = await GameNightApi.getGames(currentUser.username);
  //   console.log(res)
  //   setUserGames(res);
  // });

  // useEffect(() => {
  //   getGames();
  // },[getGames]);
  
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
          games.length
           ? games.map(g => {
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