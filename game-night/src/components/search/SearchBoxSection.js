import React from "react";
import {
  Typography,
  Grid
} from "@mui/material"
import { SearchBoxButton } from "../styled";

export default function SearchBoxSection({
  sectionName = null, 
  items, 
  handleClick
}) {
  return (
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
  );
};