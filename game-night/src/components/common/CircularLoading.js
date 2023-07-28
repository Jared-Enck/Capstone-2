import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export default function CircularLoading({ size = '2rem' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <CircularProgress
        size={size}
        sx={{
          color: 'primary.contrastText',
        }}
      />
    </Box>
  );
}
