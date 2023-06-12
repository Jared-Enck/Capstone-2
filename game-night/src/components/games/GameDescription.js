import React, { useState } from "react";
import {
  Typography,
  Collapse,
  Divider,
  Grid,
  Button,
  Container,
  Stack
} from "@mui/material";
import {
  Person,
  AccessTime,
  ExpandMore,
  ExpandLess
} from "@mui/icons-material";

export default function GameDescription({ game }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open)
  }
  
  return (
    <Container maxWidth={"lg"}>
      <Typography
        variant={"h4"}
        sx={{
          color: "primary.contrastText",
          paddingTop: "1rem"
        }}
      >
        {game.name}
      </Typography>
      <Grid
        sx={{
          color: "primary.light",
          padding: ".3rem"
        }}
        container
        direction={"row"}
        spacing={3}
      >
        <Grid item>
          {game.year_published}
        </Grid>
        <Grid item alignItems="flex-start">
          <Person />
          {game.min_players + " - " + game.max_players}
        </Grid>
        <Grid item alignItems="flex-start">
          <AccessTime />
          {game.min_playtime + " - " + game.max_playtime}
        </Grid>
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
                color: "primary.light",
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
    </Container>
  )
};