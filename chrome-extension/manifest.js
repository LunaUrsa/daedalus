import fs from 'node:fs';
const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  default_locale: 'en',
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: '__MSG_extensionName__',
  version: packageJson.version,
  description: '__MSG_extensionDescription__',
  permissions: [
    'storage',
    'sidePanel',
    'activeTab',
    'scripting',
    // 'downloads',
  ],
  side_panel: {
    default_path: 'sidepanel/index.html',
  },
  options_page: 'options/index.html',
  background: {
    service_worker: 'background.iife.js',
    type: 'module',
  },
  host_permissions: ['*://*.cpq.cloud.sap/*', '*://*.codemirror.net/*'],
  action: {
    default_popup: 'popup/index.html',
    default_icon: 'icon-34.png',
  },
  chrome_url_overrides: {
    newtab: 'newtab/index.html',
  },
  icons: {
    128: 'icon-128.png',
  },
  content_scripts: [
    {
      matches: ['*://*.cpq.cloud.sap/*', '*://*.codemirror.net/*'],
      js: ['content/index.iife.js'],
    },
    {
      matches: ['*://*.cpq.cloud.sap/*', '*://*.codemirror.net/*'],
      js: ['content-ui/index.iife.js'],
    },
    {
      matches: ['*://*.cpq.cloud.sap/*', '*://*.codemirror.net/*'],
      css: ['content.css'],
    },
  ],
  // devtools_page: 'devtools/index.html',
  web_accessible_resources: [
    {
      resources: ['*.js', '*.css', '*.svg', 'icon-128.png', 'icon-34.png'],
      matches: ['*://*/*'],
    },
  ],
  // "content_security_policy": {
  //   // content_scripts: "script-src 'self' 'unsafe-inl ine' 'unsafe-eval' 'wasm-unsafe-eval' 'inline-speculation-rules' http://localhost:* http://127.0.0.1:*; object-src 'self'",
  //   // extension_pages: "script-src 'self' 'unsafe-eval'; ob ject-src 'self' ;",
  //   // sandbox: "sandbox allow-scripts allow-forms allow-popups allow-m odals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self';"
  // },
  commands: {
    "_execute_action": {
      suggested_key: {
        default: 'Ctrl+Tab',
        mac: 'Command+Tab',
      },
      description: "Open the extension"
    },
    'Open Shortcuts': {
      suggested_key: {
        default: 'Ctrl+Space',
        mac: 'Command+Space',
      },
      description: 'Opens the shortcut page.',
    },
    // "Open Mods": {
    //   suggested_key: {
    //     default: 'Ctrl+Shift+M',
    //     mac: 'Command+Shift+M',
    //   },
    //   "description": "Opens the mods page."
    // },
    // "Open Formulas": {
    //   suggested_key: {
    //     default: 'Ctrl+Shift+F',
    //     mac: 'Command+Shift+F',
    //   },
    //   "description": "Opens the formula formatter page."
    // },
    // "Open Options": {
    //   suggested_key: {
    //     default: 'Ctrl+Shift+O',
    //     mac: 'Command+Shift+O',
    //   },
    //   "description": "Opens the options page."
    // },
    // "Open Info": {
    //   suggested_key: {
    //     default: 'Ctrl+Shift+I',
    //     mac: 'Command+Shift+I',
    //   },
    //   "description": "Opens the info page."
    // },
  },
  // "content_security_policy": {
  //   "extension_pages": "script-src 'self' ; object-src 'self';",
  //   "content_scripts": "script-src 'self' 'unsafe-inline'; object-src 'self';"
  // }
};

export default manifest;
