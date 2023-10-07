import React from 'react';
import { Grid } from '@mui/material';
import BaseSkeleton from '../common/BaseSkeleton';

export default function ProfileSkeleton({ avatarSize }) {
  return (
    <>
      <Grid item>
        <BaseSkeleton
          variant='circular'
          width={avatarSize.width}
          height={avatarSize.height}
        />
      </Grid>
      <Grid
        item
        marginTop={'auto'}
      >
        <BaseSkeleton width='10rem' />
      </Grid>
    </>
  );
}
