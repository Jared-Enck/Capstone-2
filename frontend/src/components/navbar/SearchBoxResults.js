import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { Box, Stack, useMediaQuery, Typography } from '@mui/material';
import styled from '@emotion/styled';
import DataContext from '../../context/DataContext';
import CircularLoading from '../common/CircularLoading';
import GamesList from './GamesList';
import NoGamesFound from './NoGamesFound';
// import SearchBoxSection from './SearchBoxSection';

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
  const { navigate } = useContext(UserContext);
  // const mechanics = results.foundMechanics || [];
  // const categories = results.foundCategories || [];
  // const games = results.foundGames || [];

  const { setGame, isLoading } = useContext(DataContext);

  // handles SearchBoxSection button click
  // const handleBtnClick = (path, item) => {
  //   // clear prev results and set new header
  //   clearBoxResults();
  //   setResultsHeader(item.name);
  //   setSearchResults({ pages: {} });
  //   navigate(`search/${path}/${item.id}`);
  // };

  // handle game list item click
  const handleGameClick = (gameID) => {
    // sets game and navigates to game details
    setGame('');
    navigate(`/games/${gameID}`);
    clearBoxResults();
  };

  return (
    <StyledBox sx={{ boxShadow: 2 }}>
      {/* {results ? (
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
          
        </Stack>
      ) : (
        <Box padding={1}>
          <CircularLoading />
        </Box>
      )} */}
      {isLoading ? (
        <Box padding={1}>
          <CircularLoading />
        </Box>
      ) : results === -1 ? (
        <NoGamesFound />
      ) : results.length ? (
        <GamesList
          games={results.slice(0, 12)}
          handleGameClick={handleGameClick}
        />
      ) : null}
    </StyledBox>
  );
}
