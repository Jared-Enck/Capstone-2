import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Copyright() {
  return (
    <Typography sx={{ color: 'primary.text' }}>
      {'© '}
      <Link to='/'>MyGameNights</Link> {new Date().getFullYear()}.
      {' All rights reserved.'}
    </Typography>
  );
}
