import React, {
  useContext,
  useEffect
} from "react";
import DataContext from "../../context/DataContext";
import {
  Grid,
  Typography,
  Stack
} from "@mui/material";
import ContentContainer from "../common/ContentContainer";
import GameCard from "../games/GameCard";

export default function Collection() {
  const { userGameIDs, collection, getCollection } = useContext(DataContext);
  const inSync = userGameIDs.size === collection.length;

  useEffect(() => {
    try {
      if (!inSync) {
        getCollection();
      };
    } catch (err) {
      console.error('Error: ', err)
    };
  }, [getCollection, inSync]);

  const noGamesMsg = (
    <Typography sx={{ color: "primary.text" }} variant="h5">
      No games yet? Try searching for games and then adding them to your collection.
    </Typography>
  )

  return (
    <Stack>
      <ContentContainer header={"My Games"} divider>
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
                      <GameCard game={g} collectionPage />
                    </Grid>
                  ))
                  : noGamesMsg
              )
              : null
          }
        </Grid>
      </ContentContainer>
    </Stack>
  );
};