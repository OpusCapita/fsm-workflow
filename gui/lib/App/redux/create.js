'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStore;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _clientMiddleware = require('./clientMiddleware');

var _clientMiddleware2 = _interopRequireDefault(_clientMiddleware);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _reduxLogger.createLogger)({
  predicate: function predicate(a, action) {
    var pass = action.type === 'fsm/viewport/UPDATE_CURSOR_POSITION' || action.type === 'fsm/viewport/UPDATE_VIEWPORT_PAN_OFFSET';
    if (pass) {
      return false;
    }
    return true;
  },
  duration: true,
  level: 'warn'
  // diff: true
  // ...options
});

function createStore(client, data) {
  var middleware = [(0, _clientMiddleware2.default)(client), _reduxThunk2.default];
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
  var store = (0, _redux.createStore)(_reducer2.default, data || undefined, composeEnhancers(_redux.applyMiddleware.apply(undefined, middleware)));

  return store;
}