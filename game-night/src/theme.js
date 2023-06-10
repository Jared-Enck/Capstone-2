import '@fontsource/roboto/400.css'
import { createTheme } from '@mui/material/styles';
import { blue, grey, red, common } from '@mui/material/colors';

export const themeLight = createTheme({
  palette: {
    background: {
      default: grey[200]
    },
    primary: {
      main: blue[500],
      light: blue[200],
      contrastText: common.white
    },
    error: {
      main: red.A400,
    }
  }
});

export const themeDark = createTheme({
  palette: {
    background: {
      default: grey[800]
    },
    primary: {
      main: grey[900],
      light: grey[600],
      contrastText: common.white
    },
    error: {
      main: red.A400,
    }
  }
});
