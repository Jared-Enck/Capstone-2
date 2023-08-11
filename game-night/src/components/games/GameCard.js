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

export default function GameCard({ game, onProfilePage }) {
  const { setGame, addGame, removeGame } = useContext(DataContext);
  const { currentUser, userGameIDs, navigate } = useContext(UserContext);
  const inCollection = userGameIDs ? userGameIDs.has(game.id) : false;

  const handleCardClick = () => {
    setGame(game);
    navigate(`/games/${game.id}`);
  };

  const handleQuickAddClick = () => {
    if (!inCollection) {
      addGame(game);
    }
  };

  const handleTrashClick = () => {
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
        width: 345,
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
            objectFit: 'fill',
          }}
          component={'img'}
          height={230}
          image={game.images.large || game.image_url}
          alt={game.name}
        />
        <CardContent sx={{ color: 'secondary.main' }}>
          <Typography
            textAlign={'center'}
            gutterBottom
            variant='h5'
            component='div'
            noWrap
          >
            {game.name}
          </Typography>
          <Grid
            container
            direction={'row'}
            justifyContent={'center'}
            spacing={3}
            sx={{
              color: 'primary.text',
            }}
          >
            <PlayersAndDuration
              min_players={game.min_players}
              max_players={game.max_players}
              min_playtime={game.min_playtime}
              max_playtime={game.max_playtime}
            />
          </Grid>
        </CardContent>
      </CardActionArea>
      {currentUser ? (
        <CardActions disableSpacing>
          {!onProfilePage ? quickAddBtn : trashBtn}
        </CardActions>
      ) : null}
    </Card>
  );
}
