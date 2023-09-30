import React, { useState, useContext } from 'react';
import DataContext from '../../context/DataContext';
import { Dialog, Box, DialogContent, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchBoxResults from './SearchBoxResults';
import { Search, StyledInputBase } from '../styled';

export default function SearchDialog({ open, setOpen }) {
  const {
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

  const handleClose = () => {
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
    <>
      <IconButton onClick={() => setOpen(true)}>
        <SearchIcon sx={{ color: 'primary.text' }} />
      </IconButton>
      <Dialog
        fullScreen={true}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        <Box sx={{ display: 'flex', padding: 1 }}>
          <IconButton onClick={handleClose}>
            <ArrowBackIcon sx={{ color: 'primary.text' }} />
          </IconButton>
          <Search>
            <StyledInputBase
              id='search'
              name='search'
              placeholder='Search games by title...'
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
              value={searchTerm}
              autoComplete='off'
              sx={{ paddingLeft: 0 }}
            />
          </Search>
        </Box>
        <DialogContent>
          {/* <SearchBoxResults
            results={boxResults}
            clearBoxResults={clearBoxResults}
          /> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
