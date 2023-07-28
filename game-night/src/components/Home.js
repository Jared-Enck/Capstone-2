import React from 'react';
import { Stack } from '@mui/material';
import ContentContainer from './common/ContentContainer';

export default function Home() {
  return (
    <Stack>
      <ContentContainer
        header={'Homepage'}
        divider
      ></ContentContainer>
    </Stack>
  );
}
