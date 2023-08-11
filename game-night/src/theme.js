import '@fontsource/roboto/400.css';
import { createTheme } from '@mui/material/styles';
import {
  green,
  lightBlue,
  blue,
  grey,
  red,
  common,
} from '@mui/material/colors';

export const themeLight = createTheme({
  palette: {
    primary: {
      light: common.white,
      main: '#faf9f6',
      dark: grey[300],
      text: grey[800],
      muted: grey[500],
    },
    secondary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
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
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: blue[500],
        },
        track: {
          opacity: 0.2,
          backgroundColor: grey[500],
        },
      },
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '2rem',
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,0,0,1)',
          outline: '1px solid slategrey',
        },
      },
    },
  },
});

export const themeDark = createTheme({
  palette: {
    primary: {
      light: grey[600],
      main: grey[900],
      dark: grey[800],
      text: grey[200],
      muted: grey[500],
    },
    secondary: {
      main: lightBlue[50],
      dark: lightBlue[100],
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
  components: {
    MuiSwitch: {
      styleOverrides: {
        colorPrimary: {
          '&.Mui-checked': {
            // Controls checked color for the thumb
            color: lightBlue[50],
          },
        },
        track: {
          '.Mui-checked.Mui-checked + &': {
            // Controls checked color for the track
            opacity: 0.7,
            backgroundColor: grey[800],
          },
        },
      },
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '2rem',
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,0,0,1)',
          outline: '1px solid slategrey',
        },
      },
    },
  },
});
