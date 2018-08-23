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

//
// Mock Canvas / Context2D calls
//
function mockCanvas(window) {
  // eslint-disable-next-line no-param-reassign
  window.HTMLCanvasElement.prototype.getContext = function() {
    return {
      fillRect: function() { },
      clearRect: function() { },
      getImageData: function(x, y, w, h) {
        return {
          data: new Array(w * h * 4)
        };
      },
      putImageData: function() { },
      createImageData: function() { return [] },
      setTransform: function() { },
      drawImage: function() { },
      save: function() { },
      fillText: function() { },
      restore: function() { },
      beginPath: function() { },
      moveTo: function() { },
      lineTo: function() { },
      closePath: function() { },
      stroke: function() { },
      translate: function() { },
      scale: function() { },
      rotate: function() { },
      arc: function() { },
      fill: function() { },
      measureText: function() {
        return { width: 0 };
      },
      transform: function() { },
      rect: function() { },
      clip: function() { },
    };
  }
  // eslint-disable-next-line no-param-reassign
  window.HTMLCanvasElement.prototype.toDataURL = function() {
    return "";
  }
}

mockCanvas(global.window);
