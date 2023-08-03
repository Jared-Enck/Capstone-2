import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import {
  Stack,
  Switch,
  ListItem,
  ListItemIcon,
  Typography,
  Button,
} from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import styled from '@emotion/styled';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
}));

export default function SettingsList() {
  const { isDark, handleThemeToggle } = useContext(UserContext);
  const [checked, setChecked] = useState(isDark);

  const handleChange = () => {
    handleThemeToggle();
    setChecked(!checked);
  };

  return (
    <Stack
      spacing={3}
      paddingLeft={2}
    >
      <StyledListItem>
        <ListItemIcon
          sx={{ paddingLeft: '.5rem', color: 'primary.contrastText' }}
        >
          {isDark ? <DarkMode /> : <LightMode />}
        </ListItemIcon>
        <Switch
          checked={checked}
          onChange={handleChange}
          sx={{
            marginLeft: 'auto',
            color: 'primary',
          }}
        />
      </StyledListItem>
      <StyledListItem>
        <Link>
          <Typography
            sx={{
              paddingLeft: '.5rem',
              color: 'primary.text',
              '&:hover': {
                color: 'primary.contrastText',
              },
            }}
          >
            Change Password
          </Typography>
        </Link>
      </StyledListItem>
      <StyledListItem>
        <Button
          variant='text'
          sx={{
            marginTop: 3,
            color: 'red',
            '&:hover': { backgroundColor: 'red', color: 'white' },
          }}
        >
          <Typography>Delete Account</Typography>
        </Button>
      </StyledListItem>
    </Stack>
  );
}
