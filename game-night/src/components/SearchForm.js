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
  const initialState = {
    search: ''
  }

  const [
    formData, 
    handleChange
  ] = useFields(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Searching...',formData)
  }

  return (
    <form 
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <FormControl>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            name="search"
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleChange}
            value={formData.search}
          />
        </Search>
      </FormControl>
    </form>
  )
}