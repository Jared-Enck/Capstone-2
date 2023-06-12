import '@fontsource/roboto/400.css'
import { createTheme } from '@mui/material/styles';
import { blue, grey, red } from '@mui/material/colors';

export const themeLight = createTheme({
  palette: {
    background: {
      default: grey[200]
    },
    primary: {
      main: grey[50],
      light: blue[200],
      contrastText: blue[50]
    },
    error: {
      main: red.A400,
    }
  },
  shape: {
    borderRadius: 4
  }
});

export const themeDark = createTheme({
  palette: {
    background: {
      default: grey[800]
    },
    primary: {
      main: grey[900],
      light: grey[500],
      contrastText: blue[50]
    },
    error: {
      main: red.A400,
    }
  },
  shape: {
    borderRadius: 6
  }
});
