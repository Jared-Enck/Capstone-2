import '@fontsource/roboto/400.css';
import { createTheme } from '@mui/material/styles';
import { green, lightBlue, grey, red, common } from '@mui/material/colors';

export const themeLight = createTheme({
  palette: {
    background: {
      default: grey[300],
    },
    primary: {
      main: common.white,
      light: grey[100],
      text: grey[800],
      muted: grey[500],
      contrastText: lightBlue[400],
    },
    success: {
      main: green[500],
    },
    error: {
      main: red.A400,
    },
  },
  shape: {
    borderRadius: 6,
  },
});

export const themeDark = createTheme({
  palette: {
    background: {
      default: common.black,
    },
    primary: {
      main: grey[900],
      light: grey[800],
      text: grey[200],
      muted: grey[500],
      contrastText: lightBlue[50],
    },
    success: {
      main: green['A400'],
    },
    error: {
      main: red.A400,
    },
  },
  shape: {
    borderRadius: 6,
  },
});
