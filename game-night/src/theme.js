import '@fontsource/roboto/400.css'
import { createTheme } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: 'Roboto',
    textAlign: 'center'
  }
});

export default theme;