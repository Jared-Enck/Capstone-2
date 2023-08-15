import React from 'react';
import { Stack, Grid, Divider, Typography } from '@mui/material';
import BaseSkeleton from '../common/BaseSkeleton';
import ContentContainer from '../common/ContentContainer';

export default function GameDescSkeleton() {
  return (
    <ContentContainer>
      <Typography variant='h4'>
        <BaseSkeleton width='40ch' />
      </Typography>
      <Grid
        container
        direction={'row'}
        spacing={3}
        sx={{
          padding: '.3rem',
        }}
      >
        <Grid item>
          <BaseSkeleton width={220} />
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        direction={'row'}
        padding={'1.2rem'}
      >
        <Grid
          item
          xs={4}
        >
          <BaseSkeleton
            width={300}
            height={300}
          />
        </Grid>
        <Grid
          item
          xs={7}
        >
          <Stack spacing={2.5}>
            <BaseSkeleton width='65ch' />
            <BaseSkeleton width='60ch' />
            <BaseSkeleton width='50ch' />
            <BaseSkeleton width='65ch' />
            <BaseSkeleton width='50ch' />
            <BaseSkeleton width='55ch' />
          </Stack>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
