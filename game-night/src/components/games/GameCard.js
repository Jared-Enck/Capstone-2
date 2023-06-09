import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
  IconButton
} from "@mui/material";
import PlayersAndDuration from "../common/PlayersAndDuration";
import {
  Favorite,
  FavoriteBorder,
  Delete
} from "@mui/icons-material";
import DataContext from "../../context/DataContext";

export default function GameCard({ game, collectionPage }) {
  const {
    setGame,
    userGameIDs,
    addGame,
    removeGame
  } = useContext(DataContext);
  const inCollection = userGameIDs.has(game.id);
  const navigate = useNavigate();

  const handleCardClick = () => {
    setGame(game);
    navigate(`/games/${game.id}`);
  };

  const handleQuickAddClick = () => {
    if (!inCollection) {
      addGame(game);
    };
  };

  const handleTrashClick = () => {
    removeGame(game);
  };

  const quickAddBtn = (
    <IconButton
      aria-label="add to collection"
      sx={{ color: "primary.contrastText", marginLeft: "auto" }}
      onClick={handleQuickAddClick}
    >
      {
        inCollection
          ? <Favorite />
          : <FavoriteBorder />
      }
    </IconButton>
  );

  const trashBtn = (
    <IconButton
      aria-label="remove from collection"
      sx={{ color: "primary.contrastText", marginLeft: "auto" }}
      onClick={handleTrashClick}
    >
      <Delete />
    </IconButton>
  );

  return (
    <Card
      sx={{
        width: 345,
        backgroundColor: "primary.light"
      }}
    >
      <CardActionArea
        onClick={handleCardClick}
      >
        <CardMedia
          sx={{
            objectFit: "fill"
          }}
          component={"img"}
          height={230}
          image={game.images.large || game.image_url}
          alt={game.name}
        />
        <CardContent sx={{ color: "primary.contrastText" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            variant="h5"
            component="div"
            noWrap
          >
            {game.name}
          </Typography>
          <Grid
            container
            direction={"row"}
            justifyContent={"center"}
            spacing={3}
            sx={{
              color: "primary.text"
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
      <CardActions disableSpacing>
        {
          !collectionPage
            ? quickAddBtn
            : trashBtn
        }
      </CardActions>
    </Card>
  );
};