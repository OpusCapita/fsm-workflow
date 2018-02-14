'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes, _defaultProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes2 = require('prop-types');

var _propTypes3 = _interopRequireDefault(_propTypes2);

var _BezierCurve = require('../BezierCurve');

var _BezierCurve2 = _interopRequireDefault(_BezierCurve);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('./BezierTransition.less');

var _reactDraggable = require('react-draggable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = (_propTypes = {
  actions: _propTypes3.default.arrayOf(_propTypes3.default.string),
  arrowPosition: _propTypes3.default.number,
  arrowSize: _propTypes3.default.number,
  bezier: _propTypes3.default.arrayOf(_propTypes3.default.number),
  color: _propTypes3.default.string,
  selected: _propTypes3.default.bool,
  showPoints: _propTypes3.default.bool,
  snap: _propTypes3.default.bool,
  snapStep: _propTypes3.default.number,
  scale: _propTypes3.default.number,
  label: _propTypes3.default.string,
  lineWidth: _propTypes3.default.number,
  cursorPosition: _propTypes3.default.shape({ x: _propTypes3.default.number, y: _propTypes3.default.number }),
  onChange: _propTypes3.default.func,
  onMouseDown: _propTypes3.default.func,
  onMouseUp: _propTypes3.default.func,
  onClick: _propTypes3.default.func,
  onPointDragStart: _propTypes3.default.func,
  onPointDragStop: _propTypes3.default.func,
  pointSize: _propTypes3.default.number,
  pointsColor1: _propTypes3.default.string,
  pointsColor2: _propTypes3.default.string
}, _defineProperty(_propTypes, 'snapStep', _propTypes3.default.number), _defineProperty(_propTypes, 'stickyDistance', _propTypes3.default.number), _defineProperty(_propTypes, 'stickyPoints', _propTypes3.default.objectOf(_propTypes3.default.shape({ x: _propTypes3.default.number, y: _propTypes3.default.number }))), _propTypes);
var defaultProps = (_defaultProps = {
  arrowPosition: 0,
  arrowSize: 30,
  bezier: [100, 25, 10, 90, 110, 100, 150, 195],
  color: '#333',
  cursorPosition: { x: 0, y: 0 },
  selected: false,
  showPoints: false,
  snap: true,
  snapStep: 20,
  scale: 1,
  lineWidth: 4,
  label: '',
  onChange: function onChange() {},
  onMouseDown: function onMouseDown() {},
  onMouseUp: function onMouseUp() {},
  onClick: function onClick() {},
  onPointDragStart: function onPointDragStart() {},
  onPointDragStop: function onPointDragStop() {},
  pointSize: 12,
  pointsColor1: "#0f0",
  pointsColor2: "#f00"
}, _defineProperty(_defaultProps, 'snapStep', 30), _defineProperty(_defaultProps, 'stickyDistance', 20), _defineProperty(_defaultProps, 'stickyPoints', {}), _defaultProps);

var BezierTransition = function (_PureComponent) {
  _inherits(BezierTransition, _PureComponent);

  function BezierTransition(props) {
    _classCallCheck(this, BezierTransition);

    var _this = _possibleConstructorReturn(this, (BezierTransition.__proto__ || Object.getPrototypeOf(BezierTransition)).call(this, props));

    _this.handleBezierChange = _this.handleBezierChange.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handlePointDragStart = _this.handlePointDragStart.bind(_this);
    _this.handlePointDragStop = _this.handlePointDragStop.bind(_this);

    _this.markerId = "fsm--bezier-transition__arrow_" + (0, _v2.default)();
    return _this;
  }

  _createClass(BezierTransition, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.prevBezier = nextProps.bezier;
    }
  }, {
    key: 'handleBezierChange',
    value: function handleBezierChange(bezier) {
      this.props.onChange(bezier);
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      this.props.onMouseDown(e);
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(e) {
      this.props.onMouseUp(e);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      this.props.onClick(e);
    }
  }, {
    key: 'handlePointDragStart',
    value: function handlePointDragStart(e, draggableData, pointIndex) {
      this.props.onPointDragStart(e, draggableData, pointIndex);
    }
  }, {
    key: 'handlePointDragStop',
    value: function handlePointDragStop(e, draggableData, pointIndex) {
      this.props.onPointDragStop(e, draggableData, pointIndex);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          label = _props.label,
          actions = _props.actions,
          arrowPosition = _props.arrowPosition,
          arrowSize = _props.arrowSize,
          lineWidth = _props.lineWidth,
          color = _props.color,
          pointsColor1 = _props.pointsColor1,
          pointsColor2 = _props.pointsColor2,
          pointSize = _props.pointSize,
          snap = _props.snap,
          snapStep = _props.snapStep,
          bezier = _props.bezier,
          selected = _props.selected,
          showPoints = _props.showPoints,
          scale = _props.scale,
          onChange = _props.onChange,
          stickyPoints = _props.stickyPoints;


      var markerPath = arrowPosition === 1 ? 'M' + arrowSize + ',0 L' + arrowSize + ',' + arrowSize / 2 + ' L' + 0 + ',' + arrowSize / 4 : 'M0,0 L0,' + arrowSize / 2 + ' L' + arrowSize + ',' + arrowSize / 4;

      return _react2.default.createElement(
        'g',
        {
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onClick: this.handleClick
        },
        _react2.default.createElement(
          'defs',
          null,
          _react2.default.createElement(
            'marker',
            {
              id: this.markerId,
              markerWidth: arrowSize,
              markerHeight: arrowSize,
              refX: arrowPosition === 1 ? arrowSize / 6 : arrowSize - arrowSize / 6,
              refY: arrowSize / 4,
              orient: 'auto',
              markerUnits: 'userSpaceOnUse'
            },
            _react2.default.createElement('path', { d: markerPath, fill: color })
          )
        ),
        _react2.default.createElement(_BezierCurve2.default, {
          bezier: bezier,
          snap: snap,
          snapStep: snapStep,
          onChange: this.handleBezierChange,
          label: label,
          scale: scale,
          markerStart: arrowPosition === 1 ? 'url(#' + this.markerId + ')' : 'none',
          markerEnd: arrowPosition === 2 ? 'url(#' + this.markerId + ')' : 'none',
          pointSize: pointSize,
          stroke: color,
          strokeWidth: lineWidth,
          showControls: selected,
          onPoint1DragStart: function onPoint1DragStart(e, draggableData) {
            return _this2.handlePointDragStart(e, draggableData, 1);
          },
          onPoint2DragStart: function onPoint2DragStart(e, draggableData) {
            return _this2.handlePointDragStart(e, draggableData, 2);
          },
          onPoint3DragStart: function onPoint3DragStart(e, draggableData) {
            return _this2.handlePointDragStart(e, draggableData, 3);
          },
          onPoint4DragStart: function onPoint4DragStart(e, draggableData) {
            return _this2.handlePointDragStart(e, draggableData, 4);
          },
          onPoint1DragStop: function onPoint1DragStop(e, draggableData) {
            return _this2.handlePointDragStop(e, draggableData, 1);
          },
          onPoint2DragStop: function onPoint2DragStop(e, draggableData) {
            return _this2.handlePointDragStop(e, draggableData, 2);
          },
          onPoint3DragStop: function onPoint3DragStop(e, draggableData) {
            return _this2.handlePointDragStop(e, draggableData, 3);
          },
          onPoint4DragStop: function onPoint4DragStop(e, draggableData) {
            return _this2.handlePointDragStop(e, draggableData, 4);
          }
        })
      );
    }
  }]);

  return BezierTransition;
}(_react.PureComponent);

exports.default = BezierTransition;


BezierTransition.propTypes = propTypes;
BezierTransition.defaultProps = defaultProps;