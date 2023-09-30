import React, { useContext, useState } from 'react';
import { AppBar, Container } from '@mui/material';
import UserContext from '../../context/UserContext';
import UserAccountMenu from './UserAccountMenu';
import SearchBar from './SearchBar';
import AnonUserLinks from './AnonUserLinks';
import { StyledGrid } from '../styled';
import Brand from './Brand';
import SearchDialog from './SearchDialog';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Navbar() {
  const { currentUser } = useContext(UserContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
