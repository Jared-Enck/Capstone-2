import '@fontsource/roboto/400.css'
import { createTheme } from '@mui/material/styles';
import { blue, grey, red } from '@mui/material/colors';

export const themeLight = createTheme({
  palette: {
    background: {
      default: grey[300]
    },
    primary: {
      main: grey[100],
      light: blue[200],
      text: grey[800],
      contrastText: blue[500]
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
      light: grey[400],
      text: grey[200],
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
