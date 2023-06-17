import React, { useContext, useEffect } from "react";
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
  const { refinedResults } = useContext(DataContext);

  useEffect(() => {
    console.log(refinedResults)
  }, [])  

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
                      <GameCard game={r} />
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