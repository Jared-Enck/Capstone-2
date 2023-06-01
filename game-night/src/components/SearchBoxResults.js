import React, { useState, useContext } from "react";
import { 
  Box,
  Typography,
  Grid,
  Stack,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon
} from "@mui/material";
import DataContext from "../context/DataContext";

export default function SearchBoxResults({anchorEl,setAnchorEl,open,results}) {
  const {
    foundMechanics,
    foundCategories,
    foundGames
  } = results;
  const {setRefinedSearch} = useContext(DataContext);

  const handleClick = (path, id) => {
    setRefinedSearch({path,id})
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      aria-controls={open ? 'search-results' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
    >
      <Menu
        anchorEl={anchorEl}
        id="search-results"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'primary.light',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <Stack spacing={2}>
          <Typography>
            Mechanics
          </Typography>
          <Grid 
            container
            direction={'row'}
            spacing={2}
          >
            {
              foundMechanics
              ? foundMechanics.map(m => (
                <Grid key={m.id} item m={m}>
                  <MenuItem onClick={() => handleClick('mechanics', m.id)}>
                    {m.name}
                  </MenuItem>
                </Grid>
              ))
              : null
            }
          </Grid>
          
        </Stack>
      </Menu>
    </Box>
  );
};