import React, { useState, useContext } from 'react';
import {
  Grid,
  IconButton,
  Drawer,
  MenuItem,
  Divider,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import { Logout, Person } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import UserContext from '../../context/UserContext';
import Settings from '../settings/Settings';
import { StyledIcon } from '../common/styled';

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
    <Grid
      item
      sx={{ display: 'flex', width: '171px' }}
    >
      <IconButton
        onClick={handleClick}
        size='small'
        sx={{ margin: 'auto' }}
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
          <Person
            fontSize='large'
            sx={{ color: 'primary.muted', marginRight: 1 }}
          />
          <Typography fontSize={'1.2rem'}>Profile</Typography>
        </MenuItem>
        <Divider />
        <Settings />
        <MenuItem
          onClick={handleLogout}
          aria-label='logout'
        >
          <StyledIcon>
            <Logout />
          </StyledIcon>
          Logout
        </MenuItem>
      </StyledDrawer>
    </Grid>
  );
}
