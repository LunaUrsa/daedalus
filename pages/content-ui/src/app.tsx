import { withErrorBoundary, withSuspense } from '@extension/shared';
import { Box, Grid } from '@mui/material';
import '@mui/material/styles';
import useAppContext from '@extension/shared/lib/hooks/useAppContext';
import Toolbar from './components/ScriptToolbar';
import { useWorkbenchLogic } from './hooks/useWorkbenchLogic';
import { useFreshUserOptions } from './hooks/useFreshUserOptions';

const App = () => {
  const { userOptions, setUserOptions } = useAppContext();

  useFreshUserOptions(setUserOptions);

  const mainViewRef = useWorkbenchLogic(userOptions);

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        padding: '5px',
        borderRadius: '8px',
        margin: '5px',
        backgroundColor: '#f9f9f9',
        height: 'calc(100vh - 15px)',
        boxSizing: 'border-box',
      }}>
      <Toolbar editorViewRef={mainViewRef} />
      {/* Editor */}
      <Grid
        container
        direction="row"
        sx={{ width: '100%', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'row' }}
        alignItems="stretch">
        <Grid item id="custom-editor" sx={{ width: '50%', height: '100%' }}>
          <textarea id="newCM" style={{ display: 'none' }}></textarea>
        </Grid>
        <Grid item id="custom-editor2" sx={{ width: '50%', height: '100%' }}>
          <textarea id="newCM2" style={{ display: 'none' }}></textarea>
        </Grid>
        <Grid item id="custom-trace" sx={{ height: '100%' }}></Grid>
      </Grid>
    </Box>
  );
};

export default withErrorBoundary(withSuspense(App, <div> Loading ... </div>), <div> Error Occur </div>);
