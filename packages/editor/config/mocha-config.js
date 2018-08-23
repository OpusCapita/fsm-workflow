// required only by Mocha

// set node env
process.env.NODE_ENV = 'test';

const JSDOM = require('jsdom').JSDOM;

require('babel-register')({
  babelrc: false,
  presets: [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "ie >= 11", "safari >= 7", "Firefox ESR"]
      }
    }],
    "react"
  ],
  plugins: [
    "transform-decorators-legacy",
    "transform-class-properties",
    "transform-object-rest-spread"
  ],
  env: {
    test: {
      plugins: ["istanbul"]
    }
  }
})

global.document = new JSDOM('<!doctype html><html><body></body></html>');
global.window = global.document.window;
global.document = window.document;
global.navigator = global.window.navigator;
global.self = global.window;
