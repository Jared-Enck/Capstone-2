import React, { Suspense } from "react";
import {
  List,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar
} from "@mui/material";
import CircularLoading from "../common/CircularLoading";

export default function GamesList({ items, handleGameClick }) {
  return (
    <List
      sx={{ width: "100%" }}
    >
      <Suspense fallback={<CircularLoading size={"1.5rem"} />}>
        {
          items.length
            ? items.map((i, idx) => (
              <ListItemButton
                alignitems={"flex-start"}
                key={i.id}
                sx={{
                  padding: ".3rem .3rem",
                  fontSize: ".7rem"
                }}
                onClick={() => handleGameClick(idx, i.id)}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      height: "2.2rem",
                      width: "2.2rem",
                      borderRadius: "3px"
                    }}
                    alt={i.name}
                    src={i.images["thumb"]}
                  />
                </ListItemAvatar>
                <ListItemText sx={{
                  alignSelf: "center",
                  paddingRight: ".5rem",
                  margin: "0",
                  marginLeft: "-.3rem",
                  color: "primary.text"
                }}>
                  {i.name}
                </ListItemText>
              </ListItemButton>
            ))
            : null
        }
      </Suspense>
    </List>
  );
};