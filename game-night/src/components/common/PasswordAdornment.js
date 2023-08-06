import React from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function PasswordAdornment({
  showPassword,
  handleShowPassword,
}) {
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <InputAdornment position='end'>
      <IconButton
        aria-label='toggle password visibility'
        onClick={handleShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge='end'
        sx={{ color: 'primary.muted' }}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
}
