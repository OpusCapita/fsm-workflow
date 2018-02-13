'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.updateStateNode = updateStateNode;
exports.deleteStateNode = deleteStateNode;
exports.replaceStateNodes = replaceStateNodes;

var _transitions = require('./transitions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CREATE_STATE_NODE = 'fsm/state-nodes/CREATE_STATE_NODE';
var UPDATE_STATE_NODE = 'fsm/state-nodes/UPDATE_STATE_NODE';
var DELETE_STATE_NODE = 'fsm/state-nodes/DELETE_STATE_NODE';
var REPLACE_STATE_NODES = 'fsm/state-nodes/REPLACE_STATE_NODES';

var initialState = {};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case CREATE_STATE_NODE:
      return state;
    case UPDATE_STATE_NODE:
      var stateNode = Object.assign({}, state[action.key], action.value);
      return Object.assign({}, state, _defineProperty({}, action.key, stateNode));
    case DELETE_STATE_NODE:
      var newState = Object.assign({}, state, _defineProperty({}, action.key, undefined));
      delete newState[action.key];
      return newState;
    case REPLACE_STATE_NODES:
      return action.value;
    default:
      return state;
  }
}

function updateStateNode(key, value) {
  return function (dispatch, getState) {
    dispatch({ type: UPDATE_STATE_NODE, key: key, value: value });
    dispatch((0, _transitions.snapStateNodePoints)(getState));
  };
}

function deleteStateNode(key) {
  return { type: DELETE_STATE_NODE, key: key };
}

function replaceStateNodes(value) {
  return { type: REPLACE_STATE_NODES, value: value };
}