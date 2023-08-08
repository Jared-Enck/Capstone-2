import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, AppBar, Typography, Container } from '@mui/material';
import UserContext from '../../context/UserContext';
import UserAccountMenu from './UserAccountMenu';
import SearchBar from './SearchBar';
import styled from '@emotion/styled';
import AnonUserLinks from './AnonUserLinks';

const StyledGrid = styled(Grid)(() => ({
  gridTemplateRows: 'auto',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  fontSize: '1.2rem',
}));

const Brand = styled(Typography)(({ theme }) => ({
  marginLeft: '2rem',
  fontSize: '1.7rem',
  color: theme.palette.primary.contrastText,
}));

export default function Navbar() {
  const { currentUser } = useContext(UserContext);

  return (
    <AppBar position='fixed'>
      <Container
        sx={{
          height: '3.5rem',
        }}
        maxWidth='xl'
      >
        <StyledGrid container>
          <Link to='/'>
            <Brand>GameNight</Brand>
          </Link>

          <SearchBar />

          {currentUser ? <UserAccountMenu /> : <AnonUserLinks />}
        </StyledGrid>
      </Container>
    </AppBar>
  );
}
