/* eslint-disable import/namespace */
import '../Popup.css';
import { Restore, SettingsBackupRestore } from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material';
import {
  FormControl,
  MenuItem,
  Select,
  Switch,
  Typography,
  Card,
  Box,
  Divider,
  Grid,
  TextField,
  Tooltip,
  Button,
} from '@mui/material';
import {
  userOptionsConfig,
  // codeMirrorOptionsConfig,
  // sapDefaultPreferences,
  // defaultCodePreferences,
  defaultShortcuts,
  defaultMods,
} from '@extension/shared/lib/constants';
import { saveToStorage } from '@extension/shared/lib/utils';
import useAppContext from '@extension/shared/lib/hooks/useAppContext';
// import {
//   MouseEvent,
//   useState
// } from 'react';

// declare module 'react' {
//   interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
//     // extends React's HTMLAttributes
//     directory?: string;
//     webkitdirectory?: string;
//   }
// }

const OptionsPage: React.FC = () => {
  const { userOptions, setUserOptions, setMods, setShortcuts } = useAppContext();

  // async function revertToSapDefaults() {
  //   setCodeMirrorOptions(sapDefaultPreferences);
  //   saveToStorage('codeMirrorOptions', sapDefaultPreferences);
  //   console.log('Reverted to SAP defaults');
  // }

  // async function revertToCustomDefaults() {
  //   setCodeMirrorOptions(defaultCodePreferences);
  //   saveToStorage('codeMirrorOptions', defaultCodePreferences);
  //   console.log('Reverted to custom defaults');
  // }

  async function revertShortcuts() {
    setShortcuts(defaultShortcuts);
    saveToStorage('shortcuts', defaultShortcuts);
    console.log('Reverted shortcuts to ', defaultShortcuts);
  }

  async function revertMods() {
    setMods(defaultMods);
    saveToStorage('mods', defaultMods);
    console.log('Reverted mods');
  }

  const handleUserInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string,
    option: Option,
  ) => {
    const value = type === 'switch' ? (e.target as HTMLInputElement).checked : e.target.value;
    setUserOptions(prevValues => ({
      ...prevValues,
      [option.key]: value,
    }));
    saveToStorage('userOptions', {
      ...userOptions,
      [option.key]: value,
    });

    if (option.key === 'openInSidePanel') {
      chrome.sidePanel
        .setPanelBehavior({ openPanelOnActionClick: value as boolean })
        .catch(error => console.error(error));
    }
  };

  const handleUserSelectChange = (e: SelectChangeEvent<unknown>, option: Option) => {
    const value = e.target.value;
    setUserOptions(prevValues => ({
      ...prevValues,
      [option.key]: value,
    }));
    saveToStorage('userOptions', {
      ...userOptions,
      [option.key]: value,
    });
  };

  // const handleCodeInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   type: string,
  //   option: Option,
  // ) => {
  //   const value = type === 'switch' ? (e.target as HTMLInputElement).checked : e.target.value;
  //   setCodeMirrorOptions(prevValues => ({
  //     ...prevValues,
  //     [option.key]: value,
  //   }));
  //   saveToStorage('codeMirrorOptions', {
  //     ...codeMirrorOptions,
  //     [option.key]: value,
  //   });
  // };

  // const handleCodeSelectChange = (e: SelectChangeEvent<unknown>, option: Option) => {
  //   const value = e.target.value;
  //   setCodeMirrorOptions(prevValues => ({
  //     ...prevValues,
  //     [option.key]: value,
  //   }));
  //   saveToStorage('codeMirrorOptions', {
  //     ...codeMirrorOptions,
  //     [option.key]: value,
  //   });
  // };

  const generateUserFormControl = (option: Option, values: UserOptions) => {
    const commonProps = {
      key: option.key,
      xs: 12,
      md: 6,
    };

    return (
      <Grid item {...commonProps}>
        <FormControl component="fieldset" className="mb-4" fullWidth>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={8}>
              <Tooltip title={option.tooltip}>
                <Typography>{option.label}</Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={4}>
              {option.type === 'switch' && (
                <Switch
                  checked={values[option.key as keyof UserOptions] as boolean}
                  onChange={e => handleUserInputChange(e, 'switch', option)}
                  name={option.key as string}
                  color="primary"
                />
              )}
              {option.type === 'select' && (
                <Select
                  value={values[option.key as keyof UserOptions] || ''}
                  onChange={e => handleUserSelectChange(e, option)}
                  sx={{
                    fontSize: '0.875rem',
                    maxHeight: '40px',
                    '& .MuiSelect-select': {
                      paddingTop: '6px',
                      paddingBottom: '6px',
                    },
                  }}
                  fullWidth>
                  {option.options?.map(opt => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              )}
              {option.type === 'number' && (
                <TextField
                  type="number"
                  value={values[option.key as keyof UserOptions] || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUserInputChange(e, 'number', option)}
                  InputProps={{ inputProps: { maxLength: 2, style: { width: '70px', height: '30px' } } }}
                  fullWidth={false}
                />
              )}
              {option.type === 'string' && (
                <TextField
                  type="text"
                  value={values[option.key as keyof UserOptions] || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUserInputChange(e, 'string', option)}
                  InputProps={{ style: { width: '70px', height: '30px' } }}
                  fullWidth={false}
                />
              )}
            </Grid>
          </Grid>
        </FormControl>
      </Grid>
    );
  };

  // const generateCodeMirrorFormControl = (option: Option, values: CodeMirrorOptions) => {
  //   const commonProps = {
  //     key: option.key,
  //     xs: 12,
  //     md: 6,
  //   };
  //   return (
  //     <Grid item {...commonProps}>
  //       <FormControl component="fieldset" className="mb-4" fullWidth>
  //         <Grid container alignItems="center" spacing={2}>
  //           <Grid item xs={8}>
  //             <Tooltip title={option.tooltip}>
  //               <Typography>{option.label}</Typography>
  //             </Tooltip>
  //           </Grid>
  //           <Grid item xs={4}>
  //             {option.type === 'switch' && (
  //               <Switch
  //                 checked={values[option.key as keyof CodeMirrorOptions] as boolean}
  //                 onChange={e => handleCodeInputChange(e, 'switch', option)}
  //                 name={option.key as string}
  //                 color="primary"
  //               />
  //             )}
  //             {option.type === 'select' && (
  //               <Select
  //                 value={values[option.key as keyof CodeMirrorOptions] || ''}
  //                 onChange={e => handleCodeSelectChange(e, option)}
  //                 sx={{
  //                   fontSize: '0.875rem',
  //                   maxHeight: '40px',
  //                   '& .MuiSelect-select': {
  //                     paddingTop: '6px',
  //                     paddingBottom: '6px',
  //                   },
  //                 }}
  //                 fullWidth>
  //                 {option.options?.map(opt => (
  //                   <MenuItem key={opt} value={opt}>
  //                     {opt}
  //                   </MenuItem>
  //                 ))}
  //               </Select>
  //             )}
  //             {option.type === 'number' && (
  //               <TextField
  //                 type="number"
  //                 value={values[option.key as keyof CodeMirrorOptions] || ''}
  //                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCodeInputChange(e, 'number', option)}
  //                 InputProps={{ inputProps: { maxLength: 2, style: { width: '70px', height: '30px' } } }}
  //                 fullWidth={false}
  //               />
  //             )}
  //             {option.type === 'string' && (
  //               <TextField
  //                 type="text"
  //                 value={values[option.key as keyof CodeMirrorOptions] || ''}
  //                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCodeInputChange(e, 'string', option)}
  //                 InputProps={{ style: { width: '70px', height: '30px' } }}
  //                 fullWidth={false}
  //               />
  //             )}
  //           </Grid>
  //         </Grid>
  //       </FormControl>
  //     </Grid>
  //   );
  // };

  // interface SiteMapping {
  //   host: string;
  //   filePath: string;
  // }

  // const [siteMappings, setSiteMappings] = useState<SiteMapping[]>([
  //   { host: 'website.com', filePath: 'C:/path' }
  // ]);

  // const handleAddRow = () => {
  //   setSiteMappings([...siteMappings, { host: '', filePath: '' }]);
  // };

  // const handleDeleteRow = (index: number) => {
  //   const newSiteMappings = siteMappings.filter((_, i) => i !== index);
  //   setSiteMappings(newSiteMappings);
  // };

  // const handleChange = (index: number, field: keyof SiteMapping, value: string) => {
  //   const newSiteMappings = [...siteMappings];
  //   newSiteMappings[index][field] = value;
  //   setSiteMappings(newSiteMappings);
  // };

  // const selectFilePath = async (event: MouseEvent<HTMLDivElement>) => {
  //   console.log('selectFilePath', event);

  //   try {
  //     if ('showDirectoryPicker' in window) {
  //       console.log('Directory Picker API is supported in this browser.');

  //       const handle = await window.showDirectoryPicker();
  //       console.log('Directory selected:', handle);

  //       // Check for permissions
  //       const permissionStatus = await handle.queryPermission({ mode: 'readwrite' });
  //       console.log('Permission status:', permissionStatus);

  //       if (permissionStatus === 'granted') {
  //         // Iterate through the directory entries
  //         for await (const entry of handle.values()) {
  //           if (entry.kind === 'file') {
  //             console.log('File:', entry.name);
  //             await readTextFile(entry as FileSystemFileHandle);
  //           } else if (entry.kind === 'directory') {
  //             console.log('Directory:', entry.name);
  //             // Handle subdirectory entry
  //           }
  //         }
  //         return handle;
  //       } else if (permissionStatus === 'prompt') {
  //         const requestStatus = await handle.requestPermission({ mode: 'readwrite' });
  //         console.log('Request permission status:', requestStatus);

  //         if (requestStatus === 'granted') {
  //           // Iterate through the directory entries
  //           for await (const entry of handle.values()) {
  //             if (entry.kind === 'file') {
  //               console.log('File:', entry.name);
  //               await readTextFile(entry as FileSystemFileHandle);
  //             } else if (entry.kind === 'directory') {
  //               console.log('Directory:', entry.name);
  //               // Handle subdirectory entry
  //             }
  //           }
  //           return handle;
  //         } else {
  //           console.error('Permission to access directories was not granted.');
  //         }
  //       } else {
  //         console.error('Permission to access directories was denied.');
  //       }
  //     } else {
  //       console.error('Directory Picker API is not supported in this browser.');
  //     }
  //   } catch (error) {
  //     console.error('Error selecting directory:', error);
  //   }
  //   return null;
  // };

  // const readTextFile = async (fileHandle: FileSystemFileHandle) => {
  //   const file = await fileHandle.getFile();
  //   const text = await file.text();
  //   console.log('File content:', text);
  // };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Box className="space-y-6">
        <Card className="p-4">
          <Typography variant="h6" gutterBottom>
            Extension Options
          </Typography>
          <Divider className="mb-4" />
          <Grid container spacing={2}>
            {userOptionsConfig.map(option => generateUserFormControl(option, userOptions))}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Tooltip title="Reset Shortcuts">
                <Button variant="contained" color="primary" startIcon={<Restore />} onClick={revertShortcuts} fullWidth>
                  Revert Shortcuts
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={6} md={3}>
              <Tooltip title="Revert Mods">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<SettingsBackupRestore />}
                  onClick={revertMods}
                  fullWidth>
                  Revert Mods
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          {/* <Grid container spacing={2}>
            <Container>
              <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Code Download Locations
                </Typography>
                <Button color="primary" variant="contained" startIcon={<Add />} onClick={handleAddRow}>
                  Add Row
                </Button>
              </Toolbar>
              {/* <Box mt={2}>
                {siteMappings.map((mapping, index) => (
                  <Grid container spacing={2} alignItems="center" key={index}>
                    <Grid item xs={5}>
                      <TextField
                        label="Host"
                        fullWidth
                        value={mapping.host}
                        onChange={(e) => handleChange(index, 'host', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="File Path"
                        fullWidth
                        value={mapping.filePath}
                        onClick={(e) => selectFilePath(e)}
                      // onClick={() => document.getElementById(`folderInput-${index}`)?.click()}
                      />
                       <input // Webkit stuff only supports the "upload" button
                        type="file"
                        id={`folderInput-${index}`}
                        style={{ display: 'none' }}
                        webkitdirectory=""
                        onChange={(e) => handleFolderSelect(index, e)}
                      /> 
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton color="secondary" onClick={() => handleDeleteRow(index)}>
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Container>

          </Grid> */}
        </Card>
        {/* <Card className="p-4">
          <Typography variant="h4" gutterBottom>
            Code Editor Options
          </Typography>
          <Divider className="mb-4" />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Tooltip title="Revert to SAP Defaults">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Restore />}
                  onClick={revertToSapDefaults}
                  fullWidth>
                  Revert to SAP Defaults
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <Tooltip title="Revert to Custom Defaults">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<SettingsBackupRestore />}
                  onClick={revertToCustomDefaults}
                  fullWidth>
                  Revert to Custom Defaults
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Divider className="mb-4" />
          <Grid container spacing={2}>
            {codeMirrorOptionsConfig.map(option => generateCodeMirrorFormControl(option, codeMirrorOptions))}
          </Grid>
        </Card> */}
      </Box>
    </div>
  );
};

export default OptionsPage;
