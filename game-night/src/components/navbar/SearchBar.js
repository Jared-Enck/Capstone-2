import React, { useContext, lazy } from 'react';
import DataContext from '../../context/DataContext';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Collapse, alpha, ClickAwayListener } from '@mui/material';
import styled from '@emotion/styled';

const SearchBoxResultsComp = lazy(() => import('./SearchBoxResults'));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.6),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.light, 0.8),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
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
    border: '2px solid rgba(0,0,0,0)',
    [theme.breakpoints.up('sm')]: {
      width: '50ch',
    },
    '&:hover, &:focus': {
      border: `2px solid ${theme.palette.primary.contrastText}`,
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
    setBoxResults({});
  };

  const handleClickAway = () => {
    clearBoxResults();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setBoxResults({});
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
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        value={searchTerm}
        autoComplete='off'
      />
      {Object.keys(boxResults).length ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Collapse in={open}>
            <SearchBoxResultsComp
              results={boxResults}
              clearBoxResults={clearBoxResults}
            />
          </Collapse>
        </ClickAwayListener>
      ) : null}
    </Search>
  );
}
