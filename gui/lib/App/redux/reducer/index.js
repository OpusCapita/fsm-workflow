'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _viewport = require('./viewport');

var _viewport2 = _interopRequireDefault(_viewport);

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _fsm = require('./fsm');

var _fsm2 = _interopRequireDefault(_fsm);

var _stateNodes = require('./state-nodes');

var _stateNodes2 = _interopRequireDefault(_stateNodes);

var _selectedItem = require('./selected-item');

var _selectedItem2 = _interopRequireDefault(_selectedItem);

var _transitions = require('./transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _transitionsMeta = require('./transitions-meta');

var _transitionsMeta2 = _interopRequireDefault(_transitionsMeta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  fsm: _fsm2.default,
  viewport: _viewport2.default,
  layout: _layout2.default,
  stateNodes: _stateNodes2.default,
  selectedItem: _selectedItem2.default,
  transitions: _transitions2.default,
  transitionsMeta: _transitionsMeta2.default
});