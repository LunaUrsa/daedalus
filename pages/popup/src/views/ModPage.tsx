import React, { useState } from 'react';
import { List, ListItem, TextField, IconButton, Grid, Switch, ListItemText } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { DropResult, DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModEditor from '../components/ModEditor';
import useAppContext from '@extension/shared/lib/hooks/useAppContext';
import { saveToStorage } from '@extension/shared/lib/utils';

const ModsPage: React.FC = () => {
  const [activeEditId, setActiveEditId] = useState<string | null>(null);
  const { mods, setMods } = useAppContext();

  const refreshMods = (oldMods: Mod[], newMods: Mod[]) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const activeTab = tabs[0];
      if (!activeTab.url || activeTab.url.startsWith('chrome://')) {
        return;
      }

      oldMods.forEach((mod: Mod) => {
        if (!activeTab.id) return;
        chrome.scripting.removeCSS({
          target: { tabId: activeTab.id, allFrames: true },
          css: mod.content,
        });
      });

      newMods.forEach(async (mod: Mod) => {
        if (mod?.content && mod?.isEnabled && mod?.isValidCode && activeTab.id) {
          await chrome.scripting.insertCSS({
            target: { tabId: activeTab.id, allFrames: true },
            css: mod.content,
          });
        }
      });
    });
    setMods(newMods);
    saveToStorage('mods', newMods);
  };

  const handleChange = (id: string, field: keyof Mod, value: string | boolean) => {
    const updatedMods = mods.map(mod => {
      if (mod.id === id) {
        return { ...mod, [field]: value };
      }
      return mod;
    });
    refreshMods(mods, updatedMods);
  };

  // When the user leaves the input field, save the mods to the local storage
  const handleBlur = (id: string, field: keyof Mod, value: string | boolean) => {
    const updatedMods = mods.map(mod => {
      if (mod.id === id) {
        return { ...mod, [field]: value };
      }
      return mod;
    });
    refreshMods(mods, updatedMods);
  };

  // Delete the mod with the given id
  const handleDelete = (id: string) => {
    const updatedMods = mods.filter(mod => mod.id !== id);
    refreshMods(mods, updatedMods);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updatedMods = Array.from(mods);
    const [reorderedItem] = updatedMods.splice(result.source.index, 1);
    updatedMods.splice(result.destination.index, 0, reorderedItem);
    refreshMods(mods, updatedMods);
  };

  // Toggle edit mode
  const handleEditToggle = (modId: string) => {
    console.log('Edit toggle:', modId);
    if (activeEditId === modId) {
      setActiveEditId(null); // Close editor if it's already open
    } else {
      setActiveEditId(modId);
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="mods">
              {(provided: DroppableProvided) => (
                <List dense={true} ref={provided.innerRef} {...provided.droppableProps}>
                  {mods.map((mod, index) => (
                    <Draggable key={mod.id} draggableId={mod.id} index={index}>
                      {(provided: DraggableProvided) => (
                        <ListItem
                          key={mod.id}
                          dense={true}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs="auto" style={{ paddingRight: 4, paddingLeft: 4 }}>
                              <DragIndicatorIcon style={{ cursor: 'grab' }} />
                            </Grid>
                            <Grid item xs={7}>
                              <TextField
                                fullWidth
                                size="small"
                                label="Name"
                                value={mod.name}
                                onChange={e => handleChange(mod.id, 'name', e.target.value)}
                                onBlur={e => handleBlur(mod.id, 'name', e.target.value)}
                                placeholder="Name"
                                error={!mod.isValidCode}
                                helperText={!mod.isValidCode ? 'This code is not valid!' : ''}
                                InputProps={{
                                  style: {
                                    borderColor: !mod.isValidCode ? '#ff1744' : 'default',
                                  },
                                }}
                                style={!mod.isValidCode ? { color: 'red' } : {}}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Switch
                                checked={mod.isEnabled}
                                onChange={e => handleChange(mod.id, 'isEnabled', e.target.checked)}
                                color="primary"
                                size="medium"
                              />
                            </Grid>
                            <Grid item xs={1}>
                              <IconButton
                                size="small"
                                edge="end"
                                aria-label="edit"
                                onClick={() => handleEditToggle(mod.id)}>
                                <EditIcon />
                              </IconButton>
                            </Grid>
                            <Grid item xs={1}>
                              <IconButton
                                size="small"
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleDelete(mod.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                            {activeEditId === mod.id ? (
                              <Grid item xs={12}>
                                <ListItemText
                                  secondary={<ModEditor mod={mod} handleChange={handleChange} />}
                                  primaryTypographyProps={{ component: 'div' }}
                                  secondaryTypographyProps={{ component: 'div' }}
                                />
                              </Grid>
                            ) : (
                              <></>
                            )}
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
    </div>
  );
};

export default ModsPage;
