import React from 'react';
import { Stack, Grid } from '@mui/material';
import BaseSkeleton from '../common/BaseSkeleton';

export default function CollectionSkeleton({ itemsOnPage }) {
  let skelItems = [];

  for (let i = 0; i < itemsOnPage; i++) {
    skelItems.push(
      <Grid
        item
        key={i}
      >
        <BaseSkeleton
          width={345}
          height={383}
          shadow={1}
        />
      </Grid>
    );
  }

  return (
    <Stack spacing={2}>
      <Stack
        spacing={1}
        width={300}
        padding={'1.5rem 1.5rem 0rem 2rem'}
      >
        <BaseSkeleton />
        <BaseSkeleton height='1.5rem' />
      </Stack>
      <Grid
        container
        direction={'row'}
        spacing={3}
        paddingLeft={'.5rem'}
      >
        {skelItems.map((i) => i)}
      </Grid>
    </Stack>
  );
}
