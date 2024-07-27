import '@src/Options.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import OptionsPage from '../../popup/src/views/OptionsPage';

const theme = createTheme({
  // Customize your theme here
});

const Options: React.FC = () => {
  console.debug('Options page loaded');
  return (
    <ThemeProvider theme={theme}>
      <div className=".App">
        {/* <EnhancedToolbar /> */}
        {/* <Routing /> */}
        <OptionsPage />
      </div>
    </ThemeProvider>
  );
};

export default withErrorBoundary(withSuspense(Options, <div>Loading...</div>), <div>Error Occur</div>);
