import React, {
  useState,
  useCallback,
  useEffect,
  lazy
} from "react";
import {
  Grid,
  Divider
} from "@mui/material";
import GameCard from "./GameCard";
import ResultsPagination from "../common/ResultsPagination";
import usePagination from "../../hooks/usePagination";

const CollectionStatsComp = lazy(
  () => import("./CollectionStats")
);

const gamesChanged = (a, b) => {
  let result = false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < b.length; i++) {

    if (a[i] !== b[i]) {
      return false;
    } else {
      result = true;
    }
  }
  return result;
}

export default function Collection({ gameIDs, collection, itemsOnPage }) {
  const [collectionValue, setCollectionValue] = useState(0);
  const [pages, setPages] = useState('');

  const getCollectionValue = useCallback(() => {
    let total = 0;
    collection.map(g => total += g.msrp);
    setCollectionValue(total);
  }, [collection]);

  useEffect(() => {
    getCollectionValue();
  }, [getCollectionValue, gameIDs.size]);

  const [
    page,
    setPage,
    pageCount,
    handleChange,
  ] = usePagination(gameIDs.size, itemsOnPage);

  const checkForUpdate = useCallback((selected) => {
    console.log('checking for update')

    const sameGames = gamesChanged(pages[page], selected);
    if (!sameGames) {
      setPages(prev => {
        const next = { ...prev };
        next[page] = selected;
        return next;
      })
      if(!pages[page].length) setPage(page - 1);
    }
  }, [page, pages]);

  const setPageContent = useCallback(() => {
    const range = [0, itemsOnPage];
    const skipAmount = (page - 1) * itemsOnPage;
    const games = [...collection];
    let selected;

    if (!pages) {
      selected = games.splice(range[0], range[1]);
      console.log('selected:', selected)
      setPages({ [page]: selected });
    } else {
      const skipRange = range.map(n => n + skipAmount);
      selected = games.splice(skipRange[0], skipRange[1]);
      if (!pages[page]) {
        console.log('collection:', games)
        console.log('selected:', selected)
        setPages({ ...pages, [page]: selected });
      } else {
        checkForUpdate(selected);
      }
    }
  }, [setPages, pages, page, itemsOnPage, collection]);


  useEffect(() => {
    setPageContent();
    console.log('pages: ', pages)
  }, [setPageContent, page]);

  return (
    <Grid
      container
      direction={"row"}
      spacing={3}
      padding={"1.5rem 1.5rem 0rem 1.5rem"}
    >
      <Grid item xs={12}>
        <Divider />
        <CollectionStatsComp
          gameIDs={gameIDs}
          value={collectionValue}
        />
      </Grid>
      {
        pages
          ? (
            pages[page]
              ? (
                pages[page].map(g => (
                  <Grid key={g.id} item>
                    <GameCard game={g} onProfilePage />
                  </Grid>
                ))
              )
              : null
          )
          : null
      }
      {
        pageCount > 1
          ? (
            <Grid item xs={12}>
              <ResultsPagination
                page={page}
                handleChange={handleChange}
                pageCount={pageCount}
              />
            </Grid>
          )
          : null
      }
    </Grid>
  );
};