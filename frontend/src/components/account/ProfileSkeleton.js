import React from 'react';
import { Grid } from '@mui/material';
import BaseSkeleton from '../common/BaseSkeleton';

export default function ProfileSkeleton() {
  return (
    <>
      <Grid item>
        <BaseSkeleton
          variant='circular'
          width={120}
          height={120}
        />
      </Grid>
      <Grid
        item
        xs={8}
        marginTop={'auto'}
      >
        <BaseSkeleton />
      </Grid>
    </>
  );
}
