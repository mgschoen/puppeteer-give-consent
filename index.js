function handleSpiegelConsent(browserPage) {
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

function handleZeitConsent(browserPage) {
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
                if (!mutation[0].target.classList.contains('box--loading')) {
                    onConsentInitialized();
                }
            }

            const observationTarget = document.querySelector('.box.js-only');
            if (observationTarget.classList.contains('box--loading')) {
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
