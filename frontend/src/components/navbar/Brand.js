import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { Logo } from '../styled';

export default function Brand() {
  return (
    <Grid
      item
      sx={{
        display: 'flex',
        width: '4rem',
        height: '3.125rem',
        justifyContent: 'left',
      }}
    >
      <Link
        to='/'
        style={{ alignSelf: 'center' }}
      >
        <Logo>
          <Typography
            sx={{
              alignSelf: 'center',
              fontSize: '1.4rem',
              fontWeight: 'bold',
            }}
          >
            GN
          </Typography>
        </Logo>
      </Link>
    </Grid>
  );
}
