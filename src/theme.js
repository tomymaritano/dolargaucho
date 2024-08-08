import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A202C',
    },
    secondary: {
      main: '#282c34',
    },
    terciary: {
        main: '#221122'
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.25rem',
    },
    h6: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
        },
      },
    },
  },
});

export default theme;
