import React, { useState, useContext } from 'react';
import {
  IconButton,
  Drawer,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@mui/material';
import styled from '@emotion/styled';
import { Logout, PersonOutline } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import UserContext from '../../context/UserContext';
import Settings from '../settings/Settings';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '30ch',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.text,
  },
}));

export default function UserAccountMenu() {
  const [open, setOpen] = useState(false);
  const { logout, currentUser, navigate } = useContext(UserContext);

  const handleClick = (event) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleProfile = () => {
    handleClose();
    navigate(`/profile/${currentUser}`);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size='small'
        sx={{ m: 0 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
      >
        <MenuIcon
          sx={{
            padding: 0.7,
            width: 40,
            height: 40,
            color: 'primary.muted',
            '&: hover': {
              color: 'primary.contrastText',
            },
          }}
        />
      </IconButton>
      <StyledDrawer
        anchor={'right'}
        open={open}
        id='account-menu'
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleProfile}
          aria-label='profile'
        >
          <ListItemIcon sx={{ marginRight: 1 }}>
            <PersonOutline fontSize='large' />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <Settings />
        <MenuItem
          onClick={handleLogout}
          aria-label='logout'
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </StyledDrawer>
    </>
  );
}
