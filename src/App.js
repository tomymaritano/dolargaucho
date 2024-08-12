import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from './routes';
import theme from './theme';
import InstallPrompt from './components/InstallPrompt';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
        <InstallPrompt />
      </Router>
    </ThemeProvider>
  );
}

export default App;
