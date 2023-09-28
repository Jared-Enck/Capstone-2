import React, { useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import { Stack, Typography } from '@mui/material';
import ContentContainer from '../common/ContentContainer';
import GameDescription from './GameDescription';
import GameDescSkeleton from './GameDescSkeleton';
import MediaContainer from '../videos/MediaContainer';
import GameDetails from './GameDetails';

export default function GameDetailsPage() {
  const { game, videos, checkGameCache } = useContext(DataContext);
  const gameID = useParams().id;
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      if (!game || game.objectid !== gameID) {
        // GET request to check cache for game
        checkGameCache(gameID);
      }
    } catch (err) {
      console.error(err);
    }
  }, [game, pathname, checkGameCache, gameID]);

  const NoGameFound = () => (
    <Stack>
      <ContentContainer>
        <Typography
          variant='h5'
          textAlign={'center'}
          color={'primary.text'}
        >
          Sorry, no game found with ID '{gameID}'.
        </Typography>
      </ContentContainer>
    </Stack>
  );

  return game === -1 ? (
    <NoGameFound />
  ) : (
    <Stack spacing={'.3rem'}>
      {game ? <GameDescription game={game} /> : <GameDescSkeleton />}
      <MediaContainer
        game={game}
        items={videos}
      />
      <GameDetails game={game} />
    </Stack>
  );
}
