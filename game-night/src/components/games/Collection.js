import React, { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import {
  Grid,
  Typography,
  Stack,
  Divider
} from "@mui/material";
import ContentContainer from "../common/ContentContainer";
import GameCard from "../games/GameCard";

export default function Collection() {
  const { games, getCollection, userGames } = useContext(UserContext);

  useEffect(() => {
    getCollection();
  },[userGames]);
  
  const noGamesMsg = (
    <Typography sx={{color: "primary.text"}} variant="h5">
      No games yet? Try searching for games and then adding them to your collection.
    </Typography>
  )

  return (
    <Stack>
      <ContentContainer>
        <Typography sx={{color: "primary.contrastText"}} variant="h5">
          My Games
        </Typography>
        <Divider sx={{ marginBottom: "1.5rem"}} />
        <Grid 
          container
          direction={"row"}
          spacing={3}
          paddingLeft={"2rem"}
        >
          {
            games
            ? games.map(g => (
                <Grid key={g.id} item>
                  <GameCard game={g} collectionPage />
                </Grid>
            ))
            : noGamesMsg
          }
        </Grid>
      </ContentContainer>
    </Stack>
  );
};