import React from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import GameCard from "./GameCard";

export default function Collection({ inSync, collection }) {
  const noGamesMsg = (
    <Typography sx={{ color: "primary.text" }} variant="h5">
      No games yet? Try searching for games and then adding them to your collection.
    </Typography>
  )

  return (
    <Grid
      container
      direction={"row"}
      spacing={3}
      padding={"1.5rem"}
    >
      {
        inSync
          ? (
            collection.length
              ? collection.map(g => (
                <Grid key={g.id} item>
                  <GameCard game={g} ProfilePage />
                </Grid>
              ))
              : noGamesMsg
          )
          : null
      }
    </Grid>
  );
};