'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDraggable = require('react-draggable');

var _bezierJs = require('bezier-js');

var _bezierJs2 = _interopRequireDefault(_bezierJs);

require('./BezierCurve.less');

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var paddingV = 10;
var paddingH = 30;

var propTypes = {
  bezier: _propTypes2.default.arrayOf(_propTypes2.default.number),
  onChange: _propTypes2.default.func,
  onPoint1DragStart: _propTypes2.default.func,
  onPoint2DragStart: _propTypes2.default.func,
  onPoint3DragStart: _propTypes2.default.func,
  onPoint4DragStart: _propTypes2.default.func,
  onPoint1DragStop: _propTypes2.default.func,
  onPoint2DragStop: _propTypes2.default.func,
  onPoint3DragStop: _propTypes2.default.func,
  onPoint4DragStop: _propTypes2.default.func,
  onPoint1Drag: _propTypes2.default.func,
  onPoint2Drag: _propTypes2.default.func,
  onPoint3Drag: _propTypes2.default.func,
  onPoint4Drag: _propTypes2.default.func,
  label: _propTypes2.default.string,
  scale: _propTypes2.default.number,
  pointColor1: _propTypes2.default.string,
  pointColor2: _propTypes2.default.string,
  pointSize: _propTypes2.default.number,
  snap: _propTypes2.default.bool,
  snapStep: _propTypes2.default.number,
  showControls: _propTypes2.default.bool
};
var defaultProps = {
  bezier: [0, 0, 0, 0, 0, 0, 0, 0],
  onChange: function onChange() {},
  label: '',
  onPoint1DragStart: function onPoint1DragStart() {},
  onPoint2DragStart: function onPoint2DragStart() {},
  onPoint3DragStart: function onPoint3DragStart() {},
  onPoint4DragStart: function onPoint4DragStart() {},
  onPoint1DragStop: function onPoint1DragStop() {},
  onPoint2DragStop: function onPoint2DragStop() {},
  onPoint3DragStop: function onPoint3DragStop() {},
  onPoint4DragStop: function onPoint4DragStop() {},
  onPoint1Drag: function onPoint1Drag() {},
  onPoint2Drag: function onPoint2Drag() {},
  onPoint3Drag: function onPoint3Drag() {},
  onPoint4Drag: function onPoint4Drag() {},
  pointColor1: '#76FF03',
  pointColor2: '#FF1744',
  pointSize: 16,
  showControls: true,
  stroke: '#0091EA',
  scale: 1,
  snap: true,
  snapStep: 20,
  strokeWidth: 1
};

var BezierCurve = function (_PureComponent) {
  _inherits(BezierCurve, _PureComponent);

  function BezierCurve(props) {
    _classCallCheck(this, BezierCurve);

    var _this = _possibleConstructorReturn(this, (BezierCurve.__proto__ || Object.getPrototypeOf(BezierCurve)).call(this, props));

    _this.state = {
      labelElement: null
    };
    _this.handlePoint1Drag = _this.handlePoint1Drag.bind(_this);
    _this.handlePoint2Drag = _this.handlePoint2Drag.bind(_this);
    _this.handlePoint3Drag = _this.handlePoint3Drag.bind(_this);
    _this.handlePoint4Drag = _this.handlePoint4Drag.bind(_this);
    _this.handleLabelDrag = _this.handleLabelDrag.bind(_this);
    _this.handleLabelElementRef = _this.handleLabelElementRef.bind(_this);
    return _this;
  }

  _createClass(BezierCurve, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _isEqual2.default)(this.props.bezier, nextProps.bezier) || this.props.label !== nextProps.label || this.props.scale !== nextProps.scale || this.props.pointColor1 !== nextProps.pointColor1 || this.props.pointColor2 !== nextProps.pointColor2 || this.props.pointSize !== nextProps.pointSize || this.props.snap !== nextProps.snap || this.props.snapStep !== nextProps.snapStep || this.props.showControls !== nextProps.showControls || this.state.labelElement !== nextState.labelElement;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.label !== prevProps.label) {
        // XXX Force update after label bbox recalculated
        this.forceUpdate();
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(bezier, d) {
      this.props.onChange(bezier, this.pathElement);
    }
  }, {
    key: 'handlePoint1Drag',
    value: function handlePoint1Drag(e, data) {
      var bezier = [].concat(_toConsumableArray(this.props.bezier));
      bezier[0] = bezier[0] + data.deltaX / this.props.scale;
      bezier[1] = bezier[1] + data.deltaY / this.props.scale;

      bezier[2] = bezier[2] + data.deltaX / this.props.scale;
      bezier[3] = bezier[3] + data.deltaY / this.props.scale;
      this.handleChange(bezier);
    }
  }, {
    key: 'handlePoint2Drag',
    value: function handlePoint2Drag(e, data) {
      var bezier = [].concat(_toConsumableArray(this.props.bezier));
      bezier[2] = bezier[2] + data.deltaX / this.props.scale;
      bezier[3] = bezier[3] + data.deltaY / this.props.scale;
      this.handleChange(bezier);
    }
  }, {
    key: 'handlePoint3Drag',
    value: function handlePoint3Drag(e, data) {
      var bezier = [].concat(_toConsumableArray(this.props.bezier));
      bezier[4] = bezier[4] + data.deltaX / this.props.scale;
      bezier[5] = bezier[5] + data.deltaY / this.props.scale;
      this.handleChange(bezier);
    }
  }, {
    key: 'handlePoint4Drag',
    value: function handlePoint4Drag(e, data) {
      var bezier = [].concat(_toConsumableArray(this.props.bezier));
      bezier[6] = bezier[6] + data.deltaX / this.props.scale;
      bezier[7] = bezier[7] + data.deltaY / this.props.scale;

      bezier[4] = bezier[4] + data.deltaX / this.props.scale;
      bezier[5] = bezier[5] + data.deltaY / this.props.scale;
      this.handleChange(bezier);
    }
  }, {
    key: 'handleLabelDrag',
    value: function handleLabelDrag(e, data) {
      var bezier = [].concat(_toConsumableArray(this.props.bezier));
      bezier[2] = bezier[2] + data.deltaX / this.props.scale;
      bezier[3] = bezier[3] + data.deltaY / this.props.scale;
      bezier[4] = bezier[4] + data.deltaX / this.props.scale;
      bezier[5] = bezier[5] + data.deltaY / this.props.scale;
      this.handleChange(bezier);
    }
  }, {
    key: 'handleLabelElementRef',
    value: function handleLabelElementRef(ref) {
      this.setState({ labelElement: ref });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this,
          _React$createElement;

      var _props = this.props,
          bezier = _props.bezier,
          pointColor1 = _props.pointColor1,
          pointColor2 = _props.pointColor2,
          pointSize = _props.pointSize,
          label = _props.label,
          showControls = _props.showControls,
          snap = _props.snap,
          snapStep = _props.snapStep,
          onChange = _props.onChange,
          onPoint1Drag = _props.onPoint1Drag,
          onPoint2Drag = _props.onPoint2Drag,
          onPoint3Drag = _props.onPoint3Drag,
          onPoint4Drag = _props.onPoint4Drag,
          onPoint1DragStart = _props.onPoint1DragStart,
          onPoint2DragStart = _props.onPoint2DragStart,
          onPoint3DragStart = _props.onPoint3DragStart,
          onPoint4DragStart = _props.onPoint4DragStart,
          onPoint1DragStop = _props.onPoint1DragStop,
          onPoint2DragStop = _props.onPoint2DragStop,
          onPoint3DragStop = _props.onPoint3DragStop,
          onPoint4DragStop = _props.onPoint4DragStop,
          restProps = _objectWithoutProperties(_props, ['bezier', 'pointColor1', 'pointColor2', 'pointSize', 'label', 'showControls', 'snap', 'snapStep', 'onChange', 'onPoint1Drag', 'onPoint2Drag', 'onPoint3Drag', 'onPoint4Drag', 'onPoint1DragStart', 'onPoint2DragStart', 'onPoint3DragStart', 'onPoint4DragStart', 'onPoint1DragStop', 'onPoint2DragStop', 'onPoint3DragStop', 'onPoint4DragStop']);

      var curve = new (Function.prototype.bind.apply(_bezierJs2.default, [null].concat(_toConsumableArray(bezier))))();
      var d = curve.toSVG();
      var labelPosition = curve.get(0.5);

      var labelElementBBox = this.state.labelElement && this.state.labelElement.getBBox();
      var labelWidth = labelElementBBox && labelElementBBox.width;
      var labelHeight = labelElementBBox && labelElementBBox.height;
      var labelX = labelPosition.x - labelWidth / 2 - paddingH / 2;
      var labelY = labelPosition.y - labelHeight / 2 - paddingV / 2;

      var rectWidth = labelWidth + paddingH;
      var rectHeight = labelHeight + paddingV;
      var rectX = labelPosition.x - labelWidth / 2 - paddingH / 2;
      var rectY = labelPosition.y - labelHeight / 2 - paddingV / 2;

      var controls1 = showControls ? _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement('line', {
          className: 'bezier-curve__control-line',
          x1: bezier[0],
          y1: bezier[1],
          x2: bezier[2],
          y2: bezier[3]
        }),
        _react2.default.createElement(
          _reactDraggable.DraggableCore,
          {
            onDrag: this.handlePoint1Drag,
            onStart: this.props.onPoint1DragStart,
            onStop: this.props.onPoint1DragStop,
            grid: snap ? [snapStep, snapStep] : null
          },
          _react2.default.createElement('rect', {
            className: 'bezier-curve__control-point',
            x: bezier[0] - pointSize / 2,
            y: bezier[1] - pointSize / 2,
            width: pointSize,
            height: pointSize,
            fill: pointColor1,
            stroke: pointColor1,
            strokeWidth: 1
          })
        ),
        _react2.default.createElement(
          _reactDraggable.DraggableCore,
          {
            onDrag: this.handlePoint2Drag,
            onStart: this.props.onPoint2nDragStart,
            onStop: this.props.onPoint2DragStop,
            grid: snap ? [snapStep, snapStep] : null
          },
          _react2.default.createElement('rect', {
            className: 'bezier-curve__control-point',
            x: bezier[2] - pointSize / 2,
            y: bezier[3] - pointSize / 2,
            width: pointSize,
            height: pointSize,
            fill: pointColor2,
            stroke: pointColor2,
            strokeWidth: 1
          })
        )
      ) : null;

      var controls2 = showControls ? _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement('line', {
          className: 'bezier-curve__control-line',
          x1: bezier[4],
          y1: bezier[5],
          x2: bezier[6],
          y2: bezier[7]
        }),
        _react2.default.createElement(
          _reactDraggable.DraggableCore,
          {
            onDrag: this.handlePoint4Drag,
            onStart: this.props.onPoint4DragStart,
            onStop: this.props.onPoint4DragStop,
            grid: snap ? [snapStep, snapStep] : null
          },
          _react2.default.createElement('rect', {
            className: 'bezier-curve__control-point',
            x: bezier[6] - pointSize / 2,
            y: bezier[7] - pointSize / 2,
            width: pointSize,
            height: pointSize,
            fill: pointColor1,
            stroke: pointColor1,
            strokeWidth: 1
          })
        ),
        _react2.default.createElement(
          _reactDraggable.DraggableCore,
          {
            onDrag: this.handlePoint3Drag,
            onStart: this.props.onPoint3DragStart,
            onStop: this.props.onPoint3DragStop,
            grid: snap ? [snapStep, snapStep] : null
          },
          _react2.default.createElement('rect', {
            className: 'bezier-curve__control-point',
            x: bezier[4] - pointSize / 2,
            y: bezier[5] - pointSize / 2,
            width: pointSize,
            height: pointSize,
            fill: pointColor2,
            stroke: pointColor2,
            strokeWidth: 1
          })
        )
      ) : null;

      return _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement('path', _extends({
          d: d,
          fill: 'none',
          ref: function ref(_ref) {
            return _this2.pathElement = _ref;
          }
        }, restProps)),
        _react2.default.createElement(
          _reactDraggable.DraggableCore,
          {
            onDrag: this.handleLabelDrag,
            grid: snap ? [snapStep, snapStep] : null
          },
          _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('rect', {
              x: rectX,
              y: rectY,
              rx: '2',
              ry: '2',
              width: rectWidth,
              height: rectHeight,
              fill: '#fff',
              stroke: '#333',
              className: 'bezier-curve__label-box'
            }),
            _react2.default.createElement(
              'text',
              (_React$createElement = {
                ref: this.handleLabelElementRef,
                x: labelPosition.x,
                y: labelPosition.y,
                fontSize: '12',
                alignmentBaseline: 'middle',
                dominantBaseline: 'middle',
                textAnchor: 'middle'
              }, _defineProperty(_React$createElement, 'textAnchor', 'middle'), _defineProperty(_React$createElement, 'className', 'bezier-curve__label-text ' + (label ? '' : 'bezier-curve__label-text--unnamed')), _React$createElement),
              label || 'Unnamed'
            )
          )
        ),
        controls1,
        controls2
      );
    }
  }]);

  return BezierCurve;
}(_react.PureComponent);

exports.default = BezierCurve;


BezierCurve.propTypes = propTypes;
BezierCurve.defaultProps = defaultProps;