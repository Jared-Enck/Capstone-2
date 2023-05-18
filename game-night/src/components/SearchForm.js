import React, { useContext, useEffect } from "react";
import useFields from "../hooks/useFields";
import { 
  OutlinedInput,
  FormControl,
  InputLabel
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchForm() {
  return (
    <FormControl>
      <InputLabel>
        Search
      </InputLabel>
      <OutlinedInput
        type="search"
        label="Search"
        name="username"
        placeholder="Search..."
        value={formData.searchTerm}
        onChange={handleChange}
      />
    </FormControl>
  )
}