import React from 'react';
import { Pagination, alpha } from '@mui/material';
import styled from '@emotion/styled';

const StyledPagination = styled(Pagination)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: '1rem',
  '& .MuiPaginationItem-root': {
    color: theme.palette.primary.text,
  },
  '& .MuiPaginationItem-root.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  '& .MuiButtonBase-root': {
    '&:hover': {
      backgroundColor: alpha(`${theme.palette.primary.dark}`, 0.6),
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
