import React from "react";
import {
  Typography,
  Collapse,
  Divider,
  Grid,
  Button,
  Container,
  Stack,
  List,
  ListItem
} from "@mui/material";

export default function GameDetails({ game }) {
  return (
    <Container maxWidth={"lg"} >
      <Typography
        variant={"h5"}
        sx={{
          color: "primary.contrastText",
          padding: ".3rem"
        }}
      >
        Details
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <Typography>
            
          </Typography>
        </ListItem>
      </List>
    </Container>
  );
};