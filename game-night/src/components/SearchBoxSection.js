import React from "react";
import {
  Typography,
  Grid,
  List,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar
} from "@mui/material"
import { SearchBoxButton } from "./styled";

export default function SearchBoxSection({
  sectionName = null, 
  items, 
  handleClick
}) {
  const gameItems = (
    <>
      <List
        sx={{ width: 328 }}
      >
        {
          items
          ? items.map(i => (
            
            <ListItemButton 
              alignItems={"flex-start"} 
              key={i.id} 
              sx={{
                padding:" 0", 
                margin: "0",
                fontSize: ".7rem"
              }}
              onClick={() => handleClick("ids", [i.id])}
            >
              <ListItemAvatar>
                <Avatar alt={i.name} src={i.image_url} />
              </ListItemAvatar>
                <ListItemText alignItems={"center"}>
                  {i.name}
                </ListItemText>
            </ListItemButton>
          ))
          : null
        }
      </List>
    </>
  )
  return (
    <>
      {
        sectionName
        ? (
          <>
            <Typography sx={{
              marginLeft: '.3rem',
              textAlign: 'left'
            }}>
              {sectionName}
            </Typography>
            <Grid 
              container
              direction={'row'}
              sx={{
                padding: '0.3rem',
                maxWidth: '328px'
              }}
            >
              {
                items
                ? items.map(i => (
                  <Grid key={i.id} item sx={{padding: 0, margin: 0}}>
                    <SearchBoxButton
                      size="small"
                      onClick={() => handleClick(sectionName.toLowerCase(), i.id)}
                    >
                      {i.name}
                    </SearchBoxButton>
                  </Grid>
                ))
                : null
              }
            </Grid>
          </>
        )
        : gameItems
      }
    </>
  );
};