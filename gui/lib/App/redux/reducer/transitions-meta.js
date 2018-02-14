'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.startCreateNewTransition = startCreateNewTransition;
exports.finishCreateNewTransition = finishCreateNewTransition;
exports.startMoveDetachedTransition = startMoveDetachedTransition;
exports.finishMoveDetachedTransition = finishMoveDetachedTransition;

var _transitions = require('./transitions');

var _selectedItem = require('./selected-item');

var _utils = require('../../../../utils.js');

var START_CREATE_NEW_TRANSITION = 'fsm/transitions-meta/START_CREATE_NEW_TRANSITION';
var FINISH_CREATE_NEW_TRANSITION = 'fsm/transitions-meta/FINISH_CREATE_NEW_TRANSITION';
var START_MOVE_DETACHED_TRANSITION = 'fsm/transitions-meta/START_MOVE_DETACHED_TRANSITION';
var FINISH_MOVE_DETACHED_TRANSITION = 'fsm/transitions-meta/FINISH_MOVE_DETACHED_TRANSITION';

var minTransitionLength = 10;

var initialState = {
  creationStarted: false,
  lastCreated: null,
  detachedMoveStarted: false,
  detachedMoveStartedAtPointFrom: false,
  lastDetached: null
};

var transitionKeyPrefix = 'transition_';
var transitionTemplate = {
  "name": null,
  "description": null,
  "from": null,
  "to": null,
  "fromPoint": null,
  "toPoint": null,
  "options": {
    "guards": [],
    "actions": []
  },
  "points": [0, 0, 0, 0, 0, 0, 0, 0]
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case START_CREATE_NEW_TRANSITION:
      return Object.assign({}, state, { creationStarted: true, lastCreated: action.lastCreated });
    case FINISH_CREATE_NEW_TRANSITION:
      return Object.assign({}, state, { creationStarted: false, lastCreated: null });
    case START_MOVE_DETACHED_TRANSITION:
      return Object.assign({}, state, {
        detachedMoveStarted: true,
        lastDetached: action.lastDetached,
        detachedMoveStartedAtPointFrom: action.isPointFrom
      });
    case FINISH_MOVE_DETACHED_TRANSITION:
      return Object.assign({}, state, { detachedMoveStarted: false, lastDetached: null });
    default:
      return state;
  }
}

function startCreateNewTransition(x, y, stateNodeKey, pointIndex) {
  var key = 'transition_' + Math.floor(Math.random() * 100);
  var name = (0, _utils.capitalize)(key).replace('_', ' ');
  var points = [x, y, x, y, x, y, x, y];

  var value = Object.assign({}, transitionTemplate, { name: name, points: points, from: stateNodeKey, fromPoint: pointIndex });

  return function (dispatch) {
    dispatch({ type: START_CREATE_NEW_TRANSITION, lastCreated: key });
    dispatch((0, _transitions.createTransition)(key, value));
  };
}

function finishCreateNewTransition(transitionKey) {
  var stateNodeKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var pointIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var transitionLength = arguments[3];

  return function (dispatch) {
    dispatch((0, _transitions.updateTransition)(transitionKey, { to: stateNodeKey, toPoint: pointIndex }));
    dispatch({ type: FINISH_CREATE_NEW_TRANSITION });

    if (transitionLength < minTransitionLength) {
      dispatch((0, _transitions.deleteTransition)(transitionKey));
      return;
    }

    dispatch((0, _selectedItem.updateSelectedItem)(_selectedItem.ITEM_TYPES.TRANSITION, transitionKey));
  };
}

function startMoveDetachedTransition(transitionKey, isPointFrom) {
  return { type: START_MOVE_DETACHED_TRANSITION, lastDetached: transitionKey, isPointFrom: isPointFrom };
}

function finishMoveDetachedTransition(transitionKey) {
  var stateNodeKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var pointIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var isPointFrom = arguments[3];

  return function (dispatch) {
    if (isPointFrom) {
      dispatch((0, _transitions.updateTransition)(transitionKey, { from: stateNodeKey, fromPoint: pointIndex }));
    } else {
      dispatch((0, _transitions.updateTransition)(transitionKey, { to: stateNodeKey, toPoint: pointIndex }));
    }

    dispatch({ type: FINISH_MOVE_DETACHED_TRANSITION });
    dispatch((0, _selectedItem.updateSelectedItem)(_selectedItem.ITEM_TYPES.TRANSITION, transitionKey));
  };
}