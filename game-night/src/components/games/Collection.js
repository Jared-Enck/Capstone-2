import React, {
  useState,
  useEffect,
  lazy,
  useCallback
} from "react";
import {
  Grid,
  Stack
} from "@mui/material";
import GameCard from "./GameCard";
import ResultsPagination from "../common/ResultsPagination";
import usePagination from "../../hooks/usePagination";
const CollectionStatsComp = lazy(
  () => import("./CollectionStats")
);

export default function Collection({
  size,
  collection,
  itemsOnPage
}) {
  const [pageContent, setPageContent] = useState([]);

  const [
    page,
    pageCount,
    handleChange,
    setPage
  ] = usePagination(size, itemsOnPage);

  const getPageContent = useCallback(() => {
    let range = [0, itemsOnPage];
    if (page !== 1) {
      const skipAmount = (page - 1) * itemsOnPage;
      range = range.map(n => n + skipAmount);
    }
    const content = collection.slice(range[0], range[1]);
    setPageContent(content);
  }, [page, itemsOnPage, setPageContent, collection]);

  useEffect(() => {
    getPageContent()
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page, getPageContent]);

  useEffect(() => {
    if (!pageContent.length && page !== 1) setPage(page - 1);
    // eslint-disable-next-line
  }, [pageContent.length, setPage]);

  return (
    <Stack spacing={2}>
      <CollectionStatsComp
        size={size}
      />
      <Grid
        container
        direction={"row"}
        spacing={3}
        paddingLeft={".5rem"}
      >
        {
          pageContent.length
            ? (
              pageContent.map(g => (
                <Grid key={g.id} item>
                  <GameCard game={g} onProfilePage />
                </Grid>
              ))
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
    </Stack>
  );
};