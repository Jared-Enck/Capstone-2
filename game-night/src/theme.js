import '@fontsource/roboto/400.css';
import { createTheme } from '@mui/material/styles';
import { green, blue, grey, red, common } from '@mui/material/colors';

export const themeLight = createTheme({
  palette: {
    background: {
      default: grey[400],
    },
    primary: {
      main: grey[300],
      light: grey[200],
      text: grey[800],
      muted: grey[500],
      contrastText: blue[800],
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
      contrastText: blue[50],
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
