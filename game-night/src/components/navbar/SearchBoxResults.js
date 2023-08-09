import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Divider, Typography } from '@mui/material';
import styled from '@emotion/styled';
import DataContext from '../../context/DataContext';
import CircularLoading from '../common/CircularLoading';
import GamesList from './GamesList';
import SearchBoxSection from './SearchBoxSection';

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: '.3rem',
  width: '100%',
  backgroundColor: theme.palette.primary.dark,
  borderRadius: theme.shape.borderRadius,
  border: '1px solid black',
  position: 'absolute',
  zIndex: 2,
}));

export default function SearchBoxResults({ results, clearBoxResults }) {
  const navigate = useNavigate();
  const mechanics = results.foundMechanics || [];
  const categories = results.foundCategories || [];
  const games = results.foundGames || [];

  const { setGame, setResultsHeader, setSearchResults, isLoading } =
    useContext(DataContext);

  const handleBtnClick = (path, item) => {
    clearBoxResults();
    setResultsHeader(item.name);
    setSearchResults({ pages: {} });
    navigate(`search/${path}/${item.id}`);
  };

  const handleGameClick = (idx, gameID) => {
    setGame(games[idx]);
    navigate(`/games/${gameID}`);
    clearBoxResults();
  };

  const NoGamesFound = () => {
    return (
      <Typography
        variant='h6'
        sx={{
          fontStyle: 'italic',
          color: 'primary.text',
          padding: '.5rem',
          textAlign: 'center',
        }}
      >
        No results found.
      </Typography>
    );
  };

  return (
    <StyledBox sx={{ boxShadow: 2 }}>
      {results ? (
        <Stack>
          {mechanics.length ? (
            <SearchBoxSection
              sectionName={'Mechanics'}
              items={mechanics}
              handleClick={handleBtnClick}
            />
          ) : null}
          {categories.length ? (
            <SearchBoxSection
              sectionName={'Categories'}
              items={categories}
              handleClick={handleBtnClick}
            />
          ) : null}
          {mechanics.length || categories.length ? (
            <Divider sx={{ color: 'primary.muted' }} />
          ) : null}
          {isLoading ? (
            <Box padding={1}>
              <CircularLoading />
            </Box>
          ) : games.length ? (
            <GamesList
              games={games.slice(0, 10)}
              handleGameClick={handleGameClick}
            />
          ) : (
            <NoGamesFound />
          )}
        </Stack>
      ) : (
        <Box padding={1}>
          <CircularLoading />
        </Box>
      )}
    </StyledBox>
  );
}
