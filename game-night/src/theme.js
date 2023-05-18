import '@fontsource/roboto/400.css'
import { createTheme } from '@mui/material/styles';
import { blue, grey, red, common } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
      light: blue[300],
      dark: blue[700],
      contrastText: common.white
    },
    secondary: {
      main: grey[300],
      light: grey[100],
      dark: grey[500],
      contrastText: common.black
    },
    error: {
      main: red.A400,
    }
  },
});

export default theme;