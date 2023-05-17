import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Game Night
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}