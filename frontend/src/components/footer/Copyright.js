import React, { useContext } from 'react';
import DataContext from '../../context/DataContext';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Copyright() {
  const { isSmallScreen } = useContext(DataContext);
  const fontSize = isSmallScreen ? '.7rem' : '1rem';
  return (
    <>
      <Stack
        direction={'row'}
        spacing={0.6}
        sx={{
          display: 'flex',
          color: 'primary.text',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: fontSize }}>©</Typography>
        <Typography>
          <Link
            to='/'
            style={{ display: 'flex' }}
          >
            <Typography
              variant='none'
              sx={{ color: 'secondary.main', fontSize: fontSize }}
            >
              MyGameNights
            </Typography>
          </Link>
        </Typography>
        <Typography sx={{ fontSize: fontSize }}>
          {new Date().getFullYear() + '.'}
        </Typography>
        <Typography sx={{ fontSize: fontSize }}>
          {' All rights reserved.'}
        </Typography>
      </Stack>
    </>
  );
}
