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
} from "@mui/icons-material";
import UserContext from "../../context/UserContext";
import DataContext from "../../context/DataContext";

export default function GameCard({ game, collectionPage }) {
  const { userGames, } = useContext(UserContext);
  const { setGameID, setGame } = useContext(DataContext);
  const inCollection = userGames.has(game.id);
  const navigate = useNavigate();

  const handleCardClick = (gameID, game) => {
    setGameID(gameID);
    setGame(game);
    navigate(`/games/${gameID}`)
  };

  return (
    <Card
      sx={{
        width: 345,
        backgroundColor: "primary.light"
      }}
    >
      <CardActionArea
        onClick={() => handleCardClick(game.id, game)}
      >
        <CardMedia
          sx={{
            objectFit: "fill"
          }}
          component={"img"}
          height={230}
          image={game.images.large}
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
      {
        !collectionPage
          ? (
            <CardActions>
              <IconButton
                aria-label="add to collection"
                sx={{ color: "primary.contrastText" }}
              >
                {
                  inCollection
                    ? <Favorite />
                    : <FavoriteBorder />
                }
              </IconButton>
            </CardActions>
          )
          : null
      }
    </Card>
  );
};