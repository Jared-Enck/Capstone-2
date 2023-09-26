import React from 'react';
import { Grid } from '@mui/material';
import BaseSkeleton from '../common/BaseSkeleton';

export default function MediaSkeleton({ fullScreen, isVideo }) {
  const height = 200;
  const width = isVideo ? 300 : 200;
  const genSkels = () => {
    const skels = [];
    for (let i = 0; i < 6; i++) {
      skels.push(
        <Grid
          key={i}
          item
        >
          <BaseSkeleton
            height={height}
            width={width}
          />
        </Grid>
      );
    }
    return skels;
  };
  return genSkels();
}
