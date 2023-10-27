import React, {
  useState,
  useEffect,
  lazy,
  useContext,
  useCallback,
} from 'react';
import DataContext from '../../context/DataContext';
import UserContext from '../../context/UserContext';
import { Grid, Stack, Typography } from '@mui/material';
import GameCard from '../games/GameCard';
import ResultsPagination from '../common/ResultsPagination';
import usePagination from '../../hooks/usePagination';
import CollectionSkeleton from './CollectionSkeleton';

const CollectionStatsComp = lazy(() => import('./CollectionStats'));

export default function Collection({ itemsOnPage }) {
  const [pageContent, setPageContent] = useState('');
  const { getCollection, isMediumScreen } = useContext(DataContext);
  const { collection, userGameIDs } = useContext(UserContext);

  const [page, pageCount, handleChange, setPage] = usePagination(
    userGameIDs.size,
    itemsOnPage
  );
  /** Get current page content
   *
   * @returns {*} [ game, ... ]
   *
   * slices games from collection with set range
   *
   * range is calculated with itemsOnPage, page, and skipAmount
   */
  const getPageContent = useCallback(() => {
    let range = [0, itemsOnPage];
    if (page !== 1) {
      const skipAmount = (page - 1) * itemsOnPage;
      range = range.map((n) => n + skipAmount);
    }
    const content = collection.slice(range[0], range[1]);
    setPageContent(content);
  }, [page, itemsOnPage, setPageContent, collection]);

  useEffect(() => {
    // if no collection set, GET request to API with userGameIDs
    if (!collection && userGameIDs) getCollection();
    // eslint-disable-next-line
  }, [collection, userGameIDs, getCollection]);

  useEffect(() => {
    getPageContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, getPageContent]);

  useEffect(() => {
    if (!pageContent.length && page !== 1) setPage(page - 1);
    // eslint-disable-next-line
  }, [pageContent.length, setPage]);

  const noGamesMsg = (
    <Typography
      sx={{ color: 'primary.text', padding: 3 }}
      variant='h5'
    >
      There are no games in your collection.
    </Typography>
  );

  return pageContent ? (
    <Stack spacing={2}>
      <CollectionStatsComp size={userGameIDs.size} />
      <Grid
        container
        direction={'row'}
        sx={{ width: '100%', justifyContent: 'space-around' }}
      >
        {pageContent.length
          ? pageContent.map((g) => (
              <Grid
                key={g.objectid}
                item
                sx={{ marginBottom: 2 }}
                lg={4}
              >
                <GameCard
                  game={g}
                  onProfilePage
                  isMediumScreen={isMediumScreen}
                />
              </Grid>
            ))
          : noGamesMsg}
      </Grid>
      {pageCount > 1 ? (
        <ResultsPagination
          page={page}
          handleChange={handleChange}
          pageCount={pageCount}
        />
      ) : null}
    </Stack>
  ) : (
    <CollectionSkeleton
      itemsOnPage={itemsOnPage}
      isMediumScreen={isMediumScreen}
    />
  );
}
