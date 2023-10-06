import React, { useState, useContext, useEffect } from 'react';
import DataContext from '../../context/DataContext';
import UserContext from '../../context/UserContext';
import {
  Box,
  Typography,
  Collapse,
  Divider,
  Grid,
  Button,
  Stack,
  ListItem,
  ListItemText,
  Fab,
  CardMedia,
} from '@mui/material';
import { ExpandMore, ExpandLess, Add, Check } from '@mui/icons-material';
import PlayersAndDuration from '../common/PlayersAndDuration';
import styled from '@emotion/styled';
import ContentContainer from '../common/ContentContainer';
import CircularLoading from '../common/CircularLoading';

const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
}));

const AddedBadgeBox = styled(Box)(({ theme }) => ({
  color: theme.palette.success.main,
  display: 'flex',
}));

const PlayersAndDurationGrid = styled(Grid)(({ theme }) => ({
  height: '2rem',
  color: theme.palette.primary.text,
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'space-around',
  },
}));

export default function GameDescription({ game }) {
  const [open, setOpen] = useState(false);
  const { addGame, isSmallScreen } = useContext(DataContext);
  const { currentUser, userGameIDs } = useContext(UserContext);
  const inCollection = userGameIDs ? userGameIDs.has(game.objectid) : false;
  const [isLoading, setIsLoading] = useState(false);
  const showExpandDesc = isSmallScreen ? 300 : 800;

  const handleDescBtnClick = () => {
    setOpen(!open);
    if (open) window.scrollTo({ top: 0 });
  };

  const handleAddBtnClick = async () => {
    setIsLoading(true);
    // POST request to server to add game
    await addGame(game);
    setIsLoading(false);
  };

  const AddButtonComp = () =>
    isSmallScreen ? (
      <Fab
        size='small'
        sx={{
          color: 'secondary.main',
          bgcolor: 'primary.dark',
          alignSelf: 'flex-end',
        }}
        onClick={handleAddBtnClick}
      >
        {isLoading ? (
          <CircularLoading
            size='1rem'
            color='secondary.main'
          />
        ) : (
          <Add />
        )}
      </Fab>
    ) : (
      <AddButton
        variant='text'
        onClick={handleAddBtnClick}
        className='main-button'
      >
        <Add fontSize='small' />

        <Typography paddingRight={1}>Add to collection</Typography>

        {isLoading ? (
          <CircularLoading
            size='1rem'
            color='primary.dark'
          />
        ) : (
          <Box width={'1rem'} />
        )}
      </AddButton>
    );

  const AddedBadgeComp = () => (
    <AddedBadgeBox>
      {isSmallScreen ? (
        <Typography
          sx={{
            alignSelf: 'flex-end',
            display: 'flex',
            padding: '.3rem',
          }}
        >
          <Check />
        </Typography>
      ) : (
        <>
          <Typography margin={1}>In Collection</Typography>
          <Typography padding={'.3rem'}>
            <Check />
          </Typography>
        </>
      )}
    </AddedBadgeBox>
  );

  useEffect(() => {
    const descFrag = document
      .createRange()
      .createContextualFragment(game.description);
    const description = document.getElementById('description');
    description.appendChild(descFrag);
  }, [game.description]);

  return (
    <ContentContainer>
      <Stack spacing={1}>
        <Box display={'flex'}>
          <Typography
            variant={isSmallScreen ? 'h5' : 'h4'}
            sx={{
              color: 'secondary.main',
              flex: 1,
              alignSelf: 'center',
            }}
          >
            {game.name}
          </Typography>
          {currentUser
            ? inCollection
              ? AddedBadgeComp()
              : AddButtonComp()
            : null}
        </Box>
        <PlayersAndDurationGrid
          container
          direction={'row'}
        >
          <Grid item>
            <ListItem sx={{ padding: isSmallScreen ? 0 : null }}>
              <ListItemText>{game.yearpublished}</ListItemText>
            </ListItem>
          </Grid>
          <PlayersAndDuration
            min_players={game.minplayers}
            max_players={game.maxplayers}
            min_playtime={game.minplaytime}
            max_playtime={game.maxplaytime}
            isSmallScreen={isSmallScreen}
          />
        </PlayersAndDurationGrid>
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
          >
            <CardMedia
              component={'img'}
              src={game.image}
              alt={game.name}
              sx={{
                maxWidth: '18rem',
                maxHeight: '18rem',
              }}
            />
          </Grid>
          <Grid
            item
            xs={7}
          >
            {game.description ? (
              <Stack
                spacing={1}
                padding={isSmallScreen ? 1 : 0}
              >
                <Collapse
                  in={open}
                  collapsedSize={isSmallScreen ? '7.8rem' : '18rem'}
                >
                  <Typography
                    id='description'
                    sx={{
                      color: 'primary.text',
                    }}
                  />
                </Collapse>
                {game.description.length > showExpandDesc ? (
                  <Button
                    sx={{
                      height: '1.5rem',
                      color: 'secondary.main',
                      '&:hover': {
                        backgroundColor: 'secondary.main',
                        color: 'primary.main',
                      },
                      alignSelf: 'flex-end',
                    }}
                    variant='text'
                    onClick={handleDescBtnClick}
                  >
                    {open ? (
                      <ExpandLess fontSize='large' />
                    ) : (
                      <ExpandMore fontSize='large' />
                    )}
                  </Button>
                ) : null}
              </Stack>
            ) : null}
          </Grid>
        </Grid>
      </Stack>
    </ContentContainer>
  );
}
