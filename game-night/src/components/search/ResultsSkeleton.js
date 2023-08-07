import React from 'react';
import { Grid } from '@mui/material';
import BaseSkeleton from '../common/BaseSkeleton';

export default function ResultsSkeleton({ itemsOnPage, currentUser }) {
  let skelItems = [];

  for (let i = 0; i < itemsOnPage; i++) {
    skelItems.push(
      <Grid
        item
        key={i}
      >
        <BaseSkeleton
          width={345}
          height={currentUser ? 383 : 328}
          shadow={1}
        />
      </Grid>
    );
  }

  return <>{skelItems.map((i) => i)}</>;
}
