import React, { useContext } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import PlayersAndDuration from '../common/PlayersAndDuration';
import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material';
import DataContext from '../../context/DataContext';
import UserContext from '../../context/UserContext';

export default function GameCard({ game, onProfilePage, isMediumScreen }) {
  const { setGame, addGame, removeGame } = useContext(DataContext);
  const { currentUser, userGameIDs, navigate } = useContext(UserContext);
  const inCollection = userGameIDs ? userGameIDs.has(game.objectid) : false;
  const name = Array.isArray(game.name)
    ? game.name.filter((n) => n.primary)[0]._text
    : game.name;

  const handleCardClick = () => {
    setGame('');
    navigate(`/games/${game.objectid}`);
  };

  const handleQuickAddClick = () => {
    if (!inCollection) {
      // POST request to server to add game
      addGame(game);
    }
  };

  const handleTrashClick = () => {
    // POST request to server to delete game
    removeGame(game);
  };

  const quickAddBtn = (
    <IconButton
      aria-label='add to collection'
      sx={{ color: 'secondary.main', marginLeft: 'auto' }}
      onClick={handleQuickAddClick}
    >
      {inCollection ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );

  const trashBtn = (
    <IconButton
      aria-label='remove from collection'
      sx={{
        color: 'primary.muted',
        marginLeft: 'auto',
        '&:hover': { color: 'red' },
      }}
      onClick={handleTrashClick}
    >
      <Delete />
    </IconButton>
  );

  return (
    <Card
      sx={{
        margin: 'auto',
        width: isMediumScreen ? '10rem' : '20rem',
        backgroundColor: 'primary.dark',
        transition: 'all 200ms',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          sx={{
            height: isMediumScreen ? '8rem' : '14rem',
            objectFit: 'cover',
            objectPosition: 'top',
          }}
          component={'img'}
          image={game.image}
          alt={name}
        />
        <CardContent sx={{ color: 'secondary.main', padding: 1 }}>
          <Typography
            textAlign={'center'}
            gutterBottom
            variant={isMediumScreen ? 'h6' : 'h5'}
            component='div'
            noWrap
          >
            {name}
          </Typography>
          <Grid
            container
            direction={'row'}
            justifyContent={'space-evenly'}
            sx={{
              color: 'primary.text',
            }}
          >
            <PlayersAndDuration
              min_players={game.minplayers}
              max_players={game.maxplayers}
              min_playtime={game.minplaytime}
              max_playtime={game.maxplaytime}
              isMediumScreen={isMediumScreen}
            />
          </Grid>
        </CardContent>
      </CardActionArea>
      {currentUser ? (
        <CardActions
          disableSpacing
          sx={{ padding: 0 }}
        >
          {!onProfilePage ? quickAddBtn : trashBtn}
        </CardActions>
      ) : null}
    </Card>
  );
}
