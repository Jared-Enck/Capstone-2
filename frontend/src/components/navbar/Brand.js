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
        justifyContent: 'center',
        width: '3.125rem',
        height: '3.125rem',
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
              fontSize: '1.7rem',
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
