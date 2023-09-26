import React, { useState } from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import MediaCard from './MediaCard';
import ContentContainer from '../common/ContentContainer';
import MediaSkeleton from './MediaSkeleton';
import VideoPlayer from './VideoPlayer';
import { useTheme } from '@mui/material/styles';

export default function MediaContainer({ items }) {
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
          fullScreen={fullScreen}
        />
      ) : null}
      <Grid
        sx={{
          paddingTop: 1,
        }}
        container
        direction={'row'}
        spacing={2}
        justifyContent={fullScreen ? 'space-around' : 'space-between'}
      >
        {items ? (
          items.map((i) => (
            <Grid
              key={i.id.videoId}
              item
              justifyContent={'center'}
            >
              <MediaCard
                item={i}
                height={200}
                width={300}
                handleClick={handleClick}
              />
            </Grid>
          ))
        ) : (
          <MediaSkeleton isVideo />
        )}
      </Grid>
    </ContentContainer>
  );
}
