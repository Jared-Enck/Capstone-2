import React, { useContext } from "react";
import DataContext from "../../context/DataContext";
import {
  Box,
  Stack,
  Grid
} from "@mui/material";
import ContentContainer from "../common/ContentContainer";
import GameCard from "../games/GameCard";

export default function SearchResultsPage() {
  const { refinedResults } = useContext(DataContext);

  return (
    <Stack>
      <ContentContainer header={"Search Results"} divider>
        <Box sx={{ justifyContent: "center" }}>
          <Grid
            container
            spacing={3}
            padding={"1.5rem"}
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