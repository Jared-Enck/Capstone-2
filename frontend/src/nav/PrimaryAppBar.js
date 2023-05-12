import React, { useContext, useState, useEffect } from 'react';
import { Link, resolvePath, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import useWindowDimensions from '../hooks/useWindowDimensions'
import AnonNavLinks from './AnonNavLinks';
import LoggedInNavLinks from './LoggedInNavLinks';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import UserAccountCircle from '../user/UserAccountCircle';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  main: {
    backgroundColor: alpha(theme.palette.common.black, 0.85),
    height: 75,
    justifyContent: 'center'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: 'inherit'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  appBarLink: {
    display: 'grid',
    justifyContent: 'center',
    textDecoration: 'none',
    textAlign: 'center',
    color: alpha(theme.palette.common.white, 0.80)
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimaryAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const {currentUser,logout} = useContext(UserContext);
  const isMenuOpen = Boolean(anchorEl);

  const {windowSize} = useWindowDimensions();
  const isSmallWindow = windowSize.width < 800;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) console.log(currentUser);
  },[]);

  const handleProfileMenuOpen = (evt) => {
    setAnchorEl(evt.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate(`users/${currentUser.username}`);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const renderUserAccountCircle = () => {
    return (
      <div className={classes.grow}>
        <div className={classes.sectionDesktop}>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <UserAccountCircle 
              imageURL={currentUser.imageURL} 
            />
          </IconButton>
        </div>
      </div>
    );
  };

  const getLoggedInLinks = () => {
    return (
      <>
        {renderUserAccountCircle()}
        <LoggedInNavLinks 
          isSmallWindow={isSmallWindow} 
          classes={classes.appBarLink} 
        />
      </>
    )
  }

  return (
    <div className={classes.grow}>
      <AppBar className={classes.main} position="static">
        <Toolbar className="container-sm">
          <Typography className={classes.title} variant="h6" noWrap>
            <Link
              to='/'
              className={classes.appBarLink}
            >
              Game Night
            </Link>
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Grid spacing={3}>
            {
              currentUser
                ? getLoggedInLinks()
                : (
                  <AnonNavLinks 
                    isSmallWindow={isSmallWindow}
                    classes={classes.appBarLink}
                  />
                )
            }
          </Grid>            
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};