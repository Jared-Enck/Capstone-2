import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import ContentContainer from './common/ContentContainer';

export default function Home() {
  return (
    <Stack sx={{ paddingTop: 10 }}>
      <ContentContainer
        shadow={2}
        alphaScale={0.3}
        blur
      >
        <Box
          sx={{
            color: 'primary.text',
            fontSize: '1.2rem',
            width: 800,
            margin: 'auto',
            textShadow: '2px 1px 1px rgba(0,0,0,.2)',
          }}
        >
          <Typography
            variant='h5'
            gutterBottom
          >
            Welcome to GameNight!
          </Typography>
          <p>
            You can browse an extensive library of games by searching for
            titles, mechanics, or categories.
          </p>
          <p>
            If you’re tired of rummaging through your closets to decide what
            game you want to play, create a profile and use GameNight to compile
            a digital library of all your games. Your personal collection is now
            complete with pictures, videos, and resources to jog your memory
            when you’ve forgotten the rules or to help you decide what to play.
            There’s even an estimated value feature so you can flex on your
            friends!
          </p>
          <p>
            GameNight makes it easy to find new games using a mechanic you love,
            expansions for your tried and true staples, or games built around
            your favorite franchise. (Star Wars anyone?)
          </p>
          <p>
            Click around. Have fun. Build your collection. GameNight has never
            been better.
          </p>
        </Box>
      </ContentContainer>
    </Stack>
  );
}
