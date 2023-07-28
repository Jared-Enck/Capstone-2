import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import { Stack, Grid } from '@mui/material';
import ContentContainer from '../common/ContentContainer';
import GameCard from '../games/GameCard';
import ErrorMessage from '../common/ErrorMessage';
import ResultsPagination from '../common/ResultsPagination';
import usePagination from '../../hooks/usePagination';
import ResultsSkeleton from './ResultsSkeleton';
import BaseSkeleton from '../common/BaseSkeleton';

export default function SearchResultsPage({ itemsOnPage }) {
  const { path, id } = useParams();
  const {
    searchResults,
    getSearchResults,
    resultsHeader,
    getSearchHeader,
    errors,
  } = useContext(DataContext);
  const { pages, count } = searchResults;

  const [page, pageCount, handleChange, setPage] = usePagination(
    count,
    itemsOnPage
  );

  useEffect(() => {
    if (!resultsHeader) getSearchHeader(id);
  }, [resultsHeader, getSearchHeader, id]);

  useEffect(() => {
    const searchObj = { [path]: id };
    if (!Object.keys(pages).length) {
      setPage(1);
      getSearchResults(searchObj);
    } else {
      if (!pages[page]) {
        const skipAmount = (page - 1) * itemsOnPage;
        getSearchResults(searchObj, page, skipAmount);
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [getSearchResults, page, setPage, itemsOnPage, pages, id, path]);

  const gridItemComp = (game) => (
    <Grid
      item
      key={game.id}
    >
      <GameCard game={game} />
    </Grid>
  );

  const header = `Results for "${resultsHeader}"`;

  return (
    <Stack>
      <ContentContainer
        header={
          resultsHeader ? (
            header
          ) : (
            <BaseSkeleton
              width={'30ch'}
              height='2.5rem'
            />
          )
        }
        divider
      >
        <Grid
          container
          spacing={3}
          padding={'1.5rem'}
          direction={'row'}
          justifyContent={'center'}
        >
          {errors.length ? (
            <ErrorMessage />
          ) : pages[page] ? (
            pages[page].map((g) => gridItemComp(g))
          ) : (
            <ResultsSkeleton itemsOnPage={itemsOnPage} />
          )}
        </Grid>
        {pageCount > 1 ? (
          <ResultsPagination
            page={page}
            handleChange={handleChange}
            pageCount={pageCount}
          />
        ) : null}
      </ContentContainer>
    </Stack>
  );
}
