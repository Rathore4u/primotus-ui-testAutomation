const setupUtilities = require('./setup-utilities');
const maxBrowserInstances = process.env.MAX_INSTANCES || setupUtilities.getParam(5, '--params.maxInstances', false);
const useHeadlessBrowser = process.env.HEADLESS_BROWSER || setupUtilities.toBoolean(setupUtilities.getParam(false, '--params.headlessBrowser', false));
const numberOfRetries = process.env.NUMBER_OF_RETRIES || (setupUtilities.getParam(3, '--params.numberOfRetries', false));
const chromeHeadlessArgs =
    ['--headless',
        '--window-size=1280x800',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--acceptInsecureCerts'];

/*  ABOUT --disable-dev-shm-usage:
    By default, Docker runs a container with a /dev/shm shared memory space 64MB.
    This is typically too small for Chrome and will cause Chrome to crash when rendering large pages.
    To fix, run the container with docker run --shm-size=1gb to increase the size of /dev/shm.
    Since Chrome 65, this is no longer necessary. Instead, launch the browser with the --disable-dev-shm-usage flag
    sources:
        - https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
        - https://developers.google.com/web/tools/puppeteer/troubleshooting
*/
const chromeOptions = {
    args: useHeadlessBrowser ? chromeHeadlessArgs : [],
    // Set download path and avoid prompting for download even though
    // this is already the default on Chrome but for completeness
    prefs: {
        'download': {
            'prompt_for_download': false,
            'directory_upgrade': true,
            'default_directory': 'Downloads',
        },
    },
};
const configSetup = {
    numberOfRetries: numberOfRetries,
    restartBrowserBetweenTests: false,
    SELENIUM_PROMISE_MANAGER: false,
    multiCapabilities: [{
        browserName: 'chrome',
        'chromeOptions': chromeOptions,
        shardTestFiles: 'true',
        maxInstances: maxBrowserInstances,
        acceptInsecureCerts: true,
    }],
    allScriptsTimeout: 300000,
    suites: {
        tests: './e2e/test-suites/test/**/*.e2e-spec.ts',
    },
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': chromeOptions,
        acceptInsecureCerts: true,
    },
    params: {
        numberOfRetries: numberOfRetries,
        verboseLogging: process.env.ENABLE_VERBOSE_LOGGING || setupUtilities.getParam(false, '--params.enableVerboseLogging', false),
        maxInstances: 5,
        maxSessions: 5,
        users: {
            adminUser: {
                email: 'qa5test@mailinator.com',
                password: 'Prim0tus!',
            },
        },
        selenium: {
            hub: process.env.SELENIUM_URL || setupUtilities.getParam('http://10.69.8.112:4444/wd/hub', '--params.selenium.hub', false),
        },
        language: process.env.LANGUAGE || setupUtilities.getParam('French', '--params.language', false),
    },
    baseUrl: 'https://qa2.primotus.com/admin/forms/9862/multi',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 300000,
        print: function () {
        },
    },
};
module.exports = configSetup;
