import React, { useEffect } from 'react';
import { CardMedia, Card, CardActionArea } from '@mui/material';
import VideoOverlay from './VideoOverlay';

export default function MediaCard({ item, width, height, handleClick }) {
  return (
    <Card
      sx={{
        height: height,
        width: width,
        boxShadow: 0,
      }}
    >
      <CardActionArea onClick={() => handleClick(item)}>
        <VideoOverlay title={item.snippet.title} />
        <CardMedia
          src={item.snippet.thumbnails.medium.url}
          sx={{
            height: height,
            width: width,
            objectFit: 'fill',
          }}
          component='img'
          alt={item.snippet.title}
        />
      </CardActionArea>
    </Card>
  );
}
