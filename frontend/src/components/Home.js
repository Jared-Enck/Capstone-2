import React, { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import DataContext from '../context/DataContext';
import { Stack, Typography, Box, List } from '@mui/material';
import ContentContainer from './common/ContentContainer';
import GamesListItem from './common/GamesListItem';
import CircularLoading from './common/CircularLoading';

export default function Home() {
  const { currentUser, navigate } = useContext(UserContext);
  const { isSmallScreen, hotGames, getHotCache, setGame } =
    useContext(DataContext);

  useEffect(() => {
    if (!hotGames.length && currentUser) getHotCache();
  }, [hotGames.length, currentUser, getHotCache]);

  const hotListDimensions = {
    width: '5rem',
    height: '5rem',
    fontSize: '1.8rem',
  };

  const WelcomeMsgComp = () => {
    return (
      <ContentContainer
        shadow={2}
        alphascale={0.4}
        blur
      >
        <Box
          sx={{
            color: 'primary.text',
            fontSize: '1.2rem',
            width: '95%',
            margin: 'auto',
          }}
        >
          <Typography
            variant={isSmallScreen ? 'h6' : 'h4'}
            gutterBottom
          >
            Welcome to MyGameNights!
          </Typography>
          <p>
            You can browse an extensive library of games by searching for board
            game titles.
          </p>
          <p>
            Create a profile and use MyGameNights to compile a digital library
            of all your games.
          </p>
          <p>
            Your personal collection is now complete with videos and resources
            to jog your memory when you’ve forgotten the rules or to help you
            decide what to play.
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
      </ContentContainer>
    );
  };
  const handleGameClick = (gameID) => {
    setGame('');
    navigate(`/games/${gameID}`);
  };

  const HotGamesComp = () => {
    return (
      <ContentContainer
        shadow={2}
        alphascale={0}
        blur
        header={'Popular Games'}
        divider
      >
        <List>
          {hotGames.length ? (
            hotGames.map((i, idx) => {
              return (
                <GamesListItem
                  key={i.id}
                  item={i}
                  idx={idx}
                  clickFunc={handleGameClick}
                  isLastItem={i === hotGames.length - 1}
                  dimensions={isSmallScreen ? {} : hotListDimensions}
                  isSmallScreen={isSmallScreen}
                  hotListItem
                />
              );
            })
          ) : (
            <CircularLoading />
          )}
        </List>
      </ContentContainer>
    );
  };

  return <Stack>{currentUser ? <HotGamesComp /> : <WelcomeMsgComp />}</Stack>;
}
