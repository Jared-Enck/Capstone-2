import '@fontsource/roboto/400.css'
import { createTheme } from '@mui/material/styles';
import { green, blue, grey, red } from '@mui/material/colors';

export const themeLight = createTheme({
  palette: {
    background: {
      default: grey[300]
    },
    primary: {
      main: grey[200],
      light: grey[100],
      text: grey[800],
      muted: grey[500],
      contrastText: blue[800]
    },
    success: {
      main: green[300]
    },
    error: {
      main: red.A400,
    }
  },
  shape: {
    borderRadius: 6
  }
});

export const themeDark = createTheme({
  palette: {
    background: {
      default: grey[900]
    },
    primary: {
      main: grey[800],
      light: grey[700],
      text: grey[200],
      muted: grey[500],
      contrastText: blue[50]
    },
    success: {
      main: green[400]
    },
    error: {
      main: red.A400,
    }
  },
  shape: {
    borderRadius: 6
  }
});
