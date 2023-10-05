import React, { useContext, useState } from 'react';
import { AppBar, Container } from '@mui/material';
import UserContext from '../../context/UserContext';
import DataContext from '../../context/DataContext';
import UserAccountMenu from './UserAccountMenu';
import SearchBar from './SearchBar';
import AnonUserLinks from './AnonUserLinks';
import { StyledGrid } from '../styled';
import Brand from './Brand';
import SearchDialog from './SearchDialog';

export default function Navbar() {
  const { currentUser } = useContext(UserContext);
  const { isSmallScreen } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  return (
    <AppBar position='fixed'>
      <Container
        sx={{
          height: '3.5rem',
        }}
        maxWidth='lg'
      >
        <StyledGrid container>
          <Brand />

          {isSmallScreen ? (
            <SearchDialog
              open={open}
              setOpen={setOpen}
            />
          ) : (
            <SearchBar />
          )}

          {currentUser ? <UserAccountMenu /> : <AnonUserLinks />}
        </StyledGrid>
      </Container>
    </AppBar>
  );
}
