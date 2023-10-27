import React from 'react';
import { Stack } from '@mui/material';
import BaseSkeleton from '../common/BaseSkeleton';
import ContentContainer from '../common/ContentContainer';

export default function GameDetailsSkeleton() {
  const genSkels = () => {
    const skels = [];
    for (let i = 0; i < 6; i++) {
      skels.push(
        <>
          <BaseSkeleton
            width='14rem'
            height='2.2rem'
          />
          <BaseSkeleton />
        </>
      );
    }
    return skels;
  };
  return (
    <ContentContainer header={'Details'}>
      <Stack>
        {genSkels().map((s, idx) => (
          <Stack
            direction={'row'}
            spacing={12}
            sx={{
              height: '3.859rem',
              alignItems: 'center',
              backgroundColor: 'primary.main',
              padding: '16px 16px',
              '&:nth-of-type(odd)': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            {s}
          </Stack>
        ))}
      </Stack>
    </ContentContainer>
  );
}
