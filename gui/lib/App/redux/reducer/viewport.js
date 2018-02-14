'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;
exports.updateCursorPosition = updateCursorPosition;
exports.updateViewportRect = updateViewportRect;
exports.updateViewportScale = updateViewportScale;
exports.updateViewportPanOffset = updateViewportPanOffset;
exports.updateViewportShowGrid = updateViewportShowGrid;
exports.registerStickyPoint = registerStickyPoint;
exports.unregisterStickyPoint = unregisterStickyPoint;
exports.updateViewportProperty = updateViewportProperty;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UPDATE_CURSOR_POSITION = 'fsm/viewport/UPDATE_CURSOR_POSITION';
var UPDATE_VIEWPORT_RECT = 'fsm/viewport/UPDATE_VIEWPORT_RECT';
var UPDATE_VIEWPORT_SCALE = 'fsm/viewport/UPDATE_VIEWPORT_SCALE';
var UPDATE_VIEWPORT_PAN_OFFSET = 'fsm/viewport/UPDATE_VIEWPORT_PAN_OFFSET';
var UPDATE_VIEWPORT_SHOW_GRID = 'fsm/viewport/UPDATE_SHOW_GRID';
var REGISTER_STICKY_POINT = 'fsm/viewport/REGISTER_STICKY_POINT';
var UNREGISTER_STICKY_POINT = 'fsm/viewport/UNREGISTER_STICKY_POINT';
var UPDATE_VIEWPORT_PROPERTY = 'fsm/viewport/UPDATE_VIEWPORT_PROPERTY';

var initialState = {
  cursorPosition: { x: 0, y: 0 },
  viewportRect: {},
  viewportScale: 1,
  viewportPanOffset: { x: 0, y: 0 },
  showGrid: true,
  snapDistance: 20,
  viewportSize: 10000,
  stickyPoints: {},
  lastMouseDownPoint: null,
  lastMouseUpPoint: null
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case UPDATE_CURSOR_POSITION:
      return Object.assign({}, state, { 'cursorPosition': _extends({}, action.value) });
    case UPDATE_VIEWPORT_RECT:
      return Object.assign({}, state, { 'viewportRect': _extends({}, action.value) });
    case UPDATE_VIEWPORT_SCALE:
      return Object.assign({}, state, { 'viewportScale': action.value });
    case UPDATE_VIEWPORT_PAN_OFFSET:
      return Object.assign({}, state, { 'viewportPanOffset': _extends({}, action.value) });
    case UPDATE_VIEWPORT_SHOW_GRID:
      return Object.assign({}, state, { 'showGrid': action.value });
    case REGISTER_STICKY_POINT:
      {
        var newStickyPoints = Object.assign({}, state.stickyPoints, _defineProperty({}, action.key, action.value));
        return Object.assign({}, state, { 'stickyPoints': newStickyPoints });
      }
    case UNREGISTER_STICKY_POINT:
      {
        var _newStickyPoints = Object.assign({}, state.stickyPoints, _defineProperty({}, action.key, undefined));
        delete _newStickyPoints[action.key];
        return Object.assign({}, state, { 'stickyPoints': _newStickyPoints });
      }
    case UPDATE_VIEWPORT_PROPERTY:
      return Object.assign({}, state, _defineProperty({}, action.key, action.value));
    default:
      return state;
  }
}

function updateCursorPosition(value) {
  return { type: UPDATE_CURSOR_POSITION, value: value };
}

function updateViewportRect(value) {
  return { type: UPDATE_VIEWPORT_RECT, value: value };
}

function updateViewportScale(value) {
  return { type: UPDATE_VIEWPORT_SCALE, value: value };
}

function updateViewportPanOffset(value) {
  return { type: UPDATE_VIEWPORT_PAN_OFFSET, value: value };
}

function updateViewportShowGrid(value) {
  return { type: UPDATE_VIEWPORT_SHOW_GRID, value: value };
}

function registerStickyPoint(key, value) {
  return { type: REGISTER_STICKY_POINT, key: key, value: value };
}

function unregisterStickyPoint(key, value) {
  return { type: UNREGISTER_STICKY_POINT, key: key, value: value };
}

function updateViewportProperty(key, value) {
  return { type: UPDATE_VIEWPORT_PROPERTY, key: key, value: value };
}