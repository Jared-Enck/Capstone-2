import React, { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";

export default function SearchResultsPage() {
  const { refinedResults } = useContext(DataContext);

  useEffect(() => {
    console.log(refinedResults)
  },[])

  return (
    <>
      <h1>
        Search Results
      </h1>
      <Box>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {
            refinedResults.map(r =>
              (
                <ListItem alignItems="flex-start" key={r.id}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={r.image_url} />
                  </ListItemAvatar>
                  <ListItemText>
                    {r.name}
                  </ListItemText>
                </ListItem>
              )
            )
          }
        </List>
      </Box>
    </>
  );
};