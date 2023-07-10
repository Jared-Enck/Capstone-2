import React, { useCallback, useContext, useState, useEffect } from "react";
import DataContext from "../../context/DataContext";
import {
  Stack,
  Grid
} from "@mui/material";
import ContentContainer from "../common/ContentContainer";
import GameCard from "../games/GameCard";
import ErrorMessage from "../common/ErrorMessage";
import ResultsPagination from "../common/ResultsPagination";

export default function SearchResultsPage() {
  const {
    resultsHeader,
    searchCount,
    nextResults,
    getNextResults,
    errors
  } = useContext(DataContext);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);

  const getPageCount = useCallback(() => {
    if (searchCount) {
      setPageCount(() => {
        const initialPages = searchCount / 30;
        return initialPages % 1 === 0 ? initialPages : Math.ceil(initialPages);
      });
    }
  }, [searchCount]);

  useEffect(() => {
    setPage(1);
    getPageCount();
  }, [getPageCount]);

  const handleChange = async (evt, value) => {
    setPage(value);
    if (!nextResults[value]) {
      const skipAmount = (value - 1) * 30;
      await getNextResults(value, skipAmount);
    }
  };

  const gridItemComp = (game) => (
    <Grid item key={game.id}>
      <GameCard game={game} />
    </Grid>
  );

  const header = `Results for "${resultsHeader.name}"`

  return (
    <Stack>
      <ContentContainer header={header} divider>
        <Grid
          container
          spacing={3}
          padding={"1.5rem"}
          direction={"row"}
          sx={{
            marginTop: ".5rem",
            justifyContent: "center"
          }}
        >
          {
            errors
              ? <ErrorMessage />
              : (
                nextResults[page]
                  ? nextResults[page].map(g => gridItemComp(g))
                  : null
              )
          }
        </Grid>
        <ResultsPagination
          page={page}
          handleChange={handleChange}
          pageCount={pageCount}
        />
      </ContentContainer>
    </Stack>
  );
};