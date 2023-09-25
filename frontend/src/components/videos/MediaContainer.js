import React from 'react';
import { Grid, Typography } from '@mui/material';
import MediaCard from './MediaCard';
import ContentContainer from '../common/ContentContainer';
import MediaSkeleton from './MediaSkeleton';

export default function MediaContainer({ items }) {
  const handleClick = (item) => {
    console.log(item.id.videoId);
  };

  // const handleScroll = useCallback((div) => {
  //   const bottom = div.scrollHeight - div.scrollTop === div.clientHeight;
  //   if (bottom) {
  //     getVideos();
  //     div.removeEventListener('scroll', () => handleScroll(div));
  //   }
  // }, []);

  // useEffect(() => {
  //   const div = videos.current;
  //   if (div) {
  //     div.addEventListener('scroll', () => handleScroll(div));
  //   }
  // }, [videos, handleScroll]);

  return (
    <ContentContainer
      header={'Videos'}
      headerData={items ? items.length : 0}
      divider
    >
      <Grid
        sx={{
          alignItems: 'center',
          height: 220,
          overflow: 'auto',
          marginTop: '.3rem',
        }}
        container
        direction={'row'}
        spacing={2}
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
