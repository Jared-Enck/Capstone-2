import React, { useEffect, useContext, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import { Stack, Typography } from '@mui/material';
import ContentContainer from '../common/ContentContainer';
import GameDescription from './GameDescription';
import GameDescSkeleton from './GameDescSkeleton';
import MediaContainer from './MediaContainer';
import MediaSkeleton from './MediaSkeleton';
import GameDetails from './GameDetails';

export default function GameDetailsPage() {
  const { game, checkGameCache } = useContext(DataContext);
  const gameID = useParams().id;
  const { pathname } = useLocation();
  const [images, setImages] = useState('');
  const [videos, setVideos] = useState('');

  useEffect(() => {
    if (!game.videos || game.id !== gameID) {
      setImages('');
      setVideos('');
      checkGameCache(gameID);
    }
    if (game.detail_images) setImages(game.detail_images);
    if (game.videos) setVideos(game.videos);
    // eslint-disable-next-line
  }, [game, pathname]);

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

  if (gameID.length < 10) return <NoGameFound />;

  return (
    <Stack spacing={'.3rem'}>
      {game.videos ? <GameDescription game={game} /> : <GameDescSkeleton />}
      {images ? <MediaContainer items={images} /> : <MediaSkeleton />}
      {videos ? (
        <MediaContainer
          items={videos}
          isVideo
        />
      ) : (
        <MediaSkeleton isVideo />
      )}
      <GameDetails game={game} />
    </Stack>
  );
}
