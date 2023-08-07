import React, { Suspense } from 'react';
import { Typography, Grid, Button, alpha } from '@mui/material';
import styled from '@emotion/styled';
import CircularLoading from '../common/CircularLoading';

const SearchBoxButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.text,
  backgroundColor: alpha(`${theme.palette.primary.main}`, 0.3),
  height: '1.5rem',
  fontSize: '.7rem',
  padding: '.5rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.contrastText,
  },
}));

export default function SearchBoxSection({ sectionName, items, handleClick }) {
  return (
    <>
      <Typography
        sx={{
          marginLeft: '.3rem',
          textAlign: 'left',
          color: 'primary.contrastText',
        }}
      >
        {sectionName}
      </Typography>
      <Grid
        container
        direction={'row'}
        sx={{
          padding: '0.3rem',
        }}
      >
        <Suspense fallback={<CircularLoading size={'1.5rem'} />}>
          {items
            ? items.map((i) => (
                <Grid
                  key={i.id}
                  item
                  sx={{ marginRight: '.5rem' }}
                >
                  <SearchBoxButton
                    variant='contained'
                    size='small'
                    onClick={() => handleClick(sectionName.toLowerCase(), i)}
                    className='main-button'
                  >
                    {i.name}
                  </SearchBoxButton>
                </Grid>
              ))
            : null}
        </Suspense>
      </Grid>
    </>
  );
}
