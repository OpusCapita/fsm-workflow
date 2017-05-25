import { createTransition, updateTransition, deleteTransition } from './transitions';
import { updateSelectedItem, ITEM_TYPES } from './selected-item';

const START_CREATE_NEW_TRANSITION = 'fsm/new-transition/START_CREATE_NEW_TRANSITION';
const FINISH_CREATE_NEW_TRANSITION = 'fsm/new-transition/FINISH_CREATE_NEW_TRANSITION';

const initialState = {
  creationStarted: false,
  lastCreated: null
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

export function finishCreateNewTransition(transitionKey, stateNodeKey, pointIndex) {
  return (dispatch) => {
    dispatch(updateTransition(transitionKey, { to: stateNodeKey, toPoint: pointIndex }));
    dispatch({ type: FINISH_CREATE_NEW_TRANSITION });
    dispatch(updateSelectedItem(ITEM_TYPES.TRANSITION, transitionKey));
  };
}
