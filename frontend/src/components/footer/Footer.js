import React from 'react';
import styled from '@emotion/styled';
import { Box, Container, Grid, Button } from '@mui/material';
import { LinkedIn, GitHub } from '@mui/icons-material';
import Copyright from './Copyright';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: '0.5rem',
  background: theme.palette.primary.dark,
  width: '100%',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  justifyContent: 'center',
  maxWidth: '1000px',
  margin: '0 auto',
}));

export default function Footer() {
  // Open in new tab
  const newTab = (idx) => {
    const urls = [
      'https://www.linkedin.com/in/jared-enck',
      'https://github.com/Jared-Enck',
    ];
    window.open(urls[idx], '_blank');
  };
  return (
    <footer style={{ marginTop: '4rem' }}>
      <StyledBox sx={{ padding: '.5rem' }}>
        <StyledContainer>
          <Grid
            container
            direction={'row'}
            justifyContent={'space-around'}
            sx={{ height: '100%', alignItems: 'center' }}
          >
            <Grid item>
              <Copyright />
            </Grid>
            <Grid item>
              {[<LinkedIn fontSize='large' />, <GitHub fontSize='large' />].map(
                (icon, idx) => (
                  <Button
                    key={idx}
                    variant='text'
                    onClick={() => newTab(idx)}
                    sx={{
                      padding: 0,
                      color: 'primary.text',
                      transition: '200ms ease-in-out',
                      '&:hover': { color: 'secondary.main' },
                    }}
                  >
                    {icon}
                  </Button>
                )
              )}
            </Grid>
          </Grid>
        </StyledContainer>
      </StyledBox>
    </footer>
  );
}
