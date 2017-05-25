import { snapTransitions, snapStateNodePoints } from './transitions';

const CREATE_STATE_NODE = 'fsm/state-nodes/CREATE_STATE_NODE';
const UPDATE_STATE_NODE = 'fsm/state-nodes/UPDATE_STATE_NODE';
const DELETE_STATE_NODE = 'fsm/state-nodes/DELETE_STATE_NODE';
const REPLACE_STATE_NODES = 'fsm/state-nodes/REPLACE_STATE_NODES';

const initialState = {

};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_STATE_NODE:
      return state;
    case UPDATE_STATE_NODE:
      return Object.assign({}, state, { [action.key]: action.value });
    case DELETE_STATE_NODE:
      const newState = Object.assign({}, state, { [action.key]: undefined });
      delete newState[action.key];
      return newState;
    case REPLACE_STATE_NODES:
      return action.value;
    default:
      return state;
  }
}

export function updateStateNode(key, value) {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_STATE_NODE, key, value });
    dispatch(snapStateNodePoints(getState));
  };
}

export function deleteStateNode(key) {
  return { type: DELETE_STATE_NODE, key };
}

export function replaceStateNodes(value) {
  return { type: REPLACE_STATE_NODES, value };
}
