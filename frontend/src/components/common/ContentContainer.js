import React from 'react';
import { Container, Typography, Divider, alpha, Stack } from '@mui/material';
import styled from '@emotion/styled';

const StyledContainer = styled(Container)(({ alphascale, theme }) => ({
  margin: 0,
  backgroundColor: alpha(`${theme.palette.primary.main}`, alphascale),
  borderRadius: theme.shape.borderRadius,
  padding: '1.5rem',
  alignSelf: 'center',
}));

export default function ContentContainer({
  alphascale = 1,
  shadow = 'none',
  header = null,
  headerData,
  divider,
  blur,
  children,
}) {
  return (
    <StyledContainer
      maxWidth={'lg'}
      alphascale={alphascale}
      sx={{
        boxShadow: shadow,
        backdropFilter: blur ? `blur(7px)` : 'none',
      }}
    >
      {header ? (
        <Stack
          direction={'row'}
          spacing={2}
        >
          <Typography
            variant={'h5'}
            sx={{
              color: 'secondary.main',
            }}
            gutterBottom
          >
            {header}
          </Typography>

          {headerData ? (
            <Typography
              variant='h6'
              sx={{ color: 'primary.muted' }}
            >{`(${headerData})`}</Typography>
          ) : null}
        </Stack>
      ) : null}
      {divider ? <Divider sx={{ color: 'primary.muted' }} /> : null}
      {children}
    </StyledContainer>
  );
}
