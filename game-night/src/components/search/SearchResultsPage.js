import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Typography
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Person,
  AccessTime
} from "@mui/icons-material";

export default function SearchResultsPage() {
  const { refinedResults, setGameID, setGame } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(refinedResults)
  }, [])

  const handleCardClick = (gameID, game) => {
    setGameID(gameID);
    setGame(game);
    navigate(`/games/${gameID}`)
  };

  return (
    <>
      <h1>
        Search Results
      </h1>
      <Box justifyContent={"center"}>
        <Grid
          container
          spacing={3}
        >
          {
            refinedResults
              ? (
                refinedResults.map(r =>
                (
                  <Grid item alignitems="flex-start" key={r.id}>
                    <Card sx={{ width: 345, height: 420, backgroundColor: "primary.main" }}>
                      <CardActionArea
                        onClick={() => handleCardClick(r.id, r)}
                      >
                        <CardMedia
                          sx={{
                            objectFit: "fill"
                          }}
                          component={"img"}
                          height={230}
                          image={r.images.large}
                          alt={r.name}
                        />
                        <CardContent sx={{color: "primary.contrastText"}}>
                          <Typography 
                            textAlign={"center"}
                            gutterBottom 
                            variant="h5" 
                            component="div"
                          >
                            {r.name}
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
                            <Grid item alignItems="flex-start">
                              <Person />
                              {r.min_players + " - " + r.max_players}
                            </Grid>
                            <Grid item alignItems="flex-start">
                              <AccessTime />
                              {r.min_playtime + " - " + r.max_playtime}
                            </Grid>
                          </Grid>
                        </CardContent>
                      </CardActionArea>
                      <CardActions sx={{ paddingBottom: "0" }}>
                        <IconButton aria-label="add to collection">
                          <FavoriteBorder sx={{color: "primary.contrastText"}} />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                )
                )
              )
              : null
          }
        </Grid>
      </Box>
    </>
  );
};