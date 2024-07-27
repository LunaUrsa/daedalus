import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SettingsIcon from '@mui/icons-material/Settings';
import CustomizeIcon from '@mui/icons-material/Tune';
import HelpIcon from '@mui/icons-material/Help';
import { Link as RouterLink } from 'react-router-dom';
import { Functions, AddCircle } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { saveToStorage } from '@extension/shared/lib/utils';
import useAppContext from '@extension/shared/lib/hooks/useAppContext';

const EnhancedToolbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { currentPage, setCurrentPage, mods, setMods, shortcuts, setShortcuts } = useAppContext();

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (page: Page) => {
    console.log('setting page to', page);
    saveToStorage('currentPage', page);
    setCurrentPage(page);
    setAnchorEl(null);
  };

  const addStyle = () => {
    const newStyle = {
      id: uuidv4(),
      name: '',
      content: '',
      isEnabled: true,
      isValidLanguage: true,
      isValidCode: true,
      language: 'css',
    };
    setMods([...mods, newStyle]);
    saveToStorage('mods', [...mods, newStyle]);
  };

  const titles: Record<string, string> = {
    '': 'Shortcuts',
    '#/': 'Shortcuts',
    '#/shortcuts': 'Shortcuts',
    '#/mods': 'Mods',
    '#/options': 'Options',
    '#/formula': 'Formula Format',
    '#/info': 'Information',
  };

  // Default title
  const title = titles[location.hash] || 'Daedalus';

  const addShortcut = () => {
    const newShortcut = {
      id: uuidv4(),
      key: '',
      destination: '',
      isUnique: true,
      isValidDestination: true,
    };
    setShortcuts([...shortcuts, newShortcut]);
    saveToStorage('shortcuts', [...shortcuts, newShortcut]);
  };

  let toolbarIcons;
  let usedSpace = 5; // 4 for the title and 1 for the menu icon
  switch (currentPage) {
    case 'options':
    case 'info':
    case 'formula':
      toolbarIcons = <Grid item xs={12 - usedSpace}></Grid>;
      break;
    case 'mods':
      usedSpace += 1; // 1 for the add new icon
      toolbarIcons = (
        <>
          {/* Empty space */}
          <Grid item xs={12 - usedSpace}></Grid>
          {/* Add new */}
          <Grid item xs={1}>
            <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={addStyle} sx={{ mr: 2 }}>
              <AddCircle />
            </IconButton>
          </Grid>
        </>
      );
      break;
    case 'shortcuts':
      usedSpace += 1; // 1 for the add new icon
      toolbarIcons = (
        <>
          {/* Empty space */}
          <Grid item xs={12 - usedSpace}></Grid>
          {/* Add New */}
          <Grid item xs={1}>
            <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={addShortcut} sx={{ mr: 2 }}>
              <AddCircle />
            </IconButton>
          </Grid>
        </>
      );
      break;
    default:
      toolbarIcons = <></>;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, mt: 0.5 }}>
              {title}
            </Typography>
          </Grid>
          {toolbarIcons}
          <Grid item xs={1}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              // edge="end"
              onClick={openMenu}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => handleMenuClick('shortcuts' as Page)} component={RouterLink} to="/shortcuts">
                <KeyboardIcon />
                Shortcuts
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick('mods' as Page)} component={RouterLink} to="/mods">
                <CustomizeIcon />
                Mods
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick('formula' as Page)} component={RouterLink} to="/formula">
                <Functions />
                Formula Format
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick('options' as Page)} component={RouterLink} to="/options">
                <SettingsIcon />
                Options
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick('info' as Page)} component={RouterLink} to="/info">
                <HelpIcon />
                Info
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default EnhancedToolbar;
