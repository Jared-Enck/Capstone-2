import React, { useCallback, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import {
  Grid,
  Typography,
  Stack
} from "@mui/material";
import ContentContainer from "../common/ContentContainer";
import GameNightApi from "../../gameNightApi";

export default function Collection() {
  const {currentUser, userGames} = useContext(UserContext);
  const games = Array.from(userGames);
  // const getGames = useCallback(async () => {
  //   const res = await GameNightApi.getGames(currentUser.username);
  //   console.log(res)
  //   setUserGames(res);
  // },[getGames]);

  // useEffect(() => {
  //   getGames();
  // },[getGames]);
  
  const noGamesMsg = (
    <Typography sx={{color: "primary.text"}} variant="h5">
      No games yet? Try searching for games and then adding them to your collection.
    </Typography>
  )

  return (
    <Stack>
      <ContentContainer>
        <Grid 
          container
          direction={"row"}
          spacing={2}
        >
          {
            games.length
            ? games.map(g => (
                <Grid key={g} item>
                  <Typography sx={{color: "primary.text"}}>
                    {g}
                  </Typography>
                </Grid>
            ))
            : noGamesMsg
          }
        </Grid>
      </ContentContainer>
    </Stack>
  );
};