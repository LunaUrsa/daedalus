import '@src/Popup.css';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EnhancedToolbar from './components/Toolbar';
import { Routing } from './routes';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import useAppContext from '@extension/shared/lib/hooks/useAppContext';

const theme = createTheme({
  // Customize your theme here
});

const Popup = () => {
  const { currentPage } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();
  console.debug('popup page loaded');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (currentPage && params.get('popup') !== 'true') {
      navigate(currentPage);
    }
  }, [currentPage, location.search, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <div className=".App">
        <EnhancedToolbar />
        <Routing />
      </div>
    </ThemeProvider>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
