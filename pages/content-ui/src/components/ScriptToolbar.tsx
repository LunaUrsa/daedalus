import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography
} from '@mui/material';
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  PlayArrow,
  Clear,
  Code,
  Functions,
  Api,
  Search,
  // Fullscreen,
  DashboardCustomize,
  CallSplit,
  CancelPresentation,
  // FullscreenExit,
} from '@mui/icons-material';
import '@mui/material/styles';
import {
  handleRunClick,
  handleModeChange,
  handlePythonClick,
  handleAliasClick,
  handleApiClick,
  handleApiExplorerClick,
  handleTraceClearClick,
  handleCustomClick,
  handleAlwaysClearTraces,
} from '../util/scriptWorkbench';
import { useEffect, useRef, useState } from 'react';
// import useAppContext from '@chrome-extension-boilerplate/shared/lib/hooks/useAppContext';
import {
  handleFoldClick,
  // handleFullScreenClick,
  handleSplitScreenClick,
} from '../util/codeMirror';
import { EditorView } from '@codemirror/view';
import { defaultUserPreferences } from '@chrome-extension-boilerplate/shared/lib/constants';

interface ToolbarProps {
  editorViewRef: React.MutableRefObject<EditorView | null>;
}

const Toolbar: React.FC<ToolbarProps> = ({ editorViewRef }) => {
  // const { userOptions, setUserOptions } = useAppContext();
  const [userOptions, setUserOptions] = useState<UserOptions>(defaultUserPreferences);
  // console.log('toolbar userOptions:', userOptions.workbenchIsSplit);
  const scriptToolbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // console.log('Script Toolbar Loaded');
    scriptToolbarRef.current = document.querySelector('.script-toolbar') as HTMLElement;
    chrome.storage.local.get('userOptions', result => {
      if (result.userOptions) {
        const storedUserOptions = JSON.parse(result.userOptions);
        setUserOptions(storedUserOptions);
      }
    });
  }, [setUserOptions]);

  const [isFolded, setIsFolded] = useState<boolean>(false);
  const [alwaysClearTraces, setAlwaysClearTraces] = useState<boolean>(userOptions.workbenchAlwaysClearTraces || true);
  // const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [scriptingMode, setScriptingMode] = useState<ScriptingModes>(userOptions.scriptingMode || 'Default');

  useEffect(() => {
    const splitEditor = document.getElementById('custom-editor2') as HTMLElement;
    const traceEditor = document.getElementById('custom-trace') as HTMLElement;

    if (userOptions.workbenchIsSplit) {
      splitEditor.style.display = 'block';
      traceEditor.style.width = '100%';
    } else {
      splitEditor.style.display = 'none';
      traceEditor.style.width = '50%';
    }
  }, [userOptions.workbenchIsSplit]);

  const buttonRun = () => (
    <Button
      onClick={e => handleRunClick(e, scriptToolbarRef, userOptions)}
      tabIndex={0}
      variant="contained"
      color="primary"
      sx={{
        height: '30px',
        padding: '0 16px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        lineHeight: 'normal',
        fontSize: '14px',
      }}
      startIcon={<PlayArrow />}>
      <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Run</Typography>
    </Button>
  );

  const switchMode = () => (
    <FormControl variant="outlined" sx={{ minWidth: '120px', fontSize: '14px' }}>
      <InputLabel id="modePickSlctLabel">Mode</InputLabel>
      <Select
        labelId="modePickSlctLabel"
        id="modePickSlct"
        value={scriptingMode}
        onChange={e => handleModeChange(e, scriptToolbarRef, setScriptingMode, userOptions, setUserOptions)}
        label="Mode"
        sx={{
          height: '30px',
          fontSize: '14px',
        }}
        MenuProps={{
          MenuListProps: {
            sx: {
              padding: '0px',
            },
          },
        }}>
        <MenuItem key="standard" value="Standard">
          Standard
        </MenuItem>
        <MenuItem key="test" value="Test">
          Test
        </MenuItem>
      </Select>
    </FormControl>
  );

  const buttonClearTraces = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'secondary.main',
        borderRadius: '5px',
        padding: '0 8px',
      }}
    >
      <Button
        onClick={handleTraceClearClick}
        tabIndex={0}
        variant="contained"
        color="secondary"
        sx={{
          height: '30px',
          padding: '0 8px',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          lineHeight: 'normal',
          fontSize: '14px',
          boxShadow: 'none',
          textTransform: 'none',
          minWidth: 'auto',
        }}
        startIcon={<Clear />}
      >
        <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>
          Clear Traces
        </Typography>
      </Button>
      <Tooltip title="Clear traces on every run">
        <Checkbox
          checked={alwaysClearTraces}
          onChange={() => handleAlwaysClearTraces(setAlwaysClearTraces)}
          sx={{
            color: 'white',
            '&.Mui-checked': {
              color: 'white',
            },
            padding: 0,
            marginLeft: 1,
          }}
        />
      </Tooltip>
    </Box>
  );

  const buttonFold = () => (
    <Button
      onClick={() => handleFoldClick(setIsFolded, editorViewRef)}
      tabIndex={0}
      variant="outlined"
      sx={{
        height: '30px',
        padding: '0 16px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        lineHeight: 'normal',
        fontSize: '14px',
      }}
      startIcon={isFolded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}>
      <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>
        {isFolded ? 'Unfold Code' : 'Fold Code'}
      </Typography>
    </Button>
  );

  // const buttonFullscreen = () => (
  //   <Button
  //     onClick={() => handleFullScreenClick(setIsFullscreen)}
  //     tabIndex={0}
  //     variant="outlined"
  //     sx={{
  //       height: '30px',
  //       padding: '0 16px',
  //       borderRadius: '5px',
  //       display: 'flex',
  //       alignItems: 'center',
  //       lineHeight: 'normal',
  //       fontSize: '14px',
  //     }}
  //     startIcon={isFullscreen ? <FullscreenExit /> : <Fullscreen />}
  //   >
  //     <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>
  //       {isFullscreen ? 'Normal View' : 'Full Screen'}
  //     </Typography>
  //   </Button>
  // )

  const buttonSplitScreen = () => (
    <Button
      onClick={() => handleSplitScreenClick(userOptions, setUserOptions)}
      tabIndex={0}
      variant="outlined"
      sx={{
        height: '30px',
        padding: '0 16px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        lineHeight: 'normal',
        fontSize: '14px',
      }}
      startIcon={userOptions.workbenchIsSplit ? <CancelPresentation /> : <CallSplit />}>
      <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>
        {userOptions.workbenchIsSplit ? 'Single Editor' : 'Split Editor'}
      </Typography>
    </Button>
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toolbarHelpButtons = () => (
    <Grid item sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
      <Button
        onClick={handleCustomClick}
        tabIndex={0}
        variant="outlined"
        sx={{
          height: '30px',
          padding: '0 8px',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          lineHeight: 'normal',
          fontSize: '12px',
          backgroundColor: '#e0e0e0',
        }}
        startIcon={<DashboardCustomize />}>
        <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Custom</Typography>
      </Button>
      <Button
        onClick={handlePythonClick}
        tabIndex={0}
        variant="outlined"
        sx={{
          height: '30px',
          padding: '0 8px',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          lineHeight: 'normal',
          fontSize: '12px',
          backgroundColor: '#e0e0e0',
        }}
        startIcon={<Code />}>
        <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Python</Typography>
      </Button>
      <Button
        onClick={handleAliasClick}
        tabIndex={0}
        variant="outlined"
        sx={{
          height: '30px',
          padding: '0 8px',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          lineHeight: 'normal',
          fontSize: '12px',
          backgroundColor: '#e0e0e0',
        }}
        startIcon={<Functions />}>
        <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Alias</Typography>
      </Button>
      <Button
        onClick={handleApiClick}
        tabIndex={0}
        variant="outlined"
        sx={{
          height: '30px',
          padding: '0 8px',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          lineHeight: 'normal',
          fontSize: '12px',
          backgroundColor: '#e0e0e0',
        }}
        startIcon={<Api />}>
        <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>API</Typography>
      </Button>
      <Button
        onClick={handleApiExplorerClick}
        tabIndex={0}
        variant="outlined"
        sx={{
          height: '30px',
          padding: '0 8px',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          lineHeight: 'normal',
          fontSize: '12px',
          backgroundColor: '#e0e0e0',
        }}
        startIcon={<Search />}>
        <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Explorer</Typography>
      </Button>
    </Grid>
  );

  const isWorkbench = window.location.href.includes('ScriptWorkbench');
  // const isGlobalScripts = window.location.href.includes('global-scripts');

  return (
    <Grid container direction="row" spacing={2} alignItems="center" sx={{ paddingBottom: '10px' }}>
      <Grid item sx={{ display: 'flex', gap: 1 }}>
        {isWorkbench && buttonRun()}
        {isWorkbench && switchMode()}
        {isWorkbench && buttonClearTraces()}
        {buttonFold()}
        {/* {isWorkbench && buttonFullscreen()} */}
        {isWorkbench && buttonSplitScreen()}
      </Grid>
      {/* {isWorkbench && toolbarHelpButtons()} */}
    </Grid>
  );
};

export default Toolbar;
