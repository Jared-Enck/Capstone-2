import React from 'react';
import { Container, Typography, Divider, alpha } from '@mui/material';
import styled from '@emotion/styled';

const StyledContainer = styled(Container)(({ alphaScale, theme }) => ({
  margin: 0,
  backgroundColor: alpha(`${theme.palette.primary.main}`, alphaScale),
  borderRadius: theme.shape.borderRadius,
  padding: '1.5rem',
  alignSelf: 'center',
}));

export default function ContentContainer({
  alphaScale = 1,
  shadow = 'none',
  header = null,
  divider,
  blur,
  children,
}) {
  return (
    <StyledContainer
      maxWidth={'lg'}
      alphaScale={alphaScale}
      sx={{
        boxShadow: shadow,
        backdropFilter: blur ? `blur(7px)` : 'none',
      }}
    >
      {header ? (
        <Typography
          variant={'h5'}
          sx={{
            color: 'secondary.main',
          }}
          gutterBottom
        >
          {header}
        </Typography>
      ) : null}
      {divider ? <Divider sx={{ color: 'primary.dark' }} /> : null}
      {children}
    </StyledContainer>
  );
}
