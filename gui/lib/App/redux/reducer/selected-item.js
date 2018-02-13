'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.updateSelectedItem = updateSelectedItem;
exports.updateHoveredStateNode = updateHoveredStateNode;
var UPDATE_SELECTED_ITEM = 'fsm/selected-item/UPDATE_SELECTED_ITEM';
var UPDATE_HOVERED_STATE_NODE = 'fsm/selected-item/UPDATE_HOVERED_STATE_NODE';

var ITEM_TYPES = exports.ITEM_TYPES = {
  STATE: 'fsm/types/STATE',
  TRANSITION: 'fsm/types/TRANSITION',
  VIEWPORT: 'fsm/types/VIEWPORT',
  NON_INSPECTABLE: 'fsm/types/NON_INSPECTABLE'
};

var initialState = {
  itemType: ITEM_TYPES.NON_INSPECTABLE,
  itemId: '',
  hoveredStateNode: ''
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case UPDATE_SELECTED_ITEM:
      return Object.assign({}, state, { itemType: action.itemType, itemId: action.itemId });
    case UPDATE_HOVERED_STATE_NODE:
      return Object.assign({}, state, { hoveredStateNode: action.value });
    default:
      return state;
  }
}

function updateSelectedItem(itemType) {
  var itemId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return { type: UPDATE_SELECTED_ITEM, itemType: itemType, itemId: itemId };
}

function updateHoveredStateNode(value) {
  return { type: UPDATE_HOVERED_STATE_NODE, value: value };
}