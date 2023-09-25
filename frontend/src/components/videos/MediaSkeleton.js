import React from 'react';
import { Grid } from '@mui/material';
import BaseSkeleton from '../common/BaseSkeleton';
import ContentContainer from '../common/ContentContainer';

export default function MediaSkeleton({ isVideo }) {
  const height = 200;
  const width = isVideo ? 300 : 200;
  const header = isVideo ? 'Videos' : 'Images';
  return (
    <ContentContainer
      header={header}
      divider
    >
      <Grid
        sx={{
          alignItems: 'center',
          height: 220,
          overflow: 'auto',
          marginTop: '.3rem',
        }}
        container
        direction={'row'}
        spacing={2}
      >
        <Grid item>
          <BaseSkeleton
            height={height}
            width={width}
          />
        </Grid>
        <Grid item>
          <BaseSkeleton
            height={height}
            width={width}
          />
        </Grid>
        <Grid item>
          <BaseSkeleton
            height={height}
            width={width}
          />
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
