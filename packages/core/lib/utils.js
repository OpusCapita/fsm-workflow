'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flattenParams = exports.flattenParams = function flattenParams() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return params.reduce(function (params, _ref) {
    var name = _ref.name,
        value = _ref.value;
    return _extends({}, params, _defineProperty({}, name, value));
  }, {});
};

var evaluateGuard = exports.evaluateGuard = function evaluateGuard(_ref2) {
  var guard = _ref2.guard,
      params = _ref2.params;

  try {
    return !!eval( // eslint-disable-line no-eval
    '\n        (function(arg) {\n          ' + Object.keys(params).map(function (key) {
      return 'var ' + key + ' = arg[' + JSON.stringify(key) + '];';
    }).join('\n') + '\n          return (' + guard + ')\n        })\n      ')(params);
  } catch (err) {
    return false; // TBD throw or return false?
  }
};