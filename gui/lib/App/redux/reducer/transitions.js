'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.createTransition = createTransition;
exports.updateTransition = updateTransition;
exports.deleteTransition = deleteTransition;
exports.replaceTransitions = replaceTransitions;
exports.snapTransitions = snapTransitions;
exports.snapStateNodePoints = snapStateNodePoints;

var _svgUtils = require('../../../../svg-utils');

var _selectedItem = require('./selected-item');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CREATE_TRANSITION = 'fsm/transitions/CREATE_TRANSITION';
var UPDATE_TRANSITION = 'fsm/transitions/UPDATE_TRANSITION';
var DELETE_TRANSITION = 'fsm/transitions/DELETE_TRANSITION';
var REPLACE_TRANSITIONS = 'fsm/transitions/REPLACE_TRANSITIONS';

var initialState = {};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case CREATE_TRANSITION:
      return Object.assign({}, state, _defineProperty({}, action.key, action.value));
    case UPDATE_TRANSITION:
      var transition = Object.assign({}, state[action.key], action.value);
      return Object.assign({}, state, _defineProperty({}, action.key, transition));
    case DELETE_TRANSITION:
      var newState = Object.assign({}, state, _defineProperty({}, action.key, undefined));;
      delete newState[action.key];
      return newState;
    case REPLACE_TRANSITIONS:
      return action.value;
    default:
      return state;
  }
}

function createTransition(key, value) {
  return { type: CREATE_TRANSITION, key: key, value: value };
}

function updateTransition(key, value) {
  return function (dispatch, getState) {
    dispatch({ type: UPDATE_TRANSITION, key: key, value: value });
    dispatch(snapTransitions(getState));
  };
}

function deleteTransition(key) {
  return { type: DELETE_TRANSITION, key: key };
}

function replaceTransitions(value) {
  return { type: REPLACE_TRANSITIONS, value: value };
}

function snapTransitions(getState) {
  var state = getState();
  var transitions = state.transitions;
  var stickyPoints = state.viewport.stickyPoints;
  var snapDistance = state.viewport.snapDistance;
  var newTransitions = Object.keys(transitions).reduce(function (accum, transitionKey) {
    var transition = transitions[transitionKey];

    var points = [].concat(_toConsumableArray(transition.points));
    var bezierPoint1 = (0, _svgUtils.snapPoint)(points[0], points[1], stickyPoints, snapDistance);
    var bezierPoint4 = (0, _svgUtils.snapPoint)(points[6], points[7], stickyPoints, snapDistance);
    points[0] = bezierPoint1[0];
    points[1] = bezierPoint1[1];
    points[6] = bezierPoint4[0];
    points[7] = bezierPoint4[1];
    var newTransition = Object.assign({}, transition, { points: points });

    return Object.assign({}, accum, _defineProperty({}, transitionKey, newTransition));
  }, {});

  return { type: REPLACE_TRANSITIONS, value: newTransitions };
}

function snapStateNodePoints(getState) {
  var state = getState();
  var transitions = state.transitions;
  var stickyPoints = state.viewport.stickyPoints;
  var newTransitions = Object.keys(transitions).reduce(function (accum, transitionKey) {
    var transition = transitions[transitionKey];

    if (!(transition.from || transition.to)) {
      return accum;
    }

    var points = [].concat(_toConsumableArray(transition.points));
    var snapPoint1Key = _selectedItem.ITEM_TYPES.STATE + '.' + transition.from + '.' + transition.fromPoint;
    var snapPoint2Key = _selectedItem.ITEM_TYPES.STATE + '.' + transition.to + '.' + transition.toPoint;
    var snapPoint1 = stickyPoints[snapPoint1Key];
    var snapPoint2 = stickyPoints[snapPoint2Key];
    points[0] = snapPoint1 ? snapPoint1.x : points[0];
    points[1] = snapPoint1 ? snapPoint1.y : points[1];
    points[6] = snapPoint2 ? snapPoint2.x : points[6];
    points[7] = snapPoint2 ? snapPoint2.y : points[7];
    var newTransition = Object.assign({}, transition, { points: points });

    return Object.assign({}, accum, _defineProperty({}, transitionKey, newTransition));
  }, {});

  return { type: REPLACE_TRANSITIONS, value: newTransitions };
}