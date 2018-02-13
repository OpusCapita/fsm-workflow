'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.updateLayoutProperty = updateLayoutProperty;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UPDATE_LAYOUT_PROPERTY = 'fsm/layout/UPDATE_LAYOUT_PROPERTY';

var initialState = {
  appElementRef: null,
  showInspector: true,
  showHelp: false,
  showStateNodesPoints: false,
  viewportFocused: false
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case UPDATE_LAYOUT_PROPERTY:
      return Object.assign({}, state, _defineProperty({}, action.key, action.value));
    default:
      return state;
  }
}

function updateLayoutProperty(key, value) {
  return { type: UPDATE_LAYOUT_PROPERTY, key: key, value: value };
}