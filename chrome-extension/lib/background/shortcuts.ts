const handleShortcuts = () => {
  console.info('Handling shortcuts');
  chrome.commands.onCommand.addListener(async command => {
    console.log(`Command: ${command}`);
    switch (command) {
      case 'Open Shortcuts': {
        console.log('Opening shortcuts');
        chrome.windows.create({
          url: chrome.runtime.getURL('popup/index.html#/shortcuts?popup=true'),
          type: 'popup',
          width: 800,
          height: 600,
        }, (window) => {
          if (window) {
            chrome.storage.local.set({ popupWindowId: window.id });
          }
        });
      }
    }
  });
  console.log('Shortcuts handled');
};

export default handleShortcuts;
