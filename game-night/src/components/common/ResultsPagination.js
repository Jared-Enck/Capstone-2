import React from 'react';
import { Pagination } from '@mui/material';
import styled from '@emotion/styled';

const StyledPagination = styled(Pagination)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: '1rem',
  '& .MuiPaginationItem-root': {
    color: theme.palette.primary.text,
  },
  '& .MuiButtonBase-root': {
    '&:hover': {
      backgroundColor: theme.palette.primary.contrastText,
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
  },
}));

export default function ResultsPagination({
  page,
  handleChange,
  pageCount = 10,
}) {
  return (
    <StyledPagination
      count={pageCount}
      page={page}
      onChange={handleChange}
      shape='rounded'
      size='large'
    />
  );
}
