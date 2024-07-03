import 'webextension-polyfill';
import {
  loadAndValidateStorageItem,
  isValidModList,
  isValidShortcutList,
  isValidUserOptions,
} from '../../../packages/shared/lib/utils';
import {
  defaultMods,
  defaultShortcuts,
  defaultUserPreferences,
} from '../../../packages/shared/lib/constants';
import codeMirrorHook from './codeMirrorHook';
import handleShortcuts from './shortcuts';

function websiteCssCheck(activeTab: chrome.tabs.Tab): boolean {
  if (!activeTab?.url
    || activeTab.url.startsWith('chrome')
    || !activeTab.url.includes('cpq.cloud.sap')) {
    // console.debug(`Not applying mods to ${activeTab?.url}`)
    chrome.action.setBadgeText({ text: '' });
    return false;
  }

  chrome.action.setBadgeText({ text: 'ON' });
  chrome.action.setBadgeBackgroundColor({ color: '#4688F1' });
  return true;
}

function websiteScriptCheck(activeTab: chrome.tabs.Tab): boolean {
  if (!activeTab?.url
    || activeTab.url.startsWith('chrome')
    || !activeTab.url.includes('cpq.cloud.sap')
    || !activeTab.url.includes('/ScriptWorkbench')) {
    // console.debug(`Not applying mods to ${activeTab?.url}`)
    chrome.action.setBadgeText({ text: '' });
    return false;
  }

  chrome.action.setBadgeText({ text: 'ON' });
  chrome.action.setBadgeBackgroundColor({ color: '#4688F1' });
  return true;
}

async function insertUserModCss() {
  const storage = await chrome.storage.local.get('mods'); // asdf
  if (!storage.mods) return;
  const mods = JSON.parse(storage.mods) as Mod[];
  if (Array.isArray(mods) && mods.length > 0) {
    chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
      const activeTab = tabs[0];
      if (!websiteCssCheck(activeTab)) return;
      // console.log('Applying mods');
      const modPromises = mods.map(mod => {
        if (activeTab?.id && mod.isEnabled && mod.isValidCode && activeTab.id > -1) {
          return chrome.scripting
            .insertCSS({
              target: { tabId: activeTab.id, allFrames: true },
              css: mod.content,
            })
            .then(() => {
              // console.info('Mod applied', mod);
            })
            .catch(err => {
              console.error('Failed to apply mod:', mod, err);
            });
        } else {
          // console.info('Mod not applied:', mod);
          return Promise.resolve();
        }
      });

      await Promise.all(modPromises);
      // console.log('Mods applied');
    });
  } else {
    // console.log('No mods to apply');
  }
}

async function injectCodeMirrorHook() {
  chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
    const activeTab = tabs[0];

    if (!websiteScriptCheck(activeTab)) return;
    if (!activeTab?.url || !activeTab.id || activeTab.url.startsWith('chrome')) {
      return;
    }
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id, allFrames: true },
      world: 'MAIN', // This is VERY important, otherwise it doesn't work
      func: codeMirrorHook,
      args: [],
    });
  });
}

async function initSettings() {
  // console.log('Initializing settings');
  await Promise.all([
    loadAndValidateStorageItem('userOptions', isValidUserOptions, defaultUserPreferences),
    loadAndValidateStorageItem('mods', isValidModList, defaultMods),
    loadAndValidateStorageItem('shortcuts', isValidShortcutList, defaultShortcuts),
  ]);

  // Allows users to open the side panel by clicking on the action toolbar icon
  const userOptions = await chrome.storage.local.get('userOptions');
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: userOptions.openInSidePanel })
    .catch(error => console.error(error));

  // console.log('Settings initialized, applying mods and handling shortcuts.');
  await insertUserModCss();
  await injectCodeMirrorHook();
  handleShortcuts();
}

initSettings();

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  // Any time a tab changes, attempt to inject the code and apply mods
  // console.log('Tab updated:', tabId, changeInfo, tab.url)
  if (changeInfo.status === 'complete') {
    insertUserModCss();
    injectCodeMirrorHook();
  }
});

