import React, { useEffect, useState, useCallback } from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import GameCard from "./GameCard";
import ResultsPagination from "../common/ResultsPagination";
import usePagination from "../../hooks/usePagination";

export default function Collection({ inSync, collection, itemsOnPage, count }) {
  const [
    page,
    pageCount,
    handleChange,
  ] = usePagination(count, itemsOnPage);

  const [pages, setPages] = useState({});

  const setPageContent = useCallback((page, skip = false) => {
    const range = [0, itemsOnPage];
    let selected;
    if (skip) {
      console.log('skipping')
      const skipAmount = (page - 1) * itemsOnPage;
      const newRange = range.map(n => n + skipAmount);;
      selected = collection.splice(newRange[0], newRange[1]);
    } else {
      selected = collection.splice(range[0], range[1]);
    }
    setPages(prev => ({ ...prev, [page]: selected }));
  }, [setPages, collection]);

  useEffect(() => {
    if (!pages[1]) {
      setPageContent(page);
    } else if (!pages[page]) {
      setPageContent(page, true)
    }
    console.log(pages)
  }, [setPageContent, page, itemsOnPage]);

  const noGamesMsg = (
    <Typography sx={{ color: "primary.text" }} variant="h5">
      No games yet? Try searching for games and then adding them to your collection.
    </Typography>
  )

  return (
    <>
      <Grid
        container
        direction={"row"}
        spacing={3}
        padding={"1.5rem"}
      >
        {
          inSync
            ? (
              pages[page]
                ?
                pages[page].map(g => (
                  <Grid key={g.id} item>
                    <GameCard game={g} ProfilePage />
                  </Grid>
                ))
                : noGamesMsg
            )
            : null
        }
      </Grid>
      {
        pageCount > 1
          ? (
            <ResultsPagination
              page={page}
              handleChange={handleChange}
              pageCount={pageCount}
            />
          )
          : null
      }
    </>
  );
};