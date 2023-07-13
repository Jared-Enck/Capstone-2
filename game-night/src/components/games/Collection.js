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

  const setPageContent = useCallback((range) => {
    const selected = collection.splice(range[0], range[1]);
    console.log(selected)
    setPages({ ...pages, [page]: selected });
  }, [setPages, page, pages, collection]);

  useEffect(() => {
    const range = [0, itemsOnPage];
    if (!Object.keys(pages).length) {
      setPageContent(range);
    } else {
      if (!pages[page]) {
        const skipAmount = (page - 1) * itemsOnPage;
        const newRange = range.map(n => n + skipAmount);
        setPageContent(newRange);
      };
    }
    // if (count / itemsOnPage < pageCount) {
    //   const lastPage = Math.max(Object.keys(pages));
    //   setPages(prev => {
    //     const next = {...prev};
    //     delete next[lastPage];
    //     return next;
    //   })
    // }
    console.log(pages)
  }, [setPageContent, page, itemsOnPage, pages, collection.length]);

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
              page[page]
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