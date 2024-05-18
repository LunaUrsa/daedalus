<div align="center">
<img src="chrome-extension/public/icon-128.png" alt="logo"/>
<h1> Chrome Extension Boilerplate with<br/>React + Vite + TypeScript</h1>

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![](https://badges.aleen42.com/src/vitejs.svg)
![GitHub action badge](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/actions/workflows/build-zip.yml/badge.svg)
<img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/Jonghakseo/chrome-extension-boilerplate-react-viteFactions&count_bg=%23#222222&title_bg=%23#454545&title=😀&edge_flat=true" alt="hits"/>

> This boilerplate has [Legacy version](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/tree/legacy)

</div>

> [!TIP]
> This project is listed in the [Awesome Vite](https://github.com/vitejs/awesome-vite)

> [!IMPORTANT]
> Share storage state between every page
> 
> https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/assets/53500778/1992e46c-032a-4743-bbd2-c421757517d7


## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Structure](#structure)
    - [ChromeExtension](#chrome-extension)
    - [Packages](#packages)
    - [Pages](#pages)
- [Install](#install)
    - [Procedures](#procedures)
        - [Chrome](#chrome)
        - [Firefox](#firefox)
- [Reference](#reference)
- [Star History](#starhistory)
- [Contributors](#contributors)

## Intro <a name="intro"></a>

This boilerplate is made for creating chrome extensions using React and Typescript.
> The focus was on improving the build speed and development experience with Vite(Rollup) & Turborepo.

## Features <a name="features"></a>

- [React18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Turborepo](https://turbo.build/repo)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- Custom HMR(Hot Module Rebuild) Plugin

## Install <a name="install"></a>

## Procedures: <a name="procedures"></a>

1. Clone this repository.
2. Change `extensionDescription` and `extensionName` in `messages.json` file.
3. Install pnpm globally: `npm install -g pnpm` (check your node version >= 18.12.0)
4. Run `pnpm install`

## And next, depending on the needs:

### For Chrome: <a name="chrome"></a>

1. Run:
    - Dev: `pnpm dev-server` & `pnpm dev` (parallel run)
      - When you run with Windows, you should run as administrator. [(Issue#456)](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/456)
    - Prod: `pnpm build`
2. Open in browser - `chrome://extensions`
3. Check - `Developer mode`
4. Find and Click - `Load unpacked extension`
5. Select - `dist` folder at root

### For Firefox: <a name="firefox"></a>

1. Run:
    - Dev: `pnpm dev-server` & `pnpm dev:firefox` (parallel run)
    - Prod: `pnpm build:firefox`
2. Open in browser - `about:debugging#/runtime/this-firefox`
3. Find and Click - `Load Temporary Add-on...`
4. Select - `manifest.json` from `dist` folder at root

### <i>Remember in firefox you add plugin in temporary mode, that's mean it's disappear after close browser, you must do it again, on next launch.</i>


## Structure <a name="structure"></a>

### ChromeExtension <a name="chrome-extension"></a>

Main app with background script, manifest

- `manifest.js` - manifest for chrome extension   
- `lib/background` - [background script](https://developer.chrome.com/docs/extensions/mv3/background_pages/) for chrome extension (`background.service_worker` in
  manifest.json)   
- `public/content.css` - content css for user's page injection

### Packages <a name="packages"></a>

Some shared packages

- `dev-utils` - utils for chrome extension development (manifest-parser, logger)
- `hmr` - custom HMR plugin for vite, injection script for reload/refresh, hmr dev-server
- `shared` - shared code for entire project. (types, constants, custom hooks, components, etc.)
- `tsconfig` - shared tsconfig for entire project.

### Pages <a name="pages"></a>

- `content` - [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) for chrome extension (`content_scripts` in manifest.json)
- `content-ui` - [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) for render UI in user's page (`content_scripts` in manifest.json)
- `devtools` - [devtools](https://developer.chrome.com/docs/extensions/mv3/devtools/#creating) for chrome extension (`devtools_page` in manifest.json)
- `devtools-panel` - devtools panel for [devtools](pages/devtools/src/index.ts)
- `newtab` - [new tab](https://developer.chrome.com/docs/extensions/mv3/override/) for chrome extension (`chrome_url_overrides.newtab` in
  manifest.json)
- `options` - [options](https://developer.chrome.com/docs/extensions/mv3/options/) for chrome extension (`options_page` in manifest.json)
- `popup` - [popup](https://developer.chrome.com/docs/extensions/reference/browserAction/) for chrome extension (`action.default_popup` in
  manifest.json)
- `sidepanel` - [sidepanel(Chrome 114+)](https://developer.chrome.com/docs/extensions/reference/sidePanel/) for chrome extension (`side_panel.default_path` in manifest.json)

## Reference <a name="reference"></a>

- [Vite Plugin](https://vitejs.dev/guide/api-plugin.html)
- [ChromeExtension](https://developer.chrome.com/docs/extensions/mv3/)
- [Rollup](https://rollupjs.org/guide/en/)
- [Turborepo](https://turbo.build/repo/docs)
- [Rollup-plugin-chrome-extension](https://www.extend-chrome.dev/rollup-plugin)

## Star History <a name="starhistory"></a>

[![Star History Chart](https://api.star-history.com/svg?repos=Jonghakseo/chrome-extension-boilerplate-react-vite&type=Date)](https://star-history.com/#Jonghakseo/chrome-extension-boilerplate-react-vite&Date)

## Contributors <a name="contributors"></a>

This Boilerplate is made possible thanks to all of its contributors.

<a href="https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/graphs/contributors">
  <img width="500px" src="https://contrib.rocks/image?repo=Jonghakseo/chrome-extension-boilerplate-react-vite" />
</a>

---

## Special Thanks To

| <a href="https://jb.gg/OpenSourceSupport"><img width="40" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" alt="JetBrains Logo (Main) logo."></a> | <a href="https://www.linkedin.com/in/j-acks0n"><img width="40" style="border-radius:50%" src='https://avatars.githubusercontent.com/u/23139754' alt='Jackson Hong'/></a> |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

---

Made by [Jonghakseo](https://nookpi.tistory.com/)


### TODO

## Extension
* make it so the last visited page is what pops up when you activate the extension

#### All
* Cursor doesnt show on some themes?

#### CPQ
* Make the formula creator window size better
* Determine where something is used before it's deleted
* Save and continue button for certain items x2
* Containers
* When you save in workflow it takes you to the wrong tab
* Autocomplete commands
* Document Live Editor
* Production warning

## Framework and Libraries
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
We use Material design components from [Material-UI](https://material-ui.com/).
We use [React Router](https://reactrouter.com/) for routing.
We use symantic-versioning for versioning.

## Angular Commit Message Conventions

This project uses Angular Commit Message Conventions for commit messages. This is to ensure that the commit messages are easy to read and follow a consistent format, and allow automatic versioning. The commit message should be structured as follows:

> <type>(<scope>): <subject>
> <BLANK LINE>
> <body>
> <BLANK LINE>
> <footer>

Type: This describes the kind of change that the commit makes. Common types include:
    feat: A new feature for the user, not a new feature for a build script.
    fix: A bug fix for the user, which can be a correction in the source code or associated documentation.
    docs: Documentation only changes.
    style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
    refactor: A code change that neither fixes a bug nor adds a feature.
    perf: A code change that improves performance.
    test: Adding missing tests or correcting existing tests.
    chore: Changes to the build process or auxiliary tools and libraries such as documentation generation.

Scope (optional): A scope provides additional contextual information. It could be anything specifying the location of the commit change (e.g., login, core, user-dashboard, etc.).

Subject: The subject contains a succinct description of the change:
    Use the imperative, present tense: "change", not "changed" nor "changes".
    Don't capitalize the first letter.
    No dot (.) at the end.

Body (optional): The body should include a detailed description of the change:
    Use the imperative, present tense: "fix", not "fixed" nor "fixes".
    Should include motivation for the change and contrast this with previous behavior.

Footer (optional): The footer is used to reference issue tracker IDs, link pull requests, or provide notes that do not fit in the body:
    BREAKING CHANGE: A footer that starts with BREAKING CHANGE: followed by a description indicates a breaking change that suggests a major version bump if this is part of an automated versioning scheme.0

# The issue with injecting scripts
First of all, allowing the extension to inject scripts into a web page is a security risk. Imagine if someone malicious found a way to store a malicious script in the extension and then inject it into a web page. This could be used to steal sensitive information from the user, or to perform other malicious actions.

If think you can address this and want to continue, see my notes below on why this is not even possible:

To inject scripts into a web page, you should use the chrome.scripting.executeScript API. This API allows you to inject scripts into a page, and it is the recommended way to do so. The chrome.tabs.executeScript API is deprecated and should not be used.

To use the executeScript API you must pass in a tab ID
https://developer.chrome.com/docs/extensions/reference/api/scripting#injection_targets

To get a tab ID you need to use the chrome.tabs.query API. This API allows you to query for tabs that match a given set of criteria. You can use this API to get the tab ID of the current tab, or you can use it to get the tab ID of a specific tab.

To use the tabs.query API you need to be in a service worker (background.js) or an extension page (popup.js, options.js, etc.). You cannot use this API in a content script.
https://developer.chrome.com/docs/extensions/reference/api/tabs

So we need to run the chrome.tabs.query in the background.js and then pass the tab ID to the executeScript function. This is the only way to inject scripts into a web page, and this would be great, except we have user-defined scripts that are stored as strings. We can't pass a string to the executeScript function, we need to pass a file path.

I've tried various ways to get around this, like "new function('code')" and "eval(code)" but it seems like chrome has locked this down pretty good

I'm sure there's a way to do this, because Tapermonkey does this, but I'm not sure how, and at this point ive spent a few days on this so I'm going to move on to other things.  

