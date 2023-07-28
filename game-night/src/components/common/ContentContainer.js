import React from 'react';
import { Container, Typography, Divider } from '@mui/material';
import styled from '@emotion/styled';
const StyledContainer = styled(Container)(({ theme }) => ({
  margin: 0,
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  padding: '1.5rem',
  alignSelf: 'center',
}));

export default function ContentContainer({ header = null, divider, children }) {
  return (
    <StyledContainer maxWidth={'lg'}>
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
      {divider ? <Divider /> : null}
      {children}
    </StyledContainer>
  );
}
