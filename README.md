# Key-Drop Extension

## Local development

Repo uses 1password secrets automation to avoid keeping secrets in plaintext.

### Prerequisites

- [1Password account](https://un7.1password.com/home)
- [1Password CLI](https://developer.1password.com/docs/cli/get-started/#install)
- [1Password app](https://1password.com/downloads/mac/)

## Getting Started

First, install the dependencies:

```bash
yarn install --frozen-lockfile
```
Get translations:
```bash
yarn trans:op
```
Next, run the development server:
```bash
yarn watch
```
## Loading the extension into browsers
- [Google Chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)
- [Opera](https://dev.opera.com/extensions/basics/)
- [Mozilla Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)

## Supported browsers
- **chromium** based browsers, e.g. Google Chrome, Brave, Opera, Opera GX
- **gecko** based browsers, e.g. Mozilla Firefox

## Available commands

### `yarn trans:op`
The command downloads translations from Nexus.

### `yarn build:quick`
The command builds the **dev** version of the extension for **chromium** based browsers, without downloading translations.

### `yarn watch`
The command watches the changes and builds the **dev** version of the extension for **chromium** based browsers, without downloading translations.

### `yarn build:op:dev:chromium`
The command builds the **dev** version of the extension for **chromium** based browsers, with downloading translations.

### `yarn build:op:prod:chromium`
The command builds the **prod** version of the extension for **chromium** based browsers, with downloading translations.

### `yarn build:op:dev:gecko`
The command builds the **dev** version of the extension for **gecko** based browsers, with downloading translations.

### `yarn build:op:prod:gecko`
The command builds the **prod** version of the extension for **gecko** based browsers, with downloading translations.
