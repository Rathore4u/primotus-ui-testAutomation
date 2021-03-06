const retry = require('protractor-retry').retry;
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const configSetup = require('./default-config-setup');
const autoGeneratedFolderName = 'auto-generated';
let platform = '';
let browserName = '';
const commonConfigSetup = {
    onPrepareSetup() {
        retry.onPrepare();
        const origFn = browser.driver.controlFlow().execute;
        browser.driver.controlFlow().execute = function () {
            const args = arguments;
            origFn.call(browser.driver.controlFlow(), function () {
                //increase or reduce time value, its in millisecond
                return protractor.promise.delayed(5);
            });
            return origFn.apply(browser.driver.controlFlow(), args);
        };
        const log4js = require('log4js');
        const dateStamp = new Date().toUTCString().replace(/[^A-Z0-9]+/ig, '-').toLowerCase();
        log4js.configure({
            appenders: {
                multi: {
                    type: 'multiFile',
                    base: `${autoGeneratedFolderName}/logs/${(process.env.BUILD_NUMBER || dateStamp)}`,
                    property: 'categoryName',
                    extension: '.log',
                },
            },
            categories: {
                default: {appenders: ['multi'], level: 'all'},
            },
        });

        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json',
        });

        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: 'specs',
            },
        }));

        return browser.getCapabilities().then(function (cap) {
            platform = cap.get('platform');
            browserName = cap.get('browserName');
            browser.platform = platform;
            browser.browserName = browserName;
        });
    },
    allureReporterSetup() {
        const AllureReporter = require('jasmine-allure-reporter');
        const reporter = new AllureReporter({
            resultsDir: autoGeneratedFolderName + '/allure-results',
        });
        jasmine
            .getEnv()
            .addReporter(reporter);

        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64');
                }, 'image/png')();
                done();
            });
        });
    },
    configureAllReporters: function () {
        commonConfigSetup.allureReporterSetup();
        return commonConfigSetup.onPrepareSetup();
    },
    configureAllureReporters: function () {
        commonConfigSetup.allureReporterSetup();
        return commonConfigSetup.onPrepareSetup();
    },
    afterLaunch: function () {
        return retry.afterLaunch(configSetup.params.numberOfRetries);
    },
    onCleanUp: function (results) {
        retry.onCleanUp(results);
    },
};

module.exports = commonConfigSetup;
