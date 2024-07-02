<div align="center">
<img src="chrome-extension/public/icon-128.png" alt="logo"/>
<h1> Daedalus (DAY-dal-us) </h1>

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
