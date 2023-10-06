import React from 'react';
import { Grid, Card } from '@mui/material';
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
              width={isSmallScreen ? '18rem' : '20rem'}
              height={isSmallScreen ? '9.25rem' : '11.25rem'}
            />
          </Card>
        </Grid>
      );
    }
    return skels;
  };
  return genSkels();
}
