import React from 'react';
import { Typography } from '@mui/material';

export default function NoGamesFound() {
  return (
    <Typography
      variant='h6'
      sx={{
        fontStyle: 'italic',
        color: 'primary.text',
        padding: '.5rem',
        textAlign: 'center',
      }}
    >
      No results found.
    </Typography>
  );
}
