import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export default function CircularLoading({
  size = '2rem',
  color = 'primary.contrastText',
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <CircularProgress
        size={size}
        sx={{
          color: color,
        }}
      />
    </Box>
  );
}
