import React from 'react';
import { Typography, Grid } from '@mui/material';

export default function ErrorMessage() {
  return (
    <Grid
      item
      xs={12}
    >
      <Typography
        variant='h5'
        sx={{ color: 'primary.text', textAlign: 'center' }}
      >
        Oops something went wrong...
      </Typography>
    </Grid>
  );
}
