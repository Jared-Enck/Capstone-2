import React, {
  useState,
  useEffect,
  lazy,
  useCallback
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
  }, [page, getPageContent]);

  useEffect(() => {
    if (!pageContent.length && page !== 1) setPage(page - 1);
    // eslint-disable-next-line
  }, [pageContent.length, setPage]);

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
          size={size}
        />
      </Grid>
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
  );
};