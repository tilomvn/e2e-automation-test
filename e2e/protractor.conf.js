const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');
var HtmlReporter = require('protractor-angular-screenshot-reporter');
var path = require('path');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 1440000,

  specs: [
    // './src/**/*.e2e-spec.ts'                        // all test
    './src/**/login.e2e-spec.ts',                    // login test
    //'./src/**/login-failed.e2e-spec.ts',                    // login failed
  ],

  suites: {
    //full: './src/**/*.e2e-spec.ts',                                     // all test
    //login: './src/e2e-tests/login/*.e2e-spec.ts',                       // login full test
  },

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ["--window-size=1920,1080"]
      // 'args': ['show-fps-counter=true', "--window-size=1920,1080"]
      // 'args': [ "--headless", "--disable-gpu", "--window-size=1920,1080" ]
    },
    'goog:chromeOptions': {
      w3c: false
    }
  },

  // capabilities: {
  //   'browserName': 'firefox',
  //   'moz:firefoxOptions': {
  //     // args: ['--verbose'],
  //     binary: 'C:/Users/anh.ta/AppData/Local/Mozilla Firefox/firefox.exe',
  //     'args': ['--safe-mode']
  //     //  'args': [ "--headless" ]
  //   }
  // },
  // multiCapabilities: [{
  //   'browserName': 'firefox'
  // }, {
  //   'browserName': 'chrome'
  // }],

  restartBrowserBetweenTests: false,
  //directConnect: true,
  seleniumAddress: 'http://localhost:4444/wd/hub/',
  //baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  // noGlobals: true,

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 1440000,
    print: function () { }
  },

  onPrepare() {
    require('ts-node').register({
      project: path.join(__dirname, './tsconfig.json')
    });

    //reset report
    require('fs').rmdirSync(path.join(__dirname, './report'), { recursive: true, force: true });

    // stack
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: StacktraceOption.PRETTY,
        displayDuration: true,
      }
    }));

    // html reporter
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: require('path').join(__dirname, './report'),
      docName: 'index.html',
      docTitle: 'DD-e2e-testing-report',
      preserveDirectory: false,
      //takeScreenShotsOnlyForFailedSpecs: true,
      //takeScreenShotsForSkippedSpecs: true,
    }).getJasmine2Reporter());
  }
};
