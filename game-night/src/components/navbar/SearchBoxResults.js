import React, { useContext, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Divider, Typography } from '@mui/material';
import styled from '@emotion/styled';
import DataContext from '../../context/DataContext';
import UserContext from '../../context/UserContext';
import CircularLoading from '../common/CircularLoading';

const SearchBoxSectionComp = lazy(() => import('./SearchBoxSection'));

const GamesListComp = lazy(() => import('./GamesList'));

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: '.3rem',
  width: '100%',
  backgroundColor: theme.palette.primary.light,
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

  const { setGame, setResultsHeader, setSearchResults } =
    useContext(DataContext);

  const { isLoading } = useContext(UserContext);

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
          paddingLeft: '2rem',
        }}
      >
        No results found.
      </Typography>
    );
  };

  return (
    <StyledBox sx={{ boxShadow: 2 }}>
      <Stack>
        {mechanics.length ? (
          <SearchBoxSectionComp
            sectionName={'Mechanics'}
            items={mechanics}
            handleClick={handleBtnClick}
          />
        ) : null}
        {categories.length ? (
          <SearchBoxSectionComp
            sectionName={'Categories'}
            items={categories}
            handleClick={handleBtnClick}
          />
        ) : null}
        {mechanics.length || categories.length ? <Divider /> : null}
        {isLoading ? (
          <CircularLoading />
        ) : games.length ? (
          <GamesListComp
            games={games.slice(0, 10)}
            handleGameClick={handleGameClick}
          />
        ) : (
          <NoGamesFound />
        )}
      </Stack>
    </StyledBox>
  );
}
