import React, { useState, useContext } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon
} from "@mui/material";
import {
  Settings,
  Logout
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import UserContext from "../../context/UserContext";
import DataContext from "../../context/DataContext";

export default function UserAccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout, currentUser, navigate } = useContext(UserContext);
  const { clearUserGameData } = useContext(DataContext);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate(`/profile/${currentUser}`);
  };
  const handleSettings = () => {

  };

  const handleLogout = () => {
    clearUserGameData();
    logout();
    navigate('/');
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ m: 0 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <MenuIcon sx={{ width: 32, height: 32 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1,
              backgroundColor: 'primary.light',
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                bgcolor: 'primary.main'
              },
              '&:before': {
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'primary.contrastText',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={handleProfile}
          aria-label="profile"
        >
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleSettings}
          aria-label="open settings drawer"
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          aria-label="logout"
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}