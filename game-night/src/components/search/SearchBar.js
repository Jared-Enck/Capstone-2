import React, { useContext } from "react";
import DataContext from "../../context/DataContext";
import SearchBoxResults from "./SearchBoxResults";
import SearchIcon from '@mui/icons-material/Search';
import {
  InputBase,
  Collapse,
  alpha,
  ClickAwayListener
} from "@mui/material";
import styled from "@emotion/styled";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.45),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.60),
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
  color: theme.palette.primary.main,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: '2px solid rgba(0,0,0,0)',
    [theme.breakpoints.up('sm')]: {
      width: '50ch'
    },
    '&:focus': {
      border: `2px solid ${theme.palette.primary.contrastText}`,
      borderRadius: theme.shape.borderRadius,
    }
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
    setSearchTerm
  } = useContext(DataContext);

  const clearBoxResults = () => {
    setSearchTerm('');
    setBoxResults({});
  };

  const handleClickAway = () => {
    setOpen(false);
    clearBoxResults();
  };

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
      {
        Object.keys(boxResults).length
          ? (
            <ClickAwayListener onClickAway={handleClickAway}>
              <Collapse in={open}>
                <SearchBoxResults
                  results={boxResults}
                  clearBoxResults={clearBoxResults}
                />
              </Collapse>
            </ClickAwayListener>
          )
          : null
      }
    </Search>
  )
}