import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import {
  Box,
  Stack,
  Grid,
  Typography,
  Divider
} from "@mui/material";
import ContentContainer from "../common/ContentContainer";
import GameCard from "../games/GameCard";

export default function SearchResultsPage() {
  const { refinedResults, setGameID, setGame } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(refinedResults)
  }, [])

  const handleCardClick = (gameID, game) => {
    setGameID(gameID);
    setGame(game);
    navigate(`/games/${gameID}`)
  };

  return (
    <Stack>
      <ContentContainer>
        <Typography sx={{color: "primary.contrastText"}} variant="h5">
          Search Results
        </Typography>
        <Divider sx={{ marginBottom: "1.5rem"}} />
        <Box sx={{width: "100%", justifyContent: "center"}}>
          <Grid
            container
            spacing={3}
            paddingLeft={"2rem"}
            direction={"row"}
          >
            {
              refinedResults
                ? (
                  refinedResults.map(r =>
                  (
                    <Grid item alignitems="flex-start" key={r.id}>
                      <GameCard game={r} handleCardClick={handleCardClick} />
                    </Grid>
                  )
                  )
                )
                : null
            }
          </Grid>
        </Box>
      </ContentContainer>
    </Stack>
  );
};