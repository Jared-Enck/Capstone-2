import React, { useState } from 'react';
import { Grid, useMediaQuery, Box } from '@mui/material';
import MediaCard from './MediaCard';
import ContentContainer from '../common/ContentContainer';
import MediaSkeleton from './MediaSkeleton';
import VideoPlayer from './VideoPlayer';
import { useTheme } from '@mui/material/styles';

export default function MediaContainer({ game, items }) {
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
          height: isSmallScreen ? '23.5rem' : null,
        }}
        container
        direction={'row'}
        spacing={2}
      >
        {game ? (
          items.map((i) => (
            <Grid
              key={i.id.videoId}
              item
              margin='auto'
            >
              <MediaCard
                item={i}
                handleClick={handleClick}
                isSmallScreen={isSmallScreen}
              />
            </Grid>
          ))
        ) : (
          <MediaSkeleton isSmallScreen={isSmallScreen} />
        )}
      </Grid>
    </ContentContainer>
  );
}
