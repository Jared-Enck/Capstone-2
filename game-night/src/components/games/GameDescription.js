import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import {
  Box,
  Typography,
  Collapse,
  Divider,
  Grid,
  Button,
  Stack
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  Add,
  Check
} from "@mui/icons-material";
import ContentContainer from "../common/ContentContainer";
import PlayersAndDuration from "../common/PlayersAndDuration";
import styled from "@emotion/styled";

const AddButton = styled(Button)(({ theme }) => ({
  display: "flex",
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    fontWeight: "bold"
  }
}));

const AddedBadgeBox = styled(Box)(({ theme }) => ({
  color: theme.palette.success.main,
  display: "flex"
}));

export default function GameDescription({ game }) {
  const [open, setOpen] = useState(false);
  const { setGameToAdd, currentUser, userGames } = useContext(UserContext);
  const navigate = useNavigate();
  const inCollection = userGames.has(game.id);

  const handleDescBtnClick = () => {
    setOpen(!open)
  };
  const handleAddBtnClick = () => {
    if (!currentUser) {
      navigate('/login');
    };
    if (!inCollection) {
      console.log("added")
      setGameToAdd({ id: game.id, name: game.name });
      userGames.add(game.id);
    };
  };

  const AddButtonComp = () => (
    <AddButton
      size="medium"
      variant="text"
      onClick={handleAddBtnClick}
    >
      <Add fontSize="small" />
      Add to collection
    </AddButton>
  );

  const AddedBadgeComp = () => (
    <AddedBadgeBox>
      <Typography sx={{textShadow: 1}} margin={1}>
        In Collection
      </Typography>
      <Typography paddingTop={".3rem"} >
        <Check />
      </Typography>
    </AddedBadgeBox>
  );

  return (
    <ContentContainer>
      <Box display={"flex"}>
        <Typography
          variant={"h4"}
          sx={{
            color: "primary.contrastText",
            flex: 1
          }}
        >
          {game.name}
        </Typography>
        {
          inCollection
          ? AddedBadgeComp()
          : AddButtonComp()
        }
      </Box>
      <Grid
        sx={{
          color: "primary.text",
          padding: ".3rem"
        }}
        container
        direction={"row"}
        spacing={3}
      >
        <Grid item>
          {game.year_published}
        </Grid>
        <PlayersAndDuration
          min_players={game.min_players}
          max_players={game.max_players}
          min_playtime={game.min_playtime}
          max_playtime={game.max_playtime}
        />
      </Grid>
      <Divider />
      <Grid container direction={"row"} padding={"1.2rem"}>
        <Grid item xs={4}>
          <img
            width={300}
            height={300}
            src={game.image_url}
          />
        </Grid>
        <Grid item xs={7}>
          {
            game.description_preview
              ?
              game.description_preview.length <= 900
                ? (
                  <Typography sx={{
                    color: "primary.text",
                  }}>
                    {game.description_preview}
                  </Typography>
                )
                : (
                  <Stack>
                    <Collapse
                      in={open}
                      collapsedSize={265}
                    >
                      <Typography sx={{
                        color: "primary.text",
                      }}>
                        {game.description_preview}
                      </Typography>
                    </Collapse>
                    <Button
                      sx={{
                        height: "1.5rem",
                        color: "primary.contrastText",
                        "&:hover": {
                          backgroundColor: "primary.contrastText",
                          color: "primary.main"
                        }
                      }}
                      variant="text"
                      onClick={handleDescBtnClick}
                    >
                      {
                        open
                          ? <ExpandLess fontSize="large" />
                          : <ExpandMore fontSize="large" />
                      }
                    </Button>
                  </Stack>
                )
              : null
          }
        </Grid>
      </Grid>
    </ContentContainer>
  )
};