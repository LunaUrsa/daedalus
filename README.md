<div align="center">
<img src="chrome-extension/public/icon-128.png" alt="logo"/>
<h1> SAP CPQ Tools</h1>

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![](https://badges.aleen42.com/src/vitejs.svg)
![GitHub action badge](https://github.com/LunaUrsa/sap-cpq-tools/actions/workflows/build-and-release.yml/badge.svg)

</div>

> [!IMPORTANT]
> This project is open source. Like it? Show your support by starring the repository.
> If you're using it, let me know, encouragement goes a long way, and changes are made based on feedback.
> You may also be a developer, check below for information on how to contribute

## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Install](#install)
- [Development](#structure)

## Intro <a name="intro"></a>

Of all the CPQ systems, SAP CPQ certainly is one of them. This extension is designed to make the experience of using SAP CPQ better. It's created as an extension since that's how we all interact with SAP anyway, and this allows easy updates and changes to be made.

## Features <a name="Features"></a>
1. Shortcuts to various pages, no more clicking around
2. Mods to the UI to make it easier to use
3. Formula formatter to make formulas easier to read
4. More to come!

## Install <a name="install"></a>
1. Go to the [releases page](https://github.com/LunaUrsa/sap-cpq-tools/releases) and download the latest release zip
2. Unzip the file

> [!IMPORTANT]
> This should be temporary while i figure out how to get this on the chrome store

### For Chrome: <a name="chrome"></a>
1. Open in browser - `chrome://extensions`
3. Check - `Developer mode`
4. Find and Click - `Load unpacked extension`
5. Open the folder you unzipped

### For Firefox: <a name="firefox"></a>
1. Open in browser - `about:debugging#/runtime/this-firefox`
3. Find and Click - `Load Temporary Add-on...`
4. Select - `manifest.json` from folder you unzipped

### <i>Remember in firefox you add plugin in temporary mode, that's mean it's disappear after close browser, you must do it again, on next launch.</i>

## Development <a name="features"></a>
This plugin is built using:
- [React18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Material-UI](https://material-ui.com/)
- [Vite](https://vitejs.dev/)
- [Turborepo](https://turbo.build/repo)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Semantic Versioning](https://semver.org/)
- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Chrome Extension Boilerplate](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite)

## Structure <a name="structure"></a>
Check out - [Chrome Extension Boilerplate](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite) for full details.

## Want to help?
Run `pnpm dev` (it's run parallel with pnpm dev-server automatically)
- When you run with Windows, you should run as administrator. (Issue#456)

Then follow the above install instructions

## Angular Commit Message Conventions

This project uses Angular Commit Message Conventions for commit messages. This is to ensure that the commit messages are easy to read and follow a consistent format, and allow automatic versioning. The commit message should be structured as follows:

**Type**: This describes the kind of change that the commit makes. Common types include:
* feat: A new feature for the user, not a new feature for a build script.
* fix: A bug fix for the user, which can be a correction in the source code or associated documentation.
* docs: Documentation only changes.
* style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
* refactor: A code change that neither fixes a bug nor adds a feature.
* perf: A code change that improves performance.
* test: Adding missing tests or correcting existing tests.
* chore: Changes to the build process or auxiliary tools and libraries such as documentation generation.

**Scope** (optional): A scope provides additional contextual information. It could be anything specifying the location of the commit change (e.g., login, core, user-dashboard, etc.).

**Subject**: The subject contains a succinct description of the change:
    Use the imperative, present tense: "change", not "changed" nor "changes".
    Don't capitalize the first letter.
    No dot (.) at the end.

**Body** (optional): The body should include a detailed description of the change:
    Use the imperative, present tense: "fix", not "fixed" nor "fixes".
    Should include motivation for the change and contrast this with previous behavior.

**Footer** (optional): The footer is used to reference issue tracker IDs, link pull requests, or provide notes that do not fit in the body:
    BREAKING CHANGE: A footer that starts with BREAKING CHANGE: followed by a description indicates a breaking change that suggests a major version bump if this is part of an automated versioning scheme.

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

### TODO

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