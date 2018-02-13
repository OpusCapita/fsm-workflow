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

var _reactDraggable = require('react-draggable');

require('./TransitionLine.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = (_propTypes = {
  arrowPosition: _propTypes3.default.number,
  arrowSize: _propTypes3.default.number,
  color: _propTypes3.default.string,
  isSelected: _propTypes3.default.bool,
  snap: _propTypes3.default.bool,
  snapStep: _propTypes3.default.number,
  showPoints: _propTypes3.default.bool,
  label: _propTypes3.default.string,
  lineWidth: _propTypes3.default.number,
  coords: _propTypes3.default.array,
  pointFromColor: _propTypes3.default.string,
  pointSize: _propTypes3.default.number,
  pointToColor: _propTypes3.default.string
}, _defineProperty(_propTypes, 'snapStep', _propTypes3.default.number), _defineProperty(_propTypes, 'turnLength', _propTypes3.default.number), _propTypes);
var defaultProps = (_defaultProps = {
  arrowPosition: 0,
  arrowSize: 20,
  color: '#000',
  isSelected: false,
  snap: true,
  snapStep: 20,
  showPoints: true,
  label: 'Transition Label',
  lineWidth: 1,
  coords: [40, 20, 60, 20, 60, 220, 80, 220],
  pointFromColor: "#0f0",
  pointSize: 8,
  pointToColor: "#f00"
}, _defineProperty(_defaultProps, 'snapStep', 10), _defineProperty(_defaultProps, 'turnLength', 10), _defaultProps);

var debugRects = _react2.default.createElement(
  'g',
  null,
  _react2.default.createElement('rect', {
    x: '600', y: '600', width: '100', height: '50', stroke: '#0f0', fill: 'transparent'
  }),
  _react2.default.createElement('rect', {
    x: '300', y: '300', width: '100', height: '50', stroke: '#f00', fill: 'transparent'
  })
);

var TransitionLine = function (_PureComponent) {
  _inherits(TransitionLine, _PureComponent);

  function TransitionLine(props) {
    _classCallCheck(this, TransitionLine);

    var _this = _possibleConstructorReturn(this, (TransitionLine.__proto__ || Object.getPrototypeOf(TransitionLine)).call(this, props));

    _this.handlePoint1Drag = _this.handlePoint1Drag.bind(_this);
    _this.handlePoint2Drag = _this.handlePoint2Drag.bind(_this);
    _this.handlePoint3Drag = _this.handlePoint3Drag.bind(_this);
    _this.handlePoint4Drag = _this.handlePoint4Drag.bind(_this);
    return _this;
  }

  _createClass(TransitionLine, [{
    key: 'handleStart',
    value: function handleStart(e, data) {
      console.log('start');
    }
  }, {
    key: 'handleStop',
    value: function handleStop(e, data) {
      console.log('stop');
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(e, data) {
      console.log('drag');
    }
  }, {
    key: 'handlePoint1Drag',
    value: function handlePoint1Drag(e, data) {
      var coords = [].concat(_toConsumableArray(this.props.coords));
      var x = coords[0] + data.deltaX;
      var y = coords[1] + data.deltaY;
      coords[0] = x;
      coords[1] = y;

      coords[3] = y;

      this.props.onCoordsChange(coords);
    }
  }, {
    key: 'handlePoint2Drag',
    value: function handlePoint2Drag(e, data) {
      var coords = [].concat(_toConsumableArray(this.props.coords));
      coords[2] = coords[2] + data.deltaX;
      coords[3] = coords[3] + data.deltaY;
      this.props.onCoordsChange(coords);
    }
  }, {
    key: 'handlePoint3Drag',
    value: function handlePoint3Drag(e, data) {
      var coords = [].concat(_toConsumableArray(this.props.coords));
      coords[4] = coords[4] + data.deltaX;
      coords[5] = coords[5] + data.deltaY;
      this.props.onCoordsChange(coords);
    }
  }, {
    key: 'handlePoint4Drag',
    value: function handlePoint4Drag(e, data) {
      var coords = [].concat(_toConsumableArray(this.props.coords));
      coords[6] = coords[6] + data.deltaX;
      coords[7] = coords[7] + data.deltaY;
      this.props.onCoordsChange(coords);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          arrowPosition = _props.arrowPosition,
          arrowSize = _props.arrowSize,
          color = _props.color,
          isSelected = _props.isSelected,
          snap = _props.snap,
          label = _props.label,
          lineWidth = _props.lineWidth,
          coords = _props.coords,
          pointFromColor = _props.pointFromColor,
          pointSize = _props.pointSize,
          pointToColor = _props.pointToColor,
          snapStep = _props.snapStep,
          turnLength = _props.turnLength;


      var d = 'M ' + coords[0] + ' ' + coords[1] + ' L ' + coords[2] + ' ' + coords[3] + ' ' + coords[4] + ' ' + coords[5] + ' ' + coords[6] + ' ' + coords[7];
      var inputTextPosition = { x: 20, y: 30 };

      var markerPath = arrowPosition === 1 ? 'M' + arrowSize + ',0 L' + arrowSize + ',' + arrowSize / 2 + ' L' + 0 + ',' + arrowSize / 4 : 'M0,0 L0,' + arrowSize / 2 + ' L' + arrowSize + ',' + arrowSize / 4;

      var points = _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement(
          _reactDraggable.DraggableCore,
          {
            grid: snap ? [snapStep, snapStep] : null,
            onDrag: this.handlePoint1Drag
          },
          _react2.default.createElement('rect', {
            className: 'fsm--transition-line__point',
            x: coords[0] - pointSize / 2,
            y: coords[1] - pointSize / 2,
            width: pointSize,
            height: pointSize,
            fill: pointFromColor,
            stroke: pointFromColor,
            strokeWidth: 1
          })
        ),
        _react2.default.createElement(
          _reactDraggable.DraggableCore,
          {
            grid: snap ? [snapStep, snapStep] : null,
            onDrag: this.handlePoint2Drag
          },
          _react2.default.createElement('rect', {
            className: 'fsm--transition-line__point',
            x: coords[2] - pointSize / 2,
            y: coords[3] - pointSize / 2,
            width: pointSize,
            height: pointSize,
            fill: pointFromColor,
            stroke: pointFromColor,
            strokeWidth: 1
          })
        ),
        _react2.default.createElement(
          _reactDraggable.DraggableCore,
          {
            grid: snap ? [snapStep, snapStep] : null,
            onDrag: this.handlePoint3Drag
          },
          _react2.default.createElement('rect', {
            className: 'fsm--transition-line__point',
            x: coords[4] - pointSize / 2,
            y: coords[5] - pointSize / 2,
            width: pointSize,
            height: pointSize,
            fill: pointFromColor,
            stroke: pointFromColor,
            strokeWidth: 1
          })
        ),
        _react2.default.createElement(
          _reactDraggable.DraggableCore,
          {
            grid: snap ? [snapStep, snapStep] : null,
            onDrag: this.handlePoint4Drag
          },
          _react2.default.createElement('rect', {
            className: 'fsm--transition-line__point',
            x: coords[6] - pointSize / 2,
            y: coords[7] - pointSize / 2,
            width: pointSize,
            height: pointSize,
            fill: pointFromColor,
            stroke: pointFromColor,
            strokeWidth: 1
          })
        )
      );
      return _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement(
          'defs',
          null,
          _react2.default.createElement(
            'marker',
            {
              id: 'fsm--transition-line__arrow',
              markerWidth: arrowSize,
              markerHeight: arrowSize,
              refX: arrowPosition === 1 ? arrowSize / 2 : arrowSize,
              refY: arrowSize / 4,
              orient: 'auto',
              markerUnits: 'strokeWidth'
            },
            _react2.default.createElement('path', { d: markerPath, fill: color })
          )
        ),
        _react2.default.createElement('path', {
          d: d,
          fill: 'none',
          stroke: color,
          markerStart: arrowPosition === 1 ? 'url(#fsm--transition-line__arrow)' : 'none',
          markerEnd: arrowPosition === 2 ? 'url(#fsm--transition-line__arrow)' : 'none',
          strokeWidth: lineWidth
        }),
        _react2.default.createElement(
          'text',
          {
            x: inputTextPosition.x,
            y: inputTextPosition.y,
            fontSize: '16',
            alignmentBaseline: 'middle',
            textAnchor: 'middle'
          },
          label
        ),
        points,
        debugRects
      );
    }
  }]);

  return TransitionLine;
}(_react.PureComponent);

exports.default = TransitionLine;


TransitionLine.propTypes = propTypes;
TransitionLine.defaultProps = defaultProps;