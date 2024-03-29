import React, { useContext } from 'react';
import DataContext from '../../context/DataContext';
import UserContext from '../../context/UserContext';
import { Stack, Dialog, Box, DialogContent, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SearchInput } from '../styled';
import CircularLoading from '../common/CircularLoading';
import NoGamesFound from './NoGamesFound';
import GamesList from './GamesList';

export default function SearchDialog({ open, setOpen }) {
  const {
    setGame,
    isLoading,
    searchTerm,
    boxResults,
    setBoxResults,
    debouncedRequest,
    setSearchTerm,
  } = useContext(DataContext);
  const { navigate } = useContext(UserContext);

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

  // handle game list item click
  const handleGameClick = (gameID) => {
    // sets game and navigates to game details
    setGame('');
    navigate(`/games/${gameID}`);
    clearBoxResults();
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
            bgcolor: 'primary.main',
          },
        }}
      >
        <Stack
          direction={'row'}
          sx={{
            padding: 1,
          }}
        >
          <IconButton onClick={handleClose}>
            <ArrowBackIcon sx={{ color: 'primary.text' }} />
          </IconButton>

          <SearchInput
            id='search'
            name='search'
            placeholder='Search games by title...'
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleChange}
            value={searchTerm}
            autoComplete='off'
            autoFocus
            sx={{ flexGrow: 1 }}
          />
        </Stack>

        <DialogContent sx={{ color: 'primary.text', padding: 0.5 }}>
          {isLoading ? (
            <Box padding={1}>
              <CircularLoading />
            </Box>
          ) : boxResults === -1 ? (
            <NoGamesFound />
          ) : boxResults.length ? (
            <GamesList
              games={boxResults.slice(0, 12)}
              handleGameClick={handleGameClick}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
