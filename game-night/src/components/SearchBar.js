import React, { useContext } from "react";
import DataContext from "../context/DataContext";
import SearchBoxResults from "./SearchBoxResults";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase
} from './styled'
import SearchIcon from '@mui/icons-material/Search';

export default function SearchForm() {
  const { 
    searchTerm, 
    setSearchTerm, 
    debouncedRequest,
    listGames
  } = useContext(DataContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    debouncedRequest();
  };

  return (
    <Search
      aria-controls={open ? 'search-results' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
    >
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
      <SearchBoxResults listGames={listGames} />
    </Search>
  )
}