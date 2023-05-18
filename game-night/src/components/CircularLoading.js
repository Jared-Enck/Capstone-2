import * as React from 'react';
import { CircularProgress, Box } from '@mui/material';

export default function CircularLoading() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  );
}