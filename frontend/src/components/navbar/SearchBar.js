import React, { useContext, useEffect } from 'react';
import DataContext from '../../context/DataContext';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Collapse, alpha, ClickAwayListener } from '@mui/material';
import styled from '@emotion/styled';
import SearchBoxResults from './SearchBoxResults';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.muted, 0.3),
  transition: 'all 200ms',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.muted, 0.4),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.primary.text,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: `.1rem solid transparent`,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
      width: '50ch',
    },
    '&:focus': {
      border: `.1rem solid ${theme.palette.secondary.main}`,
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function SearchBar() {
  const {
    open,
    setOpen,
    searchTerm,
    boxResults,
    setBoxResults,
    debouncedRequest,
    setSearchTerm,
  } = useContext(DataContext);

  const clearBoxResults = () => {
    setOpen(false);
    setSearchTerm('');
    setBoxResults('');
  };

  const handleClickAway = () => {
    clearBoxResults();
  };

  // handles search term change
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setBoxResults('');
    // GET request to API for results matching searchTerm
    debouncedRequest();
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        id='search'
        name='search'
        placeholder='Search games by title...'
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        value={searchTerm}
        autoComplete='off'
      />
      {/* {Object.keys(boxResults).length} */}
      {boxResults.length ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Collapse in={open}>
            <SearchBoxResults
              results={boxResults}
              clearBoxResults={clearBoxResults}
            />
          </Collapse>
        </ClickAwayListener>
      ) : null}
    </Search>
  );
}
