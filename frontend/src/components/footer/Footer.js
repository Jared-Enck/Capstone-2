import React, { useContext } from 'react';
import DataContext from '../../context/DataContext';
import styled from '@emotion/styled';
import { Box, Container, Grid, Link, Stack } from '@mui/material';
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
  const newTab = (url) => window.open(url, '_blank');
  const { isSmallScreen } = useContext(DataContext);
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
              <Stack
                direction={'row'}
                spacing={2}
              >
                {[
                  <LinkedIn fontSize={isSmallScreen ? 'medium' : 'large'} />,
                  <GitHub fontSize={isSmallScreen ? 'medium' : 'large'} />,
                ].map((icon, idx) => {
                  const urls = [
                    'https://www.linkedin.com/in/jared-enck',
                    'https://github.com/Jared-Enck',
                  ];
                  return (
                    <Link
                      key={idx}
                      onClick={() => newTab(urls[idx])}
                      sx={{
                        display: 'flex',
                        padding: 0,
                        color: 'primary.text',
                        transition: '200ms ease-in-out',
                        '&:hover': {
                          color: 'secondary.main',
                          cursor: 'pointer',
                        },
                      }}
                    >
                      {icon}
                    </Link>
                  );
                })}
              </Stack>
            </Grid>
          </Grid>
        </StyledContainer>
      </StyledBox>
    </footer>
  );
}
