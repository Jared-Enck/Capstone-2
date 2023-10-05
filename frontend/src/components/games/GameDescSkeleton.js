import React, { useContext } from 'react';
import DataContext from '../../context/DataContext';
import {
  Stack,
  Grid,
  Divider,
  Typography,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import styled from '@emotion/styled';
import BaseSkeleton from '../common/BaseSkeleton';
import ContentContainer from '../common/ContentContainer';

const PDSkelGrid = styled(Grid)(({ theme }) => ({
  height: '2rem',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'space-around',
  },
}));

export default function GameDescSkeleton() {
  const { isSmallScreen } = useContext(DataContext);

  const genSkelDesc = () => {
    const skels = [];
    const numSkels = isSmallScreen ? 5 : 9;
    const firstBreak = isSmallScreen ? 2 : 3;
    const secondBreak = isSmallScreen ? null : 6;

    for (let i = 0; i < numSkels; i++) {
      const skelWidth = Math.floor(Math.random() * (100 - 90) + 90);
      if (i === firstBreak || i === secondBreak) {
        skels.push(<Box height={isSmallScreen ? '1rem' : '1.5rem'} />);
      } else {
        skels.push(
          <BaseSkeleton
            width={`${skelWidth}%`}
            height={isSmallScreen ? '1rem' : '1.5rem'}
          />
        );
      }
    }
    return skels;
  };
  return (
    <ContentContainer>
      <Stack spacing={1}>
        <Typography>
          <BaseSkeleton
            width='70%'
            height={isSmallScreen ? '2rem' : '2.624rem'}
          />
        </Typography>
        <PDSkelGrid
          container
          direction={'row'}
        >
          {['', '', ''].map((i, idx) => (
            <Grid
              item
              key={idx}
              display={'flex'}
              alignItems={'flex-end'}
            >
              <ListItem>
                <BaseSkeleton
                  width={isSmallScreen ? '4rem' : '4.816rem'}
                  height={isSmallScreen ? '1.5rem' : '1.7rem'}
                />
              </ListItem>
            </Grid>
          ))}
        </PDSkelGrid>
        <Divider sx={{ bgcolor: 'primary.dark' }} />
        <Grid
          container
          direction={isSmallScreen ? 'column' : 'row'}
          justifyContent={isSmallScreen ? 'center' : 'space-around'}
        >
          <Grid
            item
            display={'flex'}
            justifyContent={'center'}
            width={isSmallScreen ? '100%' : 'none'}
          >
            <BaseSkeleton
              width='18rem'
              height='18rem'
            />
          </Grid>
          <Grid
            item
            xs={7}
          >
            <Stack
              spacing={1}
              padding={isSmallScreen ? 1 : 0}
            >
              {genSkelDesc().map((i, idx) => (
                <div key={idx}>{i}</div>
              ))}
              <Box height='2.188rem' />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </ContentContainer>
  );
}
