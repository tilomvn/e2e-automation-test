// @ts-check
var defaultConfig = require('./protractor.conf');
var devConfig = {
  baseUrl: 'https://github.com/'
};
exports.config = Object.assign(defaultConfig.config, devConfig);
