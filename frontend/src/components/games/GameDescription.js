import React, { useState, useContext } from 'react';
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

export default function GameDescription({ game }) {
  const [open, setOpen] = useState(false);
  const { addGame } = useContext(DataContext);
  const { currentUser, userGameIDs } = useContext(UserContext);
  const inCollection = userGameIDs ? userGameIDs.has(game.objectid) : false;
  const [isLoading, setIsLoading] = useState(false);

  const handleDescBtnClick = () => {
    setOpen(!open);
  };

  const handleAddBtnClick = async () => {
    setIsLoading(true);
    // POST request to server to add game
    await addGame(game);
    setIsLoading(false);
  };

  const AddButtonComp = () => (
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
      <Typography margin={1}>In Collection</Typography>
      <Typography padding={'.3rem'}>
        <Check />
      </Typography>
    </AddedBadgeBox>
  );
  return (
    <ContentContainer>
      <Stack spacing={1}>
        <Box display={'flex'}>
          <Typography
            variant={'h4'}
            sx={{
              color: 'secondary.main',
              flex: 1,
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
        <Grid
          sx={{
            color: 'primary.text',
          }}
          container
          direction={'row'}
          height={'2rem'}
        >
          <Grid item>
            <ListItem
              disableGutters
              sx={{ marginRight: 2 }}
            >
              <ListItemText>{game.yearpublished}</ListItemText>
            </ListItem>
          </Grid>
          <PlayersAndDuration
            min_players={game.minplayers}
            max_players={game.maxplayers}
            min_playtime={game.minplaytime}
            max_playtime={game.maxplaytime}
          />
        </Grid>
        <Divider sx={{ color: 'primary.muted' }} />
        <Grid
          container
          direction={'row'}
        >
          <Grid
            item
            xs={4}
          >
            <img
              width={300}
              height={300}
              src={game.image}
              alt={game.name}
            />
          </Grid>
          <Grid
            item
            xs={7}
          >
            {game.description ? (
              game.description.length < 900 ? (
                <Typography
                  sx={{
                    color: 'primary.text',
                  }}
                >
                  {game.description}
                </Typography>
              ) : (
                <Stack>
                  <Collapse
                    in={open}
                    collapsedSize={265}
                  >
                    <Typography
                      sx={{
                        color: 'primary.text',
                      }}
                    >
                      {game.description}
                    </Typography>
                  </Collapse>
                  <Button
                    sx={{
                      height: '1.5rem',
                      color: 'secondary.main',
                      '&:hover': {
                        backgroundColor: 'secondary.main',
                        color: 'primary.main',
                      },
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
                </Stack>
              )
            ) : null}
          </Grid>
        </Grid>
      </Stack>
    </ContentContainer>
  );
}
