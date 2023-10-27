import React from 'react';
import { Stack, Grid } from '@mui/material';
import BaseSkeleton from '../common/BaseSkeleton';

export default function CollectionSkeleton({ itemsOnPage, isMediumScreen }) {
  let skelItems = [];

  for (let i = 0; i < itemsOnPage; i++) {
    skelItems.push(
      <Grid
        item
        key={i}
        sx={{ marginBottom: 2 }}
        lg={4}
      >
        <BaseSkeleton
          width={isMediumScreen ? '10rem' : '20rem'}
          height={isMediumScreen ? '15.938rem' : '22.026rem'}
          shadow={1}
          center={true}
        />
      </Grid>
    );
  }

  return (
    <Stack spacing={2}>
      <Stack
        spacing={1}
        sx={{
          height: 96.01,
          padding: '1.5rem 1.5rem 0rem 2rem',
        }}
      >
        <BaseSkeleton width='7rem' />
        <BaseSkeleton
          width='8rem'
          height='1.5rem'
        />
      </Stack>
      <Grid
        container
        direction={'row'}
        sx={{ width: '100%', justifyContent: 'space-around' }}
      >
        {skelItems.map((i) => i)}
      </Grid>
    </Stack>
  );
}
