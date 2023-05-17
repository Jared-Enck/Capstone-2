import "@fontsource/roboto/400.css"
import { createTheme } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';

// export const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   fallback: ['Helvetica', 'Arial', 'sans-serif'],
// });

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: blue[200],
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
  components: {

  }
});

export default theme;