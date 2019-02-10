const defaultConfigSetup = require('./core/config-setup/default-config-setup');
const reportersSetup = require('./core/config-setup/reporters-setup');
exports.config = {
  restartBrowserBetweenTests: defaultConfigSetup.restartBrowserBetweenTests,
  SELENIUM_PROMISE_MANAGER: defaultConfigSetup.SELENIUM_PROMISE_MANAGER,
  allScriptsTimeout: defaultConfigSetup.allScriptsTimeout,
  suites: defaultConfigSetup.suites,
  capabilities: defaultConfigSetup.capabilities,
  params: defaultConfigSetup.params,
  directConnect: true,
  baseUrl: defaultConfigSetup.baseUrl,
  framework: defaultConfigSetup.framework,
  jasmineNodeOpts: defaultConfigSetup.jasmineNodeOpts,
  onPrepare() {
    reportersSetup.configureAllReporters();
  },
};
