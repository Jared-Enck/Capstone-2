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
} from '@mui/material';
import { ExpandMore, ExpandLess, Add, Check } from '@mui/icons-material';
import PlayersAndDuration from '../common/PlayersAndDuration';
import styled from '@emotion/styled';
import ContentContainer from '../common/ContentContainer';
import CircularLoading from '../common/CircularLoading';

const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText,
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
  const inCollection = userGameIDs ? userGameIDs.has(game.id) : false;
  const [isLoading, setIsLoading] = useState(false);

  const handleDescBtnClick = () => {
    setOpen(!open);
  };

  const handleAddBtnClick = async () => {
    setIsLoading(true);
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
          color='primary.light'
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
      <Box display={'flex'}>
        <Typography
          variant={'h4'}
          sx={{
            color: 'primary.contrastText',
            flex: 1,
          }}
        >
          {game.name}
        </Typography>
        {currentUser
          ? inCollection && !isLoading
            ? AddedBadgeComp()
            : AddButtonComp()
          : null}
      </Box>
      <Grid
        sx={{
          color: 'primary.muted',
          padding: '.3rem',
        }}
        container
        direction={'row'}
        spacing={3}
      >
        <Grid item>{game.year_published}</Grid>
        <PlayersAndDuration
          min_players={game.min_players}
          max_players={game.max_players}
          min_playtime={game.min_playtime}
          max_playtime={game.max_playtime}
        />
      </Grid>
      <Divider />
      <Grid
        container
        direction={'row'}
        padding={'1.2rem'}
      >
        <Grid
          item
          xs={4}
        >
          <img
            width={300}
            height={300}
            src={game.image_url}
            alt={game.name}
          />
        </Grid>
        <Grid
          item
          xs={7}
        >
          {game.description_preview ? (
            game.description_preview.length <= 900 ? (
              <Typography
                sx={{
                  color: 'primary.text',
                }}
              >
                {game.description_preview}
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
                    {game.description_preview}
                  </Typography>
                </Collapse>
                <Button
                  sx={{
                    height: '1.5rem',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.contrastText',
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
    </ContentContainer>
  );
}
