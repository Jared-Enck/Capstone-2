import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Stack, Typography, Box } from '@mui/material';
import ContentContainer from './common/ContentContainer';

export default function Home() {
  const { currentUser } = useContext(UserContext);
  return (
    <Stack sx={{ paddingTop: 10 }}>
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
            variant='h5'
            gutterBottom
          >
            {currentUser
              ? `Welcome back, ${currentUser}!`
              : 'Welcome to MyGameNights!'}
          </Typography>
          <p>
            You can browse an extensive library of games by searching for game
            titles, mechanics, or categories.
          </p>
          <p>
            Create a profile and use MyGameNights to compile a digital library
            of all your games. Your personal collection is now complete with
            pictures, videos, and resources to jog your memory when you’ve
            forgotten the rules or to help you decide what to play. There’s even
            an estimated value feature so you can flex on your friends!
          </p>
          <p>
            MyGameNights makes it easy to find new games using a mechanic you
            love, expansions for your tried and true staples, or games built
            around your favorite franchise. (Star Wars anyone?)
          </p>
          <p>
            Click around. Have fun. Build your collection. Game night has never
            been better.
          </p>
        </Box>
      </ContentContainer>
    </Stack>
  );
}
