'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;
exports.loadFsmSuccess = loadFsmSuccess;
exports.loadFsmFail = loadFsmFail;
exports.loadFsm = loadFsm;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _stateNodes = require('./state-nodes');

var _transitions = require('./transitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOAD_FSM = 'fsm/fsm/LOAD_FSM';
var LOAD_FSM_SUCCESS = 'fsm/fsm/LOAD_FSM_SUCCESS';
var LOAD_FSM_FAIL = 'fsm/fsm/LOAD_FSM_FAIL';

var initialState = {
  "meta": {
    "name": "Sample name",
    "description": "Sample desc",
    "id": "Sample id",
    "parentId": null,
    "changedOn": "1495118748919",
    "changedBy": "admin"
  },
  "loading": false,
  "loaded": false,
  "error": false
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case LOAD_FSM:
      return Object.assign({}, state, { 'loading': true });
    case LOAD_FSM_SUCCESS:
      return Object.assign({}, state, {
        'meta': Object.assign({}, action.value),
        'loading': false,
        'loaded': true,
        'error': null
      });
    case LOAD_FSM_FAIL:
      return Object.assign({}, state, {
        'loading': false,
        'loaded': false,
        'error': action.error
      });
      return _extends({}, state, { loading: false, loaded: false, error: action.error });
    default:
      return state;
  }
}

function loadFsmSuccess(value) {
  return { type: LOAD_FSM_SUCCESS, value: value };
}

function loadFsmFail(error) {
  return { type: LOAD_FSM_FAIL, error: error };
}

function loadFsm(id) {
  return function (dispatch) {
    return _superagent2.default.get('http://localhost:3020/machines/' + id).then(function (result) {
      dispatch(loadFsmSuccess(result.body.meta));

      dispatch((0, _transitions.replaceTransitions)(result.body.data.transitions));
      dispatch((0, _stateNodes.replaceStateNodes)(result.body.data.states));
    }).catch(function (error) {
      dispatch(loadFsmFail(error));
    });
  };
}