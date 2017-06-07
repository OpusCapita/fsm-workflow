const UPDATE_LAYOUT_PROPERTY = 'fsm/layout/UPDATE_LAYOUT_PROPERTY';

const initialState = {
  appElementRef: null,
  showInspector: true,
  showHelp: false,
  showStateNodesPoints: false,
  viewportFocused: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_LAYOUT_PROPERTY:
      return Object.assign({}, state, { [action.key]: action.value });
    default:
      return state;
  }
}

export function updateLayoutProperty(key, value) {
  return { type: UPDATE_LAYOUT_PROPERTY, key, value };
}
