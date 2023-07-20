import React, { Suspense } from "react";
import {
  List,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar
} from "@mui/material";
import CircularLoading from "../common/CircularLoading";

export default function GamesList({ games, handleGameClick }) {
  const gamesListItem = (item, idx) => (
    <ListItemButton
      alignitems={"flex-start"}
      key={item.id}
      sx={{
        padding: ".3rem .3rem",
        fontSize: ".7rem"
      }}
      onClick={() => handleGameClick(idx, item.id)}
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            height: "2.2rem",
            width: "2.2rem",
            borderRadius: "3px"
          }}
          alt={item.name}
          src={item.images["thumb"]}
        />
      </ListItemAvatar>
      <ListItemText
        color="primary.text"
        sx={{
          alignSelf: "center",
          paddingRight: ".5rem",
          margin: "0",
          marginLeft: "-.3rem",
          color: "primary.text"
        }}
      >
        {item.name}
      </ListItemText>
    </ListItemButton>
  );

  return (
    <List
      sx={{ width: "100%", paddingBottom: "0" }}
    >
      <Suspense fallback={<CircularLoading size={"1.5rem"} />}>
        {
          games.length
            ? games.map((i, idx) => gamesListItem(i, idx))
            : null
        }
      </Suspense>
    </List>
  );
};