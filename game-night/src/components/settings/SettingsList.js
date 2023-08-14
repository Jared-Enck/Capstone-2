import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import {
  Stack,
  Switch,
  ListItem,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import DeleteDialog from './DeleteDialog';

export default function SettingsList() {
  const { isDark, handleThemeToggle } = useContext(UserContext);
  const [checked, setChecked] = useState(isDark);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    // light/dark theme toggle
    handleThemeToggle();
    setChecked(!checked);
  };

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Stack
      spacing={3}
      paddingLeft={2}
    >
      <ListItem>
        <ListItemIcon sx={{ color: 'secondary.main' }}>
          {isDark ? <DarkMode /> : <LightMode />}
        </ListItemIcon>
        <Switch
          checked={checked}
          onChange={handleToggle}
          sx={{
            marginLeft: 'auto',
          }}
        />
      </ListItem>

      <ListItem>
        <Link onClick={handleDeleteClick}>
          <Typography
            sx={{
              color: 'rgb(200,0,0)',
              '&:hover': {
                color: 'red',
              },
            }}
          >
            Delete Account
          </Typography>
        </Link>
        <DeleteDialog
          open={open}
          handleCloseDialog={handleCloseDialog}
        />
      </ListItem>
    </Stack>
  );
}
