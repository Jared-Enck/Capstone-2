import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import UserContext from '../../context/UserContext';
import { Stack, Grid } from '@mui/material';
import ContentContainer from '../common/ContentContainer';
import GameCard from '../games/GameCard';
import ResultsPagination from '../common/ResultsPagination';
import usePagination from '../../hooks/usePagination';
import ResultsSkeleton from './ResultsSkeleton';
import BaseSkeleton from '../common/BaseSkeleton';

export default function SearchResultsPage({ itemsOnPage }) {
  const { path, id } = useParams();
  const { searchResults, getSearchResults, resultsHeader, getSearchHeader } =
    useContext(DataContext);
  const { currentUser } = useContext(UserContext);
  const { pages, count } = searchResults;

  const [page, pageCount, handleChange, setPage] = usePagination(
    count,
    itemsOnPage
  );

  useEffect(() => {
    // if no header, gets header
    if (!resultsHeader) getSearchHeader(id);
  }, [resultsHeader, getSearchHeader, id]);

  useEffect(() => {
    // get search results from params
    const searchObj = { [path]: id };
    if (!Object.keys(pages).length) {
      // no content in pages set page to 1
      setPage(1);
      // GET request for search results
      getSearchResults(searchObj);
    } else {
      if (!pages[page]) {
        // Get request for pagination skip amount
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
          {pages[page] ? (
            pages[page].map((g) => gridItemComp(g))
          ) : (
            <ResultsSkeleton
              itemsOnPage={itemsOnPage}
              currentUser={currentUser}
            />
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
