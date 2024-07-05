import React from 'react';
import { saveToStorage } from '@chrome-extension-boilerplate/shared/lib/utils';
import { EditorView } from 'codemirror';
import { SelectChangeEvent } from 'node_modules/@mui/material';

export const handleRunClick = (
  event: React.MouseEvent,
  scriptToolbarRef: React.RefObject<HTMLElement>,
  userOptions: UserOptions,
) => {
  // console.log('Run button clicked!')
  event.preventDefault();
  if (userOptions.workbenchAlwaysClearTraces) {
    handleTraceClearClick(event);
  }
  if (scriptToolbarRef.current) {
    const runButton = scriptToolbarRef.current.querySelector('.col-sm-6 button') as HTMLAnchorElement;
    // console.log('runButton:', runButton);
    if (runButton) {
      runButton.click();
      // console.log('Run element clicked!')
    }
  }
};

export const updateHiddenElement = (
  editorViewRef: React.MutableRefObject<EditorView | null>,
  userOptions: UserOptions,
) => {
  if (!editorViewRef.current) return;
  const text = editorViewRef.current.state.doc.toString();
  const hiddenContent = document.getElementById('hiddenContent');
  if (hiddenContent && hiddenContent.textContent !== text) {
    hiddenContent.textContent = text;
    const changeEvent = new Event('change', { bubbles: true });
    hiddenContent.dispatchEvent(changeEvent);
    userOptions.workbenchCode = text;
    // setUserOptions((prevValues) => ({
    //   ...prevValues,
    //   ['workbenchCode']: text,
    // }));
    saveToStorage('userOptions', userOptions);
    //   // console.log('set userOptions:', userOptions)
  }
};

export const hideToastContainer = (traceRef: React.RefObject<HTMLElement>) => {
  if (traceRef.current) {
    const hideToastContainer = (mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.id === 'toast-container' && traceRef.current) {
              // Hide the toast container
              node.style.display = 'none';

              // Extract the message from the toast container
              let toastMessage = node.innerText || node.textContent;
              console.log('toastMessage1:', toastMessage)

              // Check if the table already contains a 'toast-row'
              const existingToastRow = traceRef.current.querySelector('#toast-row');

              if (toastMessage && !existingToastRow) {
                // toastMessage = toastMessage.slice(1)
                const tableContainer = traceRef.current;
                if (toastMessage.includes('Success')) {
                  toastMessage = toastMessage.slice(1)
                  // tableContainer.style.backgroundColor = '#1d1d1d';
                  tableContainer.style.color = '#28a745';
                } else if (toastMessage.includes('Error')) {
                  // tableContainer.style.backgroundColor = '#1d1d1d';
                  tableContainer.style.color = '#dc3545';

                  // Remove the '(x.xxx s)' from the error message
                  toastMessage = 'Error: ' + toastMessage.slice(toastMessage.indexOf(')') + 1);

                }
                console.log('toastMessage2:', toastMessage)


                // Create a new table row with the toast message
                const newRow = document.createElement('tr');
                newRow.id = 'toast-row';
                const newTd = document.createElement('td');
                newTd.id = 'toast-message';
                newTd.colSpan = 2; // Ensure the new row spans both columns
                // remove the first character of the toast message
                newTd.textContent = toastMessage;
                newRow.appendChild(newTd);

                // Insert the new row as the first row in the table
                const tableBody = traceRef.current.querySelector('tbody');
                // console.debug('tableBody:', tableBody);
                if (tableBody) {
                  tableBody.insertBefore(newRow, tableBody.firstChild);
                }
              }
            }
          });
        }
      }
    };

    // This will hide the "success" toast that appears when the script is run
    const toastObserver = new MutationObserver(hideToastContainer);
    toastObserver.observe(document.body, { childList: true, subtree: true });
  }
};

export const modifyTraceTable = (traceRef: React.RefObject<HTMLElement>) => {
  if (traceRef.current) {

    const modifyTableRows = (mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          // console.log('Child list mutation detected:', mutation);
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              // console.log('Added node:', node);
              if (node.matches('tr')) {
                // console.log('Node is a <tr>:', node);
                // console.log('Processing node:', node);
                const firstTd = node.children[0];
                // console.log('firstTd:', firstTd);
                if (firstTd
                  && !firstTd.hasAttribute('data-bind')
                  && firstTd.id !== 'toast-message' // Because we add the new toast message to the table
                ) {
                  firstTd.remove();
                }
              }
            }
          });
        }
      }
    };

    const tableObserver = new MutationObserver(modifyTableRows);
    tableObserver.observe(traceRef.current, { childList: true, subtree: true });
  } else {
    console.error('traceRef.current is null');
  }
};

export const autoScrollTrace = (traceRef: React.RefObject<HTMLElement>) => {
  if (traceRef.current) {
    const mutationHandler = (mutationsList: MutationRecord[]) => {
      const traceRef = document.getElementById('tracesContainer') as HTMLElement;
      // Function to hide the toast container once it appears
      for (const mutation of mutationsList) {
        if (mutation.addedNodes.length) {
          traceRef.scrollTop = traceRef.scrollHeight;
        }
      }
    };

    // This makes the trace window auto-scroll to the bottom
    const traceObserver = new MutationObserver(mutationHandler);
    traceObserver.observe(traceRef.current, { childList: true, subtree: true });
  }
};

export const repositionTraceWindow = (traceRef: React.RefObject<HTMLElement>) => {
  // Move the trace container
  if (traceRef.current) {
    // Move the trace into the box
    const traceWrapper = document.getElementById('custom-trace') as HTMLElement;
    traceRef.current.style.height = '100%';
    traceRef.current.style.maxHeight = '100%';
    traceWrapper.appendChild(traceRef.current);
  } else {
    console.error('Trace window or title not found');
  }
};

export const handleModeChange = (
  event: SelectChangeEvent<ScriptingModes>,
  scriptToolbarRef: React.RefObject<HTMLElement>,
  setScriptingMode: React.Dispatch<React.SetStateAction<ScriptingModes>>,
  userOptions: UserOptions,
  setUserOptions: React.Dispatch<React.SetStateAction<UserOptions>>,
) => {
  // console.log('handleViewChange:', event.target.value)
  console.log('userOptions:', userOptions);
  const mode = event.target.value as ScriptingModes;
  // const mode = 'Standard' as ScriptingModes;
  userOptions.scriptingMode = mode;
  setUserOptions(prevValues => ({
    ...prevValues,
    ['scriptingMode']: mode,
  }));
  saveToStorage('userOptions', {
    ...userOptions,
    ['scriptingMode']: mode,
  });
  setScriptingMode(mode);

  if (scriptToolbarRef.current) {
    const modeSelect = scriptToolbarRef.current.querySelector('.col-sm-6 form div select') as HTMLSelectElement;
    console.log('modeSelect:', modeSelect);
    if (modeSelect) {
      console.log(`setting mode to ${mode}`);
      modeSelect.value = mode.toLowerCase();
      // console.log('Run element clicked!')

      // Dispatch a change event to ensure the change is recognized
      const changeEvent = new Event('change', { bubbles: true });
      modeSelect.dispatchEvent(changeEvent);
    }
  }
};

export const handleTraceClearClick = (event: React.MouseEvent) => {
  // console.log('Clear traces button clicked');
  event.preventDefault();
  const clearLink = document.querySelector('.tracetitle a') as HTMLAnchorElement;
  if (clearLink) {
    clearLink.click();
  }

  // Also delete the toast-row if it exists
  const toastRow = document.getElementById('toast-row');
  if (toastRow) {
    toastRow.remove();
  }
};

export const handlePythonClick = (event: React.MouseEvent) => {
  console.log('Python Snippets button clicked');
  const scriptToolbarRef = document.querySelector('.script-toolbar') as HTMLElement;
  event.preventDefault();
  if (scriptToolbarRef) {
    const buttonList = scriptToolbarRef.querySelector('.control-label') as HTMLAnchorElement;
    console.log('buttonList:', buttonList);
    if (buttonList) {
      (buttonList.children[0] as HTMLAnchorElement).click();
    }
  }
};

export const handleCustomClick = (event: React.MouseEvent) => {
  console.log('Custom Snippets button clicked');
  // const scriptToolbarRef = document.querySelector('.script-toolbar') as HTMLElement;
  event.preventDefault();
};

export const handleAliasClick = (event: React.MouseEvent) => {
  console.log('Alias snippets button clicked');
  const scriptToolbarRef = document.querySelector('.script-toolbar') as HTMLElement;
  event.preventDefault();
  if (scriptToolbarRef) {
    const buttonList = scriptToolbarRef.querySelector('.control-label') as HTMLAnchorElement;
    console.log('buttonList:', buttonList);
    if (buttonList) {
      (buttonList.children[1] as HTMLAnchorElement).click();
    }
  }
};

export const handleApiClick = (event: React.MouseEvent) => {
  console.log('API snippets  button clicked');
  const scriptToolbarRef = document.querySelector('.script-toolbar') as HTMLElement;
  event.preventDefault();
  if (scriptToolbarRef) {
    const buttonList = scriptToolbarRef.querySelector('.control-label') as HTMLAnchorElement;
    console.log('buttonList:', buttonList);
    if (buttonList) {
      (buttonList.children[2] as HTMLAnchorElement).click();
    }
  }
};

export const handleApiExplorerClick = (event: React.MouseEvent) => {
  console.log('API Explorer button clicked');
  const scriptToolbarRef = document.querySelector('.script-toolbar') as HTMLElement;
  event.preventDefault();
  if (scriptToolbarRef) {
    const buttonList = scriptToolbarRef.querySelector('.control-label') as HTMLAnchorElement;
    console.log('buttonList:', buttonList);
    if (buttonList) {
      (buttonList.children[3] as HTMLAnchorElement).click();
    }
  }
};

export const handleAlwaysClearTraces = (
  setAlwaysClearTraces: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setAlwaysClearTraces(prevValue => !prevValue);
};

// const handleResize = (event: React.SyntheticEvent<Element>, data: ResizeCallbackData) => {
//   setEditorWidth((data.size.width / window.innerWidth) * 100);
// };
