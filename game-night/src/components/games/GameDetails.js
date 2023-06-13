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
import DetailListItem from "./DetailListItem";

export default function GameDetails({ game }) {

  return (
    <>
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
        
      </List>
    </>
  );
};