import React from 'react';
import { Grid } from '@mui/material';
import BaseSkeleton from '../common/BaseSkeleton';

export default function ProfileSkeleton({ avatarSize }) {
  return (
    <>
      <Grid
        item
        xs={12}
        md={2}
      >
        <BaseSkeleton
          variant='circular'
          width={avatarSize.width}
          height={avatarSize.height}
        />
      </Grid>
      <Grid
        item
        marginTop={'auto'}
        xs={12}
        md={10}
      >
        <BaseSkeleton width='10rem' />
      </Grid>
    </>
  );
}
