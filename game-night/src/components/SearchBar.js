import React, { useCallback, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import GameNightApi from "../gameNightApi";
import SearchBoxResults from "./SearchBoxResults";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase
} from './styled'
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const searchBar = document.getElementById('search-bar');

  const handleResults = useCallback((results) => {
    setSearchResults(results);
    setAnchorEl(searchBar);
  });
  
  const debouncedRequest = useDebounce(async () => {
    if (searchTerm) {
      const results = await GameNightApi.getSearchResults(searchTerm);
      handleResults(results);
    }
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedRequest();
  };

  return (
    <Search id="search-bar">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        name="search"
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        value={searchTerm}
        autoComplete="off"
      />
      <SearchBoxResults 
        results={searchResults}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        open={open}
      />
    </Search>
  )
}