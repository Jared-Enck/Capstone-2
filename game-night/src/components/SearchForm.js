import React, { useContext, useEffect } from "react";
import useFields from "../hooks/useFields";
import { 
  FormControl
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase
} from './styled'
import SearchIcon from '@mui/icons-material/Search';

export default function SearchForm() {
  return (
    <FormControl>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          name="search"
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </FormControl>
  )
}