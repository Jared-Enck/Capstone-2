import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container } from '@mui/material';
import UserContext from '../../context/UserContext';
import UserAccountMenu from './UserAccountMenu';
import SearchBar from './SearchBar';
import AnonUserLinks from './AnonUserLinks';
import { StyledGrid, Brand } from '../styled';

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
