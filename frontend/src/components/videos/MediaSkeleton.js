import React from 'react';
import { Grid, Card, CardActionArea } from '@mui/material';
import BaseSkeleton from '../common/BaseSkeleton';

export default function MediaSkeleton({ isSmallScreen }) {
  const genSkels = () => {
    const skels = [];
    for (let i = 0; i < 6; i++) {
      skels.push(
        <Grid
          key={i}
          item
          margin={'auto'}
          width={isSmallScreen ? '100%' : null}
        >
          <Card sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
            <BaseSkeleton
              width={'20rem'}
              height={'11.25rem'}
            />
          </Card>
        </Grid>
      );
    }
    return skels;
  };
  return genSkels();
}
