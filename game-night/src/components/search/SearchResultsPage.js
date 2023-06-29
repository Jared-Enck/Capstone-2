import React, { useCallback, useContext, useState, useEffect } from "react";
import DataContext from "../../context/DataContext";
import {
  Box,
  Stack,
  Grid
} from "@mui/material";
import ContentContainer from "../common/ContentContainer";
import GameCard from "../games/GameCard";
import ResultsPagination from "../common/ResultsPagination";

export default function SearchResultsPage() {
  const { refinedResults } = useContext(DataContext);
  const { games, count } = refinedResults;
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);

  const getPageCount = useCallback(() => {
    setPageCount(() => {
      if (count) {
        let pageCount = count / 30;
        console.log(pageCount)
        return pageCount % 1 === 0 ? pageCount : Math.floor(pageCount) + 1;
      }
    });
  }, [count]);

  useEffect(() => {
    getPageCount();
  }, [getPageCount]);

  const handleChange = (evt, value) => {
    setPage(value)
  }

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
                  games.map(r =>
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
        <ResultsPagination
          page={page}
          handleChange={handleChange}
          pageCount={pageCount}
        />
      </ContentContainer>
    </Stack>
  );
};