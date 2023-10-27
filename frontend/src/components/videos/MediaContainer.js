import React, { useState, useContext } from 'react';
import DataContext from '../../context/DataContext';
import { Grid } from '@mui/material';
import MediaCard from './MediaCard';
import ContentContainer from '../common/ContentContainer';
import MediaSkeleton from './MediaSkeleton';
import VideoPlayer from './VideoPlayer';

export default function MediaContainer({ game, items }) {
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState('');
  const { isSmallScreen } = useContext(DataContext);

  const handleClick = (item) => {
    setOpen(true);
    setVideo(item);
  };

  const handleClose = () => {
    setOpen(false);
    setVideo('');
  };

  return (
    <ContentContainer
      header={'Videos'}
      divider
    >
      {video ? (
        <VideoPlayer
          open={open}
          video={video}
          handleClose={handleClose}
          fullScreen={isSmallScreen}
        />
      ) : null}
      <Grid
        sx={{
          marginTop: 1,
          overflow: 'auto',
          height: isSmallScreen ? '21.5rem' : null,
        }}
        container
        direction={'row'}
        spacing={2}
      >
        {game && items ? (
          items.map((i) => (
            <Grid
              key={i.id.videoId}
              item
              margin='auto'
            >
              <MediaCard
                item={i}
                handleClick={handleClick}
              />
            </Grid>
          ))
        ) : (
          <MediaSkeleton />
        )}
      </Grid>
    </ContentContainer>
  );
}
