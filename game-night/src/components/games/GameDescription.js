import React, { useState } from "react";
import {
  Typography,
  Collapse,
  Divider,
  Grid,
  Button,
  Stack
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess
} from "@mui/icons-material";
import ContentContainer from "../common/ContentContainer";
import PlayersAndDuration from "../common/PlayersAndDuration";

export default function GameDescription({ game }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open)
  }
  
  return (
    <ContentContainer>
      <Typography
        variant={"h4"}
        sx={{
          color: "primary.contrastText"
        }}
      >
        {game.name}
      </Typography>
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
          <Stack>
            <Collapse
              in={open}
              collapsedSize={75}
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
              onClick={handleClick}
            >
              {
                open
                  ? <ExpandLess fontSize="large" />
                  : <ExpandMore fontSize="large" />
              }
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </ContentContainer>
  )
};