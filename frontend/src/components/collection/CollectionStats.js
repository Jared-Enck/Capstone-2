import React, { useContext } from 'react';
import DataContext from '../../context/DataContext';
import { Stack, Typography } from '@mui/material';

export default function CollectionStats({ size }) {
  const { colValue } = useContext(DataContext);

  return (
    <Stack
      spacing={1}
      padding={'1.5rem 1.5rem 0rem 2rem'}
    >
      <Typography
        variant='h5'
        color={'primary.text'}
      >
        Collection
      </Typography>
      <Typography color={'primary.text'}>Total Games: {size}</Typography>
      <Typography color={'primary.text'}>
        {/* Estimated Value: {`$${colValue.toLocaleString('en-Us')}`} */}
      </Typography>
    </Stack>
  );
}
