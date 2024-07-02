import React, { useState } from 'react';
import { Grid, List, ListItem, TextField, IconButton } from '@mui/material';
import ShortcutListener from '../components/ShortcutListener';
import DeleteIcon from '@mui/icons-material/Delete';
import siteMap from '../assets/siteMap.json';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Autocomplete from '@mui/material/Autocomplete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { DropResult, DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';

import useAppContext from '@chrome-extension-boilerplate/shared/lib/hooks/useAppContext';
import { saveToStorage } from '@chrome-extension-boilerplate/shared/lib/utils';

const ShortcutsPage: React.FC = () => {
  const [destination, setDestination] = useState<string>('');

  const { shortcuts, setShortcuts } = useAppContext();

  document.title = 'Shortcuts';

  // When the user leaves the input field, save the shortcuts to the local storage
  const handleBlur = () => {
    // console.log("Saving shortcuts to storage:", shortcuts);
    chrome.storage.local.set({ shortcuts: JSON.stringify(shortcuts) });
  };

  // Delete the shortcut with the given id
  const handleDelete = (id: string) => {
    const updatedShortcuts = shortcuts.filter(shortcut => shortcut.id !== id);
    setShortcuts(updatedShortcuts);
    saveToStorage('shortcuts', updatedShortcuts);
  };

  // This creates a new shortcut with the given id and value
  // and updates the shortcuts list
  const handleChange = (id: string, field: keyof Shortcut, value: string) => {
    const updatedShortcuts = shortcuts.map(shortcut => {
      if (shortcut.id === id) {
        if (field === 'key') {
          // Check for duplicate keys
          const isDuplicate = shortcuts.some(other => other.key === value && other.id !== id);
          return { ...shortcut, [field]: value, isDuplicated: isDuplicate };
        }
        if (field === 'destination') {
          // Check if the destination is valid
          const isValidDestination =
            (destinationOptions.includes(value) && !value.startsWith('You')) || validateURL(value);
          return { ...shortcut, [field]: value, isValidDestination };
        }
        return { ...shortcut, [field]: value };
      }
      return shortcut;
    });
    setShortcuts(updatedShortcuts);
    saveToStorage('shortcuts', updatedShortcuts);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(shortcuts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setShortcuts(items);
    saveToStorage('shortcuts', items);
  };

  // This handles displaying the menu items in the destination dropdown
  // Prepare options from siteMap for the Autocomplete component
  const destinationOptions = Object.entries(siteMap).flatMap(([key, value]) => {
    return Object.entries(value).map(([subKey]) => {
      if (subKey) {
        return `${key} > ${subKey}`;
      }
      return key;
    });
  });

  // This takes the keydown event and sets the key value to the key pressed
  const shortcutKeyDown = (id: string, event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    // We capitalize the first letter like this because the user might wanna use Backspace for some reason ig
    const capitalizedKey = event.key.slice(0, 1).toUpperCase() + event.key.slice(1);
    handleChange(id, 'key', capitalizedKey);
  };

  function validateURL(url: string): boolean {
    const pattern = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]+)*\/?$/i;
    return pattern.test(url);
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <ShortcutListener />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="shortcuts">
            {(provided: DroppableProvided) => (
              <List dense={true} ref={provided.innerRef} {...provided.droppableProps}>
                {shortcuts.map((shortcut, index) => (
                  <Draggable key={shortcut.id} draggableId={shortcut.id} index={index}>
                    {(provided: DraggableProvided) => (
                      <ListItem
                        key={shortcut.id}
                        dense={true}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <Grid container spacing={1} alignItems="center">
                          <Grid item xs="auto" style={{ paddingRight: 4, paddingLeft: 4 }}>
                            <DragIndicatorIcon style={{ cursor: 'grab' }} />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Shortcut"
                              value={shortcut.key}
                              onKeyDown={e => shortcutKeyDown(shortcut.id, e)}
                              onChange={e => handleChange(shortcut.id, 'key', e.target.value)}
                              onBlur={handleBlur}
                              placeholder="Shortcut Key"
                              error={!shortcut.isUnique}
                              helperText={!shortcut.isUnique ? 'Already in use' : ''}
                              InputProps={{
                                style: {
                                  borderColor: !shortcut.isUnique ? '#ff1744' : 'default',
                                },
                              }}
                              style={!shortcut.isUnique ? { color: 'red' } : {}}
                            />
                          </Grid>
                          <Grid item xs={7}>
                            <Autocomplete
                              fullWidth
                              freeSolo
                              size="small"
                              value={shortcut.destination}
                              onInputChange={(event, newInputValue) => {
                                setDestination(newInputValue);
                              }}
                              onChange={(e, newValue) => handleChange(shortcut.id, 'destination', newValue ?? '')}
                              options={destinationOptions}
                              onBlur={() => {
                                handleChange(shortcut.id, 'destination', destination);
                              }}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  label="Destination"
                                  variant="outlined"
                                  fullWidth
                                  error={!shortcut.isValidDestination}
                                  helperText={!shortcut.isValidDestination ? 'Invalid URL' : ''}
                                  inputProps={{
                                    ...params.inputProps,
                                    style: {
                                      color: !shortcut.isValidDestination ? 'red' : undefined,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleDelete(shortcut.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </Grid>
  );
};

export default ShortcutsPage;
