import React from 'react';
import { Skeleton, alpha } from '@mui/material';
import styled from '@emotion/styled';

const StyledSkel = styled(Skeleton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.muted, 0.4),
  '& .MuiSkeleton-root': {
    animationDuration: '.3sec',
  },
}));

export default function BaseSkeleton({
  variant = 'rounded',
  width = '100%',
  height = '2rem',
  shadow,
  center,
}) {
  const boxShadow = shadow ? shadow : 'none';
  return (
    <StyledSkel
      variant={variant}
      animation='wave'
      sx={{
        margin: center ? 'auto' : null,
        width: width,
        height: height,
        boxShadow: boxShadow,
      }}
    />
  );
}
