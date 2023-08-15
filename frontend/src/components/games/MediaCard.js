import React from 'react';
import { CardMedia, Card, CardActionArea } from '@mui/material';
import VideoOverlay from './VideoOverlay';

export default function MediaCard({
  item,
  size,
  width,
  height,
  handleClick,
  isVideo,
}) {
  return (
    <Card
      sx={{
        height: height,
        width: width,
        boxShadow: 0,
      }}
    >
      <CardActionArea onClick={() => handleClick(item.url)}>
        {isVideo ? <VideoOverlay title={item.title} /> : null}
        <CardMedia
          sx={{
            height: height,
            width: width,
            objectFit: 'fill',
          }}
          component='img'
          image={item[size] || item.image_url}
          alt={item.name || item.title}
        />
      </CardActionArea>
    </Card>
  );
}
