# puppeteer-give-consent

Functions for giving tracking consent on German news media websites

## Description

Some German news websites offer so called "Pur" subscriptions. Users can either choose to subscribe and not see any ads, or give full consent to thirdparty tracking and keep browsing for free. These subscriptions come with prerolled consent pages that force users to choose one of the options.

Puppeteer gets redirected there, too. In. Every. Single. Run. This package offers functions that help you get past consent pages quickly, when you just want to access the website programatically.

## Usage

At the moment, only www.zeit.de and www.spiegel.de have consent pages. Each of them has their own function for giving consent. In general, you use them like so:

```js
const puppeteer = require('puppeteer');
const { handleZeitConsent} = require('puppeteer-give-consent');

const browser = await puppeteer.launch(options);
const page = await browser.newPage();
await browserPage.goto('https://www.zeit.de/index');
await handleZeitConsent(page);

// keep on browsing www.zeit.de
```

### Function names

* www.zeit.de: `handleZeitConsent(page)`
* www.spiegel.de: `handleSpiegelConsent(page)`
