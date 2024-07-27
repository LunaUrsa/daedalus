import '@src/SidePanel.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EnhancedToolbar from '../../popup/src/components/Toolbar';
import { Routing } from '../../popup/src/routes';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import useAppContext from '@extension/shared/lib/hooks/useAppContext';

const theme = createTheme({
  // Customize your theme here
});

const SidePanel = () => {
  console.debug('Side panel loaded');

  const { currentPage } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentPage) {
      navigate(currentPage);
    }
  }, [currentPage, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <div className=".App">
        <EnhancedToolbar />
        <Routing />
      </div>
    </ThemeProvider>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
