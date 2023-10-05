import React from 'react';
import { CardMedia, Card, CardActionArea } from '@mui/material';
import VideoOverlay from './VideoOverlay';

export default function MediaCard({ item, handleClick }) {
  console.log(item.snippet.thumbnails.medium);
  return (
    <Card
      sx={{
        boxShadow: 0,
      }}
    >
      <CardActionArea onClick={() => handleClick(item)}>
        <VideoOverlay title={item.snippet.title} />
        <CardMedia
          src={item.snippet.thumbnails.medium.url}
          sx={{
            objectFit: 'fill',
          }}
          component='img'
          alt={item.snippet.title}
        />
      </CardActionArea>
    </Card>
  );
}
