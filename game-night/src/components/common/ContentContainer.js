import React from 'react';
import { Container, Typography, Divider, alpha } from '@mui/material';
import styled from '@emotion/styled';

const StyledContainer = styled(Container)(({ theme }) => ({
  margin: 0,
  backgroundColor: alpha(`${theme.palette.primary.main}`, 0.6),
  borderRadius: theme.shape.borderRadius,
  padding: '1.5rem',
  alignSelf: 'center',
}));

export default function ContentContainer({
  shadow = 'none',
  header = null,
  divider,
  children,
}) {
  return (
    <StyledContainer
      maxWidth={'lg'}
      sx={{
        boxShadow: shadow,
        backdropFilter: `blur(10px)`,
      }}
    >
      {header ? (
        <Typography
          variant={'h5'}
          sx={{
            color: 'primary.contrastText',
          }}
          gutterBottom
        >
          {header}
        </Typography>
      ) : null}
      {divider ? <Divider sx={{ color: 'primary.muted' }} /> : null}
      {children}
    </StyledContainer>
  );
}
