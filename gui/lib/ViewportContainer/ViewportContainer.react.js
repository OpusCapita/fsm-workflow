'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class; // TODO - it is easy to split this giant file. JUST DO IT!!!

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Viewport = require('../Viewport');

var _Viewport2 = _interopRequireDefault(_Viewport);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _viewport = require('../App/redux/reducer/viewport');

var viewportActions = _interopRequireWildcard(_viewport);

var _selectedItem = require('../App/redux/reducer/selected-item');

var selectedItemActions = _interopRequireWildcard(_selectedItem);

var _stateNodes = require('../App/redux/reducer/state-nodes');

var stateNodesActions = _interopRequireWildcard(_stateNodes);

var _transitions = require('../App/redux/reducer/transitions');

var transitionsActions = _interopRequireWildcard(_transitions);

var _transitionsMeta = require('../App/redux/reducer/transitions-meta');

var transitionsMetaActions = _interopRequireWildcard(_transitionsMeta);

var _layout = require('../App/redux/reducer/layout');

var layoutActions = _interopRequireWildcard(_layout);

var _svgUtils = require('../../svg-utils');

var _BezierTransition = require('../BezierTransition');

var _BezierTransition2 = _interopRequireDefault(_BezierTransition);

var _StateNode = require('../StateNode');

var _StateNode2 = _interopRequireDefault(_StateNode);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var scaleFactor = 0.06;
var minScale = 0.1;
var maxScale = 5;
var gridSize = 10;

var propTypes = {
  cursorPosition: _propTypes2.default.object,
  viewportRect: _propTypes2.default.object,
  viewportScale: _propTypes2.default.number,
  viewportPanOffset: _propTypes2.default.object,
  showGrid: _propTypes2.default.bool,
  stateNodes: _propTypes2.default.object,
  transitions: _propTypes2.default.object,
  stickyPoints: _propTypes2.default.object,
  selectedItemType: _propTypes2.default.string,
  selectedItemId: _propTypes2.default.string,
  snapDistance: _propTypes2.default.number,
  hoveredStateNode: _propTypes2.default.string,
  transitionCreationStarted: _propTypes2.default.bool,
  lastCreatedTransition: _propTypes2.default.string,
  transitionDetachedMoveStarted: _propTypes2.default.bool,
  detachedMoveStartedAtPointFrom: _propTypes2.default.bool,
  lastDetachedTransition: _propTypes2.default.string,
  viewportFocused: _propTypes2.default.bool
};

var defaultProps = {};

var ViewportContainer = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    cursorPosition: state.viewport.cursorPosition,
    viewportRect: state.viewport.viewportRect,
    viewportScale: state.viewport.viewportScale,
    viewportPanOffset: state.viewport.viewportPanOffset,
    showGrid: state.viewport.showGrid,
    stateNodes: state.stateNodes,
    transitions: state.transitions,
    stickyPoints: state.viewport.stickyPoints,
    snapDistance: state.viewport.snapDistance,
    selectedItemType: state.selectedItem.itemType,
    selectedItemId: state.selectedItem.itemId,
    transitionCreationStarted: state.transitionsMeta.creationStarted,
    lastCreatedTransition: state.transitionsMeta.lastCreated,
    transitionDetachedMoveStarted: state.transitionsMeta.detachedMoveStarted,
    lastDetachedTransition: state.transitionsMeta.lastDetached,
    detachedMoveStartedAtPointFrom: state.transitionsMeta.detachedMoveStartedAtPointFrom,
    hoveredStateNode: state.selectedItem.hoveredStateNode,
    viewportFocused: state.layout.viewportFocused
  };
}, function (dispatch) {
  return { actions: (0, _redux.bindActionCreators)(_extends({}, viewportActions, selectedItemActions, stateNodesActions, transitionsActions, transitionsMetaActions, layoutActions), dispatch) };
}), _dec(_class = function (_Component) {
  _inherits(ViewportContainer, _Component);

  function ViewportContainer(props) {
    _classCallCheck(this, ViewportContainer);

    var _this = _possibleConstructorReturn(this, (ViewportContainer.__proto__ || Object.getPrototypeOf(ViewportContainer)).call(this, props));

    _this.state = {
      panning: false
    };

    _this.lastCursorPosition = null;

    _this.handleDeleteKey = _this.handleDeleteKey.bind(_this);
    _this.handleWheel = _this.handleWheel.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
    _this.handlePan = _this.handlePan.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleClickOutside = _this.handleClickOutside.bind(_this);
    _this.handleMouseDownOutside = _this.handleMouseDownOutside.bind(_this);
    _this.handleMouseUpOutside = _this.handleMouseUpOutside.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleStateNodeClick = _this.handleStateNodeClick.bind(_this);
    _this.handleStateNodeMouseDown = _this.handleStateNodeMouseDown.bind(_this);
    _this.handleStateNodeMouseEneter = _this.handleStateNodeMouseEnter.bind(_this);
    _this.handleStateNodeMouseLeave = _this.handleStateNodeMouseLeave.bind(_this);
    _this.handleStateNodeDrag = _this.handleStateNodeDrag.bind(_this);
    _this.handleStateNodePointMouseDown = _this.handleStateNodePointMouseDown.bind(_this);
    _this.handleStateNodePointMouseUp = _this.handleStateNodePointMouseUp.bind(_this);
    _this.handleTransitionChange = _this.handleTransitionChange.bind(_this);
    _this.handleTransitionMouseDown = _this.handleTransitionMouseDown.bind(_this);
    _this.handleTransitionClick = _this.handleTransitionClick.bind(_this);
    _this.handleTransitionCreationMouseMove = _this.handleTransitionCreationMouseMove.bind(_this);
    _this.handleDetachedTransitionMouseMove = _this.handleDetachedTransitionMouseMove.bind(_this);
    _this.handleTransitionPointDragStart = _this.handleTransitionPointDragStart.bind(_this);
    return _this;
  }

  _createClass(ViewportContainer, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.detachedTransitionMouseMoveHandler) {
        document.body.removeEventListener('mousemove', this.detachedTransitionMouseMoveHandler);
      }
      if (this.handleTransitionCreationMouseMove) {
        document.body.removeEventListener('mousemove', this.handleTransitionCreationMouseMove);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      /* Perf optimization. Avoid frequent rerenders
       If you remove it you loose about 10 frames per second */
      var cursorPositionChanged = this.props.cursorPosition && (this.props.cursorPosition.x !== nextProps.cursorPosition.x || this.props.cursorPosition.y !== nextProps.cursorPosition.y);

      if (this.props.viewportScale !== nextProps.viewportScale) {
        return true;
      }

      if (cursorPositionChanged) {
        return false;
      }

      return true;
    }
  }, {
    key: 'handleWheel',
    value: function handleWheel(e) {
      var scale = e.deltaY > 0 ? this.props.viewportScale - scaleFactor : this.props.viewportScale + scaleFactor;

      if (scale < minScale) {
        scale = minScale;
      }
      if (scale > maxScale) {
        scale = maxScale;
      }

      this.props.actions.updateViewportScale(scale);
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e, mousePosition) {
      this.props.actions.updateCursorPosition(mousePosition);
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave(e, mousePosition) {
      this.props.actions.updateCursorPosition(mousePosition);
    }
  }, {
    key: 'handlePan',
    value: function handlePan(e, draggableData) {
      if (this.state.panning) {
        var x = this.props.viewportPanOffset.x + draggableData.deltaX / this.props.viewportScale;
        var y = this.props.viewportPanOffset.y + draggableData.deltaY / this.props.viewportScale;
        this.props.actions.updateViewportPanOffset({ x: x, y: y });
      }
    }
  }, {
    key: 'handleStateNodeMouseDown',
    value: function handleStateNodeMouseDown(e, key) {
      e.stopPropagation();
      this.props.actions.updateSelectedItem(_selectedItem.ITEM_TYPES.STATE, key);
    }
  }, {
    key: 'handleStateNodeClick',
    value: function handleStateNodeClick(e, key) {
      this.props.actions.updateSelectedItem(_selectedItem.ITEM_TYPES.STATE, key);
    }
  }, {
    key: 'handleStateNodeMouseEnter',
    value: function handleStateNodeMouseEnter(e, key) {
      this.props.actions.updateHoveredStateNode(key);
    }
  }, {
    key: 'handleStateNodeMouseLeave',
    value: function handleStateNodeMouseLeave(e, key) {
      this.props.actions.updateHoveredStateNode(null);
    }
  }, {
    key: 'handleStateNodePointMouseDown',
    value: function handleStateNodePointMouseDown(e, stateNodeKey, pointIndex, pointPosition) {
      var _this2 = this;

      var _props = this.props,
          cursorPosition = _props.cursorPosition,
          selectedItemType = _props.selectedItemType,
          selectedItemId = _props.selectedItemId,
          transitions = _props.transitions;

      var transitionKey = selectedItemId;
      var transition = transitions[transitionKey];
      this.transitionCreationStartedAt = Object.assign({}, cursorPosition);

      var detachedTransition = selectedItemType === _selectedItem.ITEM_TYPES.TRANSITION && (transition.from === stateNodeKey && transition.fromPoint === pointIndex || transition.to === stateNodeKey && transition.toPoint === pointIndex);

      if (detachedTransition) {
        var isPointFrom = transition.from === stateNodeKey && transition.fromPoint === pointIndex;
        this.props.actions.startMoveDetachedTransition(transitionKey, isPointFrom);
        this.detachedTransitionMouseMoveHandler = function (e) {
          return _this2.handleDetachedTransitionMouseMove(e, transitionKey, isPointFrom);
        };
        document.body.addEventListener('mousemove', this.detachedTransitionMouseMoveHandler);
        return;
      }

      this.props.actions.startCreateNewTransition(cursorPosition.x, cursorPosition.y, stateNodeKey, pointIndex);

      document.body.addEventListener('mousemove', this.handleTransitionCreationMouseMove);
    }
  }, {
    key: 'handleStateNodePointMouseUp',
    value: function handleStateNodePointMouseUp(e, stateNodeKey, pointIndex, pointPosition) {
      e.stopPropagation();
      if (this.props.transitionCreationStarted) {
        var transitionLength = (0, _svgUtils.getDistance)(this.transitionCreationStartedAt.x, this.transitionCreationStartedAt.y, this.props.cursorPosition.x, this.props.cursorPosition.y);
        this.props.actions.finishCreateNewTransition(this.props.lastCreatedTransition, stateNodeKey, pointIndex, transitionLength);
      }

      if (this.props.transitionDetachedMoveStarted) {
        this.props.actions.finishMoveDetachedTransition(this.props.lastDetachedTransition, stateNodeKey, pointIndex, this.props.detachedMoveStartedAtPointFrom);
        document.body.removeEventListener('mousemove', this.detachedTransitionMouseMoveHandler);
      }

      this.lastCursorPosition = null;
    }
  }, {
    key: 'handleStateNodePointRef',
    value: function handleStateNodePointRef(ref, stateNodeKey, pointIndex, pointPosition) {
      if (!ref) {
        this.props.actions.unregisterStickyPoint(stateNodeKey + '_' + pointIndex);
        return;
      }
      var pointKey = _selectedItem.ITEM_TYPES.STATE + '.' + stateNodeKey + '.' + pointIndex;
      this.props.actions.registerStickyPoint(pointKey, pointPosition);
    }
  }, {
    key: 'handleDetachedTransitionMouseMove',
    value: function handleDetachedTransitionMouseMove(e, transitionKey, isPointFrom) {
      // Detached transition - when you start drag transition from state-node point.

      var _props2 = this.props,
          transitions = _props2.transitions,
          cursorPosition = _props2.cursorPosition;

      var transition = transitions[transitionKey];
      var deltaX = this.lastCursorPosition ? this.lastCursorPosition.x - cursorPosition.x : 0;
      var deltaY = this.lastCursorPosition ? this.lastCursorPosition.y - cursorPosition.y : 0;
      var points = [].concat(transition.points);

      if (isPointFrom) {
        points[0] = this.props.cursorPosition.x + deltaX;
        points[1] = this.props.cursorPosition.y + deltaY;
      } else {
        points[6] = this.props.cursorPosition.x + deltaX;
        points[7] = this.props.cursorPosition.y + deltaY;
      }

      this.lastCursorPosition = _extends({}, this.props.cursorPosition);
      this.props.actions.updateTransition(transitionKey, { points: points });
    }
  }, {
    key: 'handleTransitionCreationMouseMove',
    value: function handleTransitionCreationMouseMove(e) {
      var _props3 = this.props,
          lastCreatedTransition = _props3.lastCreatedTransition,
          transitions = _props3.transitions,
          cursorPosition = _props3.cursorPosition;

      var newTransition = lastCreatedTransition && transitions[lastCreatedTransition];

      if (!newTransition) {
        return false;
      }

      var deltaX = this.lastCursorPosition ? this.lastCursorPosition.x - cursorPosition.x : 0;
      var deltaY = this.lastCursorPosition ? this.lastCursorPosition.y - cursorPosition.y : 0;
      var points = newTransition.points.slice(0, 6).concat([this.props.cursorPosition.x + deltaX, this.props.cursorPosition.y + deltaY]);

      this.lastCursorPosition = _extends({}, this.props.cursorPosition);
      var straightensBezierPoints = (0, _svgUtils.straightensBezier)(points);
      this.props.actions.updateTransition(lastCreatedTransition, { points: straightensBezierPoints });
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      this.mouseDownX = e.clientX;
      this.mouseDownY = e.clientY;

      this.setState({ panning: true });
    }
  }, {
    key: 'handleStateNodeDrag',
    value: function handleStateNodeDrag(e, data, stateNodeKey) {
      var stateNode = this.props.stateNodes[stateNodeKey];
      var points = [stateNode.points[0] + data.deltaX / this.props.viewportScale, stateNode.points[1] + data.deltaY / this.props.viewportScale];
      var updatedStateNode = Object.assign({}, stateNode, { points: points });
      this.props.actions.updateStateNode(stateNodeKey, updatedStateNode);
    }
  }, {
    key: 'handleTransitionChange',
    value: function handleTransitionChange(transitionKey, points, d) {
      var transition = this.props.transitions[transitionKey];
      var updatedTransition = Object.assign({}, transition, { points: points });
      this.props.actions.updateTransition(transitionKey, updatedTransition);
    }
  }, {
    key: 'handleTransitionPointDragStart',
    value: function handleTransitionPointDragStart(transitionKey, e, draggableData, pointIndex) {
      var _this3 = this;

      if (pointIndex === 1 || pointIndex === 4) {
        var isPointFrom = pointIndex === 1;
        this.props.actions.startMoveDetachedTransition(transitionKey, isPointFrom);
        this.detachedTransitionMouseMoveHandler = function (e) {
          return _this3.handleDetachedTransitionMouseMove(e, transitionKey, isPointFrom);
        };
        document.body.addEventListener('mousemove', this.detachedTransitionMouseMoveHandler);
      }
    }
  }, {
    key: 'handleTransitionMouseDown',
    value: function handleTransitionMouseDown(e, key) {
      e.stopPropagation();
      this.props.actions.updateSelectedItem(_selectedItem.ITEM_TYPES.TRANSITION, key);
    }
  }, {
    key: 'handleTransitionClick',
    value: function handleTransitionClick(e, key) {
      e.stopPropagation();
      this.props.actions.updateSelectedItem(_selectedItem.ITEM_TYPES.TRANSITION, key);
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(e) {
      var cursorHasMoved = Math.abs(this.mouseDownX - e.clientX) > 0 || Math.abs(this.mouseDownY - e.clientY) > 0;
      var mouseMovedFromOutside = this.mouseDownX === null || this.mouseDownY === null;

      if (!cursorHasMoved && !mouseMovedFromOutside) {
        this.props.actions.updateSelectedItem(_selectedItem.ITEM_TYPES.VIEWPORT);
      }

      this.setState({ panning: false });

      if (this.props.transitionCreationStarted) {
        var transitionLength = (0, _svgUtils.getDistance)(this.transitionCreationStartedAt.x, this.transitionCreationStartedAt.y, this.props.cursorPosition.x, this.props.cursorPosition.y);
        this.props.actions.finishCreateNewTransition(this.props.lastCreatedTransition, null, null, transitionLength);
      }

      if (this.props.transitionDetachedMoveStarted) {
        this.props.actions.finishMoveDetachedTransition(this.props.lastDetachedTransition, null, null, this.props.detachedMoveStartedAtPointFrom);
        document.body.removeEventListener('mousemove', this.detachedTransitionMouseMoveHandler);
      }

      this.lastCursorPosition = null;
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      this.props.actions.updateLayoutProperty('viewportFocused', true);
    }
  }, {
    key: 'handleMouseDownOutside',
    value: function handleMouseDownOutside(e) {
      console.log('down');
      this.mouseDownX = null;
      this.mouseDownY = null;

      this.props.actions.updateLayoutProperty('viewportFocused', false);
    }
  }, {
    key: 'handleMouseUpOutside',
    value: function handleMouseUpOutside(e) {
      console.log('up');

      this.mouseDownX = null;
      this.mouseDownY = null;

      this.props.actions.updateLayoutProperty('viewportFocused', false);
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside(e) {
      this.mouseDownX = null;
      this.mouseDownY = null;

      this.props.actions.updateLayoutProperty('viewportFocused', false);
    }
  }, {
    key: 'handleTabKey',
    value: function handleTabKey(e) {
      if (this.props.viewportFocused) {
        e.preventDefault();
      }
    }
  }, {
    key: 'handleDeleteKey',
    value: function handleDeleteKey(e) {
      var viewportFocused = this.props.viewportFocused;


      if (this.props.selectedItemType === _selectedItem.ITEM_TYPES.VIEWPORT) {
        return false;
      }

      if (this.props.selectedItemType === _selectedItem.ITEM_TYPES.STATE && viewportFocused) {
        this.props.actions.deleteStateNode(this.props.selectedItemId);
        this.props.actions.updateSelectedItem(_selectedItem.ITEM_TYPES.VIEWPORT);
      }

      if (this.props.selectedItemType === _selectedItem.ITEM_TYPES.TRANSITION && viewportFocused) {
        this.props.actions.deleteTransition(this.props.selectedItemId);
        this.props.actions.updateSelectedItem(_selectedItem.ITEM_TYPES.VIEWPORT);
      }
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      switch (e.which) {
        case 8:
          this.handleDeleteKey(e);break; // Backspace key
        case 9:
          this.handleTabKey(e);break; // TAB key
        case 46:
          this.handleDeleteKey(e);break; // Del key
        default:
          return false;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props4 = this.props,
          viewportScale = _props4.viewportScale,
          viewportPanOffset = _props4.viewportPanOffset,
          showGrid = _props4.showGrid,
          stateNodes = _props4.stateNodes,
          transitions = _props4.transitions,
          stickyPoints = _props4.stickyPoints,
          snapDistance = _props4.snapDistance,
          hoveredStateNode = _props4.hoveredStateNode,
          selectedItemType = _props4.selectedItemType,
          selectedItemId = _props4.selectedItemId,
          transitionCreationStarted = _props4.transitionCreationStarted,
          transitionDetachedMoveStarted = _props4.transitionDetachedMoveStarted,
          detachedMoveStartedAtPointFrom = _props4.detachedMoveStartedAtPointFrom,
          viewportFocused = _props4.viewportFocused;


      var stateNodesElements = Object.keys(stateNodes).map(function (stateNodeKey) {
        var stateNode = stateNodes[stateNodeKey];
        var selected = selectedItemType === _selectedItem.ITEM_TYPES.STATE && selectedItemId === stateNodeKey;
        var showPoints = hoveredStateNode === stateNodeKey || selected || transitionCreationStarted || transitionDetachedMoveStarted;
        var selectedPoints = [];

        if (selectedItemType === _selectedItem.ITEM_TYPES.TRANSITION && transitions[selectedItemId] && transitions[selectedItemId].from === stateNodeKey) {
          selectedPoints = selectedPoints.concat([transitions[selectedItemId].fromPoint]);
        }

        if (selectedItemType === _selectedItem.ITEM_TYPES.TRANSITION && transitions[selectedItemId] && transitions[selectedItemId].to === stateNodeKey) {
          selectedPoints = selectedPoints.concat([transitions[selectedItemId].toPoint]);
        }

        return _react2.default.createElement(_StateNode2.default, {
          key: stateNodeKey,
          label: stateNode.name,
          x: stateNode.points[0],
          y: stateNode.points[1],
          bgColor: stateNode.bgColor,
          textColor: stateNode.textColor,
          finalState: false,
          selected: selected,
          selectedPoints: selectedPoints,
          showPoints: showPoints,
          onMouseEnter: function onMouseEnter(e) {
            return _this4.handleStateNodeMouseEnter(e, stateNodeKey);
          },
          onMouseLeave: function onMouseLeave(e) {
            return _this4.handleStateNodeMouseLeave(e, stateNodeKey);
          },
          onMouseDown: function onMouseDown(e) {
            return _this4.handleStateNodeMouseDown(e, stateNodeKey);
          },
          onPointMouseDown: function onPointMouseDown(e, index, pointPosition) {
            return _this4.handleStateNodePointMouseDown(e, stateNodeKey, index, pointPosition);
          },
          onPointMouseUp: function onPointMouseUp(e, index, pointPosition) {
            return _this4.handleStateNodePointMouseUp(e, stateNodeKey, index, pointPosition);
          },
          onPointRef: function onPointRef(ref, index, pointPosition) {
            return _this4.handleStateNodePointRef(ref, stateNodeKey, index, pointPosition);
          },
          onClick: function onClick(e) {
            return _this4.handleStateNodeClick(e, stateNodeKey);
          },
          onDoubleClick: function onDoubleClick() {},
          onDragStart: function onDragStart(e, data) {},
          onDragStop: function onDragStop(e, data) {},
          onDrag: function onDrag(e, data) {
            return _this4.handleStateNodeDrag(e, data, stateNodeKey);
          },
          snap: false,
          snapDistance: snapDistance
        });
      });

      var transitionsElements = Object.keys(transitions).map(function (transitionKey) {
        var transition = transitions[transitionKey];
        var selected = selectedItemType === _selectedItem.ITEM_TYPES.TRANSITION && selectedItemId === transitionKey;
        return _react2.default.createElement(_BezierTransition2.default, {
          key: transitionKey,
          label: transition.name,
          bezier: transition.points,
          lineWidth: 4,
          color: '#0277bd',
          pointSize: 12,
          scale: viewportScale,
          onChange: function onChange(bezierPoints, d) {
            return _this4.handleTransitionChange(transitionKey, bezierPoints, d);
          },
          onClick: function onClick(e) {
            return _this4.handleTransitionClick(e, transitionKey);
          },
          onMouseDown: function onMouseDown(e) {
            return _this4.handleTransitionMouseDown(e, transitionKey);
          },
          onPointDragStart: function onPointDragStart(e, draggableData, pointIndex) {
            return _this4.handleTransitionPointDragStart(transitionKey, e, draggableData, pointIndex);
          },
          arrowPosition: 2,
          arrowSize: 30,
          selected: selected,
          snap: false,
          stickyPoints: stickyPoints
        });
      });

      return _react2.default.createElement(
        _Viewport2.default,
        {
          scale: viewportScale,
          gridSize: gridSize,
          showGrid: showGrid,
          snap: false,
          onWheel: this.handleWheel,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onPan: this.handlePan,
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onClick: this.handleClick,
          onMouseDownOutside: this.handleMouseDownOutside,
          onMouseUpOutside: this.handleMouseUpOutside,
          onClickOutside: this.handleClickOutside,
          onKeyDown: this.handleKeyDown,
          panOffsetX: viewportPanOffset.x,
          panOffsetY: viewportPanOffset.y,
          focused: viewportFocused
        },
        transitionsElements,
        stateNodesElements
      );
    }
  }]);

  return ViewportContainer;
}(_react.Component)) || _class);
exports.default = ViewportContainer;


ViewportContainer.propTypes = propTypes;
ViewportContainer.defaultProps = defaultProps;