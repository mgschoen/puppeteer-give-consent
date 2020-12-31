function createClickFunction(browserPage) {
    return function(selector) {
        this.click(selector)
    }.bind(browserPage);
}

async function exposeClickFunction(browserPage) {
    let existingFunction = await browserPage.evaluate(() => {
        return window.puppeteerClickElement;
    });
    if (!existingFunction) {
        browserPage.exposeFunction('puppeteerClickElement', createClickFunction(browserPage));
    }
}

async function handleSpiegelConsent(browserPage) {
    await exposeClickFunction(browserPage);
    return new Promise(resolve => {
        browserPage.once('load', resolve);
        browserPage.evaluate(() => {

            function onConsentInitialized() {
                window.setTimeout(() => {
                    console.log('clicking with puppeteer', '[data-consent-el="acceptAllButton"]');
                    window.puppeteerClickElement('[data-consent-el="acceptAllButton"]');
                }, 500);
            }

            function onMutation(mutation) {
                console.log(mutation);
                if (!mutation[0].target.classList.contains('hidden')) {
                    onConsentInitialized();
                }
            }

            const observationTarget = document.querySelector('[data-consent-el="message"]');
            if (observationTarget.classList.contains('hidden')) {
                console.log('still loading');
                const mutationObserver = new MutationObserver(onMutation);
                mutationObserver.observe(observationTarget, { attributes: true });
            } else {
                console.log('already loaded');
                onConsentInitialized();
            }
        });
    });
}

async function handleZeitConsent(browserPage) {
    await exposeClickFunction(browserPage);
    return new Promise(resolve => {
        browserPage.once('load', resolve);
        browserPage.evaluate(function() {

            function onConsentInitialized() {
                window.setTimeout(() => {
                    console.log('clicking with puppeteer', '.box__accbtn');
                    window.puppeteerClickElement('.box__accbtn');
                }, 500);
            }

            function onMutation(mutation) {
                console.log(mutation);
                if (!mutation[0].target.classList.contains('option--loading')) {
                    onConsentInitialized();
                }
            }

            const observationTarget = document.querySelector('.option.option--tcf.js');
            if (observationTarget.classList.contains('option--loading')) {
                console.log('still loading');
                const mutationObserver = new MutationObserver(onMutation);
                mutationObserver.observe(observationTarget, { attributes: true });
            } else {
                console.log('already loaded');
                onConsentInitialized();
            }
        });
    });
}

module.exports = {
    handleSpiegelConsent,
    handleZeitConsent
}
