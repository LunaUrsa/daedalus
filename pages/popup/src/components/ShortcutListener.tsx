import { useEffect } from 'react';
import siteMapJson from '../assets/siteMap.json';

const siteMap: SiteMap = siteMapJson as SiteMap;

function getNestedProperty(obj: SiteMap, path: string): string | undefined {
  const [category, subcategory] = path.split(' > ');
  const url = obj[category]?.[subcategory];
  return typeof url === 'string' ? url : undefined;
}

const ShortcutListener = () => {
  useEffect(() => {
    const handleKeyPress = async (event: KeyboardEvent) => {
      // Check if the key setting interface is active
      if (document.activeElement?.tagName === 'INPUT') {
        return; // Do not proceed if the user is currently typing in an input field (e.g., setting a shortcut key)
      }

      console.log('Key pressed:', event.key);

      const storedShortcuts = await chrome.storage.local.get('shortcuts');

      const shortcuts = storedShortcuts ? JSON.parse(storedShortcuts.shortcuts) : [];

      // Find a shortcut that matches the pressed key
      const shortcut = shortcuts.find((s: Shortcut) => s.key === event.key.toUpperCase());
      if (shortcut) {

        // Go through siteMap.json and find the URL associated with the shortcut
        // The shortcut.destination is the key-path in siteMap.json
        // For example, if shortcut.destination is "Google > Search", the URL is siteMap.Google.Search
        // Make sure it's type safe

        const urlProperty = getNestedProperty(siteMap, shortcut.destination);

        if (!urlProperty) {
          // If the URL was not found in the siteMap, see if it's a custom URL
          if (shortcut.destination.startsWith('http')) {
            // Open a new tab to that destination
            window.open(shortcut.destination, '_blank');
            return;
          }
          alert(
            `Invalid destination for the "${shortcut.key}" shortcut. \n${shortcut.destination} is not a valid selection or URL.`,
          );
          return;
        }

        // Get the active tab and its url
        chrome.tabs.query({ active: true, currentWindow: false }, tabs => {
          console.log('tabs', tabs)
          const activeTab = tabs[0];
          if (!activeTab.id) {
            return;
          }

          if (!activeTab?.url?.startsWith('http')) {
            return;
          }

          // Replace <baseUrl> in the URL with the actual base URL of the current window
          const baseUrl = activeTab.url.split('/')[2];
          const finalUrl = `https://${urlProperty?.replace('<baseUrl>', baseUrl)}`;

          // alert(`Navigating to: ${finalUrl}`); // Display a message for testing
          // window.location.href = finalUrl; // Navigate to the URL associated with the shortcut
          // Close the popup window if it exists
          chrome.storage.local.get('popupWindowId', (result) => {
            if (result.popupWindowId) {
              chrome.windows.remove(result.popupWindowId, () => {
                chrome.tabs.create({ url: finalUrl });
                // Optionally, clear the stored popup window ID
                chrome.storage.local.remove('popupWindowId');
              });
            } else {
              chrome.tabs.create({ url: finalUrl });
            }
          });

        });
      } else {
        console.log('No shortcut found for key:', event.key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return null; // This component does not render anything
};

export default ShortcutListener;
