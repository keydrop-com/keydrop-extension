# Key-Drop Extension

## Requirements
- nodejs >= 18.19.0
- yarn >= 1.22.19

## Getting Started

First, install the dependencies:

```bash
yarn install --frozen-lockfile
```
Next, run the development server:
```bash
yarn dev
```
## Loading the extension into browsers
- [Google Chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)
- [Opera](https://dev.opera.com/extensions/basics/)
- [Mozilla Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing) - for an extension loaded this way to work properly in Firefox, **you need to grant all permissions** in [about:addons](about:addons)


## Supported browsers
- **chromium** based browsers, e.g. Google Chrome, Brave, Opera, Opera GX
- **gecko** based browsers, e.g. Firefox

## Available commands

### `yarn build`
The command builds the **dev** version of the extension for **chromium** based browsers.

### `yarn dev`
The command watches the changes and builds the **dev** version of the extension for **chromium** based browsers.

### `yarn build:chromium`
The command builds the **dev** version of the extension for **chromium** based browsers.

### `yarn build:chromium:prod`
The command builds the **prod** version of the extension for **chromium** based browsers.

### `yarn build:gecko`
The command builds the **dev** version of the extension for **gecko** based browsers.

### `yarn build:gecko:prod`
The command builds the **prod** version of the extension for **gecko** based browsers.
