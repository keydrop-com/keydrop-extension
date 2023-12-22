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
- [Mozilla Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)

## Supported browsers
- **chromium** based browsers, e.g. Google Chrome, Brave, Opera, Opera GX
- **gecko** based browsers, e.g. Mozilla Firefox

## Available commands

### `yarn build:quick`
The command builds the **dev** version of the extension for **chromium** based browsers.

### `yarn dev`
The command watches the changes and builds the **dev** version of the extension for **chromium** based browsers.

### `yarn build:dev:chromium`
The command builds the **dev** version of the extension for **chromium** based browsers.

### `yarn build:prod:chromium`
The command builds the **prod** version of the extension for **chromium** based browsers.

### `yarn build:dev:gecko`
The command builds the **dev** version of the extension for **gecko** based browsers.

### `yarn build:prod:gecko`
The command builds the **prod** version of the extension for **gecko** based browsers.
