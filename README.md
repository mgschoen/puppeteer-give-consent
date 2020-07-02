# puppeteer-give-consent

Functions for giving tracking consent on German news media websites

## Description

Some German news websites offer so called "Pur" subscriptions. Users can either choose to subscribe and not see any ads, or give full consent to thirdparty tracking and keep surfing for free. Users that haven't decided yet are usually redirected to a consent page, where they have to choose before seeing the actual page.

Puppeteer also ends up seeing these pages. In every. Single. Run. If you just want to get past those pages, this package is for you. It offers functions that give consent for you, so you can keep on scraping happily ;)

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
