import React, { useCallback, useContext, useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import GameNightApi from "../../gameNightApi";
import DataContext from "../../context/DataContext";
import SearchBoxResults from "./SearchBoxResults";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase
} from '../styled'
import SearchIcon from '@mui/icons-material/Search';
import { Collapse } from "@mui/material";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const {open, setOpen} = useContext(DataContext);
  // const search = document.getElementById("search");

  const handleResults = useCallback((results) => {
    setSearchResults(results);
  });
  
  const debouncedRequest = useDebounce(async () => {
    if (searchTerm && searchTerm.length > 2) {
      setOpen(true);
      const results = await GameNightApi.getSearchResults(searchTerm);
      handleResults(results);
    }
  });

  // useEffect(() => {
  //   if (!search.classList.contains('Mui-focused')) setOpen(false);
  // },[])

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    debouncedRequest();
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        id="search"
        name="search"
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        value={searchTerm}
        autoComplete="off"
      />
      <Collapse in={open}>
        <SearchBoxResults 
          results={searchResults}
          setSearchTerm={setSearchTerm}
          setSearchResults={setSearchResults}
        />      
      </Collapse>
    </Search>
  )
}