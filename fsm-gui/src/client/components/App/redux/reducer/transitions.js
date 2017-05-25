import { snapPoint } from '../../../../svg-utils';
import { ITEM_TYPES } from './selected-item';

const CREATE_TRANSITION = 'fsm/transitions/CREATE_TRANSITION';
const UPDATE_TRANSITION = 'fsm/transitions/UPDATE_TRANSITION';
const DELETE_TRANSITION = 'fsm/transitions/DELETE_TRANSITION';
const REPLACE_TRANSITIONS = 'fsm/transitions/REPLACE_TRANSITIONS';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_TRANSITION:
      return Object.assign({}, state, { [action.key]: action.value });
    case UPDATE_TRANSITION:
      const transition = Object.assign({}, state[action.key], action.value);
      return Object.assign({}, state, { [action.key]: transition });
    case DELETE_TRANSITION:
      const newState = Object.assign({}, state, { [action.key]: undefined });;
      delete newState[action.key];
      return newState;
    case REPLACE_TRANSITIONS:
      return action.value;
    default:
      return state;
  }
}

export function createTransition(key, value) {
  return { type: CREATE_TRANSITION, key, value };
}

export function updateTransition(key, value) {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_TRANSITION, key, value });
    dispatch(snapTransitions(getState));
  };
}

export function deleteTransition(key) {
  return { type: DELETE_TRANSITION, key };
}

export function replaceTransitions(value) {
  return { type: REPLACE_TRANSITIONS, value };
}

export function snapTransitions(getState) {
  const state = getState();
  const transitions = state.transitions;
  const stickyPoints = state.viewport.stickyPoints;
  const snapDistance = state.viewport.snapDistance;
  const newTransitions = Object.keys(transitions).reduce((accum, transitionKey) => {
    const transition = transitions[transitionKey];

    let points = [...transition.points];
    const bezierPoint1 = snapPoint(points[0], points[1], stickyPoints, snapDistance);
    const bezierPoint4 = snapPoint(points[6], points[7], stickyPoints, snapDistance);
    points[0] = bezierPoint1[0];
    points[1] = bezierPoint1[1];
    points[6] = bezierPoint4[0];
    points[7] = bezierPoint4[1];
    const newTransition = Object.assign({}, transition, { points });

    return Object.assign({}, accum, { [transitionKey]: newTransition });
  }, {});

  return { type: REPLACE_TRANSITIONS, value: newTransitions };
}

export function snapStateNodePoints(getState) {
  const state = getState();
  const transitions = state.transitions;
  const stickyPoints = state.viewport.stickyPoints;
  const newTransitions = Object.keys(transitions).reduce((accum, transitionKey) => {
    const transition = transitions[transitionKey];

    if(!(transition.from || transition.to)) {
      return accum;
    }

    let points = [...transition.points];
    const snapPoint1Key = `${ITEM_TYPES.STATE}.${transition.from}.${transition.fromPoint}`;
    const snapPoint2Key = `${ITEM_TYPES.STATE}.${transition.to}.${transition.toPoint}`;
    const snapPoint1 = stickyPoints[snapPoint1Key];
    const snapPoint2 = stickyPoints[snapPoint2Key];
    points[0] = snapPoint1.x;
    points[1] = snapPoint1.y;
    points[6] = snapPoint2.x;
    points[7] = snapPoint2.y;
    const newTransition = Object.assign({}, transition, { points });

    return Object.assign({}, accum, { [transitionKey]: newTransition });
  }, {});

  return { type: REPLACE_TRANSITIONS, value: newTransitions };
}
