import React, { useContext } from 'react';
import DataContext from '../../context/DataContext';
import SearchIcon from '@mui/icons-material/Search';
import { Collapse, ClickAwayListener } from '@mui/material';
import SearchBoxResults from './SearchBoxResults';
import { Search, SearchIconWrapper, StyledInputBase } from '../styled';

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
    setBoxResults('');
    setOpen(false);
    setSearchTerm('');
  };

  const handleClickAway = () => {
    clearBoxResults();
  };

  // handles search term change
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
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
      <ClickAwayListener onClickAway={handleClickAway}>
        <Collapse in={open}>
          <SearchBoxResults
            results={boxResults}
            clearBoxResults={clearBoxResults}
          />
        </Collapse>
      </ClickAwayListener>
    </Search>
  );
}
