import React, { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import DataContext from '../context/DataContext';
import { Stack, Typography, Box, Grid } from '@mui/material';
import ContentContainer from './common/ContentContainer';
import GamesListItem from './common/GamesListItem';
import CircularLoading from './common/CircularLoading';

export default function Home() {
  const { currentUser, navigate } = useContext(UserContext);
  const { hotGames, getHotCache, setGame } = useContext(DataContext);

  useEffect(() => {
    if (!hotGames.length && currentUser) getHotCache();
  }, [hotGames.length, currentUser, getHotCache]);

  const WelcomeMsg = () => {
    return (
      <Box
        sx={{
          color: 'primary.text',
          fontSize: '1.2rem',
          width: '95%',
          margin: 'auto',
        }}
      >
        <Typography
          variant='h5'
          gutterBottom
        >
          Welcome to MyGameNights!
        </Typography>
        <p>
          You can browse an extensive library of games by searching for board
          game titles.
        </p>
        <p>
          Create a profile and use MyGameNights to compile a digital library of
          all your games. Your personal collection is now complete with videos
          and resources to jog your memory when you’ve forgotten the rules or to
          help you decide what to play.
        </p>
        {/* <p>
          MyGameNights makes it easy to find new games using a mechanic you
          love, expansions for your tried and true staples, or games built
          around your favorite franchise. (Star Wars anyone?)
        </p> */}
        <p>
          Click around. Have fun. Build your collection. Game night has never
          been better.
        </p>
      </Box>
    );
  };
  const handleGameClick = (gameID) => {
    setGame('');
    navigate(`/games/${gameID}`);
  };
  const HotGames = () => {
    return (
      <>
        <Grid
          container
          direction={'column'}
          spacing={1}
        >
          <Grid item>
            <Typography
              variant='h4'
              sx={{ color: 'secondary.main' }}
            >
              Popular Games
            </Typography>
          </Grid>
          {hotGames.length ? (
            hotGames.map((i, idx) => {
              return (
                <Grid
                  item
                  key={i.id}
                >
                  <GamesListItem
                    item={i}
                    idx={idx}
                    clickFunc={handleGameClick}
                    isLastItem={i === hotGames.length - 1}
                    dimensions={{ width: '8ch', height: '8ch', fontSize: 'h4' }}
                    homepage
                  />
                </Grid>
              );
            })
          ) : (
            <CircularLoading />
          )}
        </Grid>
      </>
    );
  };
  return (
    <Stack sx={{ paddingTop: 10 }}>
      <ContentContainer
        shadow={2}
        alphascale={0.4}
        blur
      >
        {currentUser ? <HotGames /> : <WelcomeMsg />}
      </ContentContainer>
    </Stack>
  );
}
