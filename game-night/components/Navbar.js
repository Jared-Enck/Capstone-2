import React, { useState } from "react";
import { 
  AppBar, 
  Tabs, 
  Tab, 
  Container, 
  Typography 
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import TabPanel from "./TabPanel";
import LoginForm from "@/pages/login";
import SignUpForm from "@/pages/signup";

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  main: {
    backgroundColor: theme.palette.common.black,
    height: 75,
    justifyContent: 'between'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: 'inherit'
  },
  // search: {
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   marginRight: theme.spacing(2),
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(3),
  //     width: 'auto',
  //   },
  // },
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
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
    // color: alpha(theme.palette.common.white, 0.80)
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

export default function Navbar() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (evt, newValue) => {

    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.main} position="static">
        <Container className={classes.sectionDesktop} maxWidth="xl">
          <Typography className={classes.title}>
            Game Night
          </Typography>
          <Container maxWidth="sm">
            <Tabs 
              variant="fullWidth"
              value={value}
              indicatorColor="secondary"
              textColor="inherit"
              onChange={handleChange} 
              aria-label="nav tabs"
            >
              <LinkTab label="Login" href="/pages/login" {...a11yProps(0)} />
              <LinkTab label="Sign Up" href="/pages/signup" {...a11yProps(1)} />
            </Tabs>
          </Container>
        </Container>
      </AppBar>
      <TabPanel value={value} index={0}>
        <LoginForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUpForm />
      </TabPanel>
    </div>
  );
};