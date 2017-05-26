import { createTransition, updateTransition, deleteTransition } from './transitions';
import { updateSelectedItem, ITEM_TYPES } from './selected-item';

const START_CREATE_NEW_TRANSITION = 'fsm/transitions-meta/START_CREATE_NEW_TRANSITION';
const FINISH_CREATE_NEW_TRANSITION = 'fsm/transitions-meta/FINISH_CREATE_NEW_TRANSITION';
const START_MOVE_DETACHED_TRANSITION = 'fsm/transitions-meta/START_MOVE_DETACHED_TRANSITION';
const FINISH_MOVE_DETACHED_TRANSITION = 'fsm/transitions-meta/FINISH_MOVE_DETACHED_TRANSITION';

const initialState = {
  creationStarted: false,
  lastCreated: null,
  detachedMoveStarted: false,
  detachedMoveStartedAtPointFrom: false,
  lastDetached: null
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const transitionKeyPrefix = 'transition_';
const transitionTemplate = {
  "name": null,
  "description": null,
  "from": null,
  "to": null,
  "fromPoint": null,
  "toPoint": null,
  "options": {
    "properties": {

    },
    "triggers": {

    },
    "conditions": {

    },
    "validators": {

    },
    "postFunctions": {

    }
  },
  "points": [0,0, 0,0, 0,0, 0,0]
};

export default function reducer(state = initialState, action = {}) {
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

export function startCreateNewTransition(x, y, stateNodeKey, pointIndex) {
  const key = 'transition_' + Math.floor(Math.random() * 100);
  const name = capitalize(key).replace('_', ' ');
  const points = [
    x, y,
    x, y,
    x, y,
    x, y
  ];

  const value = Object.assign({}, transitionTemplate, { name, points, from: stateNodeKey, fromPoint: pointIndex });

  return dispatch => {
    dispatch({ type: START_CREATE_NEW_TRANSITION, lastCreated: key });
    dispatch(createTransition(key, value));
  };
}

export function finishCreateNewTransition(transitionKey, stateNodeKey = null, pointIndex = null) {
  return (dispatch) => {
    dispatch(updateTransition(transitionKey, { to: stateNodeKey, toPoint: pointIndex }));
    dispatch({ type: FINISH_CREATE_NEW_TRANSITION });
    dispatch(updateSelectedItem(ITEM_TYPES.TRANSITION, transitionKey));
  };
}

export function startMoveDetachedTransition(transitionKey, isPointFrom) {
  return { type: START_MOVE_DETACHED_TRANSITION, lastDetached: transitionKey, isPointFrom };
}

export function finishMoveDetachedTransition(transitionKey, stateNodeKey = null, pointIndex = null, isPointFrom) {
  return (dispatch) => {
    console.log(transitionKey, stateNodeKey, pointIndex, isPointFrom);
    if (isPointFrom) {
      dispatch(updateTransition(transitionKey, { from: stateNodeKey, fromPoint: pointIndex }));
    } else {
      dispatch(updateTransition(transitionKey, { to: stateNodeKey, toPoint: pointIndex }));
    }

    dispatch({ type: FINISH_MOVE_DETACHED_TRANSITION });
    dispatch(updateSelectedItem(ITEM_TYPES.TRANSITION, transitionKey));
  };
}
