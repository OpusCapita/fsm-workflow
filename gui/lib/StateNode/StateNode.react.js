'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDraggable = require('react-draggable');

var _svgUtils = require('../../svg-utils');

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

require('./StateNode.less');

var _SVGLabel = require('../SVGLabel');

var _SVGLabel2 = _interopRequireDefault(_SVGLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var paddingV = 20;
var paddingH = 60;
var pointOffset = 1;
var pointOffsetMultiper = 2;
var snapOffsetCompensation = pointOffset * pointOffsetMultiper * 4;
var outlinePadding = 3;
var getContrastColor = function getContrastColor(color) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  return (0, _tinycolor2.default)(color).getBrightness() > 70 ? (0, _tinycolor2.default)(color).darken(amount) : (0, _tinycolor2.default)(color).lighten(amount);
};

var getLabelColor = function getLabelColor(bgColor) {
  return (0, _tinycolor2.default)(bgColor).getBrightness() > 127 ? '#000' : '#fff';
};

var propTypes = {
  label: _propTypes2.default.string,
  lineWidth: _propTypes2.default.number,
  color: _propTypes2.default.string,
  bgColor: _propTypes2.default.string,
  textColor: _propTypes2.default.string,
  snapStep: _propTypes2.default.number,
  x: _propTypes2.default.number,
  y: _propTypes2.default.number,
  selected: _propTypes2.default.bool,
  selectedPoints: _propTypes2.default.arrayOf(_propTypes2.default.number),
  finalState: _propTypes2.default.bool,
  snap: _propTypes2.default.bool,
  showPoints: _propTypes2.default.bool,
  snapDistance: _propTypes2.default.number,
  onClick: _propTypes2.default.func,
  onMousedDown: _propTypes2.default.func,
  onMousedUp: _propTypes2.default.func,
  onMouseEnter: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  onPointMouseDown: _propTypes2.default.func,
  onPointMouseUp: _propTypes2.default.func,
  onPointMouseEnter: _propTypes2.default.func,
  onPointMouseLeave: _propTypes2.default.func,
  onPointRef: _propTypes2.default.func,
  onDoubleClick: _propTypes2.default.func,
  onDragStart: _propTypes2.default.func,
  onDragStop: _propTypes2.default.func,
  onDrag: _propTypes2.default.func
};
var defaultProps = {
  label: '',
  lineWidth: 1,
  color: '#000',
  bgColor: '#0277bd',
  textColor: '#fff',
  snapStep: 20,
  x: 0,
  y: 0,
  selected: false,
  selectedPoints: [],
  finalState: false,
  snap: true,
  showPoints: false,
  snapDistance: 12,
  onClick: function onClick() {},
  onMouseDown: function onMouseDown() {},
  onMouseUp: function onMouseUp() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {},
  onPointMouseDown: function onPointMouseDown() {},
  onPointMouseUp: function onPointMouseUp() {},
  onPointMouseEnter: function onPointMouseEnter() {},
  onPointMouseLeave: function onPointMouseLeave() {},
  onPointRef: function onPointRef() {},
  onDoubleClick: function onDoubleClick() {},
  onDragStart: function onDragStart() {},
  onDragStop: function onDragStop() {},
  onDrag: function onDrag() {}
};

var StateNode = function (_PureComponent) {
  _inherits(StateNode, _PureComponent);

  function StateNode(props) {
    _classCallCheck(this, StateNode);

    var _this = _possibleConstructorReturn(this, (StateNode.__proto__ || Object.getPrototypeOf(StateNode)).call(this, props));

    _this.state = {
      selectedPoint: null,
      labelElementBbox: null
    };
    _this.handleStart = _this.handleStart.bind(_this);
    _this.handleStop = _this.handleStop.bind(_this);
    _this.handleDrag = _this.handleDrag.bind(_this);
    _this.handleLabelUpdate = _this.handleLabelUpdate.bind(_this);
    _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handlePointMouseDown = _this.handlePointMouseDown.bind(_this);
    _this.handlePointMouseUp = _this.handlePointMouseUp.bind(_this);
    _this.handlePointMouseEnter = _this.handlePointMouseEnter.bind(_this);
    _this.handlePointMouseLeave = _this.handlePointMouseLeave.bind(_this);
    _this.handlePointRef = _this.handlePointRef.bind(_this);
    return _this;
  }

  _createClass(StateNode, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.label !== nextProps.label || this.props.lineWidth !== nextProps.lineWidth || this.props.color !== nextProps.color || this.props.bgColor !== nextProps.bgColor || this.props.textColor !== nextProps.textColor || this.props.snapStep !== nextProps.snapStep || this.props.x !== nextProps.x || this.props.y !== nextProps.y || this.props.selected !== nextProps.selected || !(0, _isEqual2.default)(this.props.selectedPoints, nextProps.selectedPoints) || this.props.finalState !== nextProps.finalState || this.props.snap !== nextProps.snap || this.props.showPoints !== nextProps.showPoints || this.state.labelElement !== nextState.labelElement || this.state.selectedPoint !== nextState.selectedPoint || this.state.labelElementBBox !== nextState.labelElementBBox;
    }
  }, {
    key: 'handleLabelUpdate',
    value: function handleLabelUpdate(element) {
      if (!element) {
        return;
      }

      var bbox = element.getBBox();
      var elementBBox = element ? Object.assign({}, {
        x: bbox.x,
        y: bbox.y,
        width: bbox.width,
        height: bbox.height
      }) : null;

      this.setState({
        labelElementBBox: elementBBox
      });
    }
  }, {
    key: 'handleStart',
    value: function handleStart(e, data) {
      this.props.onDragStart(e, data);
    }
  }, {
    key: 'handleStop',
    value: function handleStop(e, data) {
      this.props.onDragStop(e, data);
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(e, data) {
      this.props.onDrag(e, data);
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
    key: 'handleMouseEnter',
    value: function handleMouseEnter(e) {
      this.props.onMouseEnter(e);
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave(e) {
      this.props.onMouseLeave(e);
    }
  }, {
    key: 'handlePointMouseEnter',
    value: function handlePointMouseEnter(e, index, pointPosition) {
      this.setState({ selectedPoint: index });
      this.props.onPointMouseEnter(e, index, pointPosition);
    }
  }, {
    key: 'handlePointMouseLeave',
    value: function handlePointMouseLeave(e, index, pointPosition) {
      this.setState({ selectedPoint: null });
      this.props.onPointMouseLeave(e, index, pointPosition);
    }
  }, {
    key: 'handlePointMouseDown',
    value: function handlePointMouseDown(e, index, pointPosition) {
      this.setState({ selectedPoint: index });
      this.props.onMouseDown(e);
      this.props.onPointMouseDown(e, index, pointPosition);
    }
  }, {
    key: 'handlePointMouseUp',
    value: function handlePointMouseUp(e, index, pointPosition) {
      this.setState({ selectedPoint: null });
      this.props.onMouseDown(e);
      this.props.onPointMouseUp(e, index, pointPosition);
    }
  }, {
    key: 'handlePointRef',
    value: function handlePointRef(ref, index, pointPosition) {
      this.props.onPointRef(ref, index, pointPosition);
    }
  }, {
    key: 'renderPoints',
    value: function renderPoints(x, y, width, height) {
      var _this2 = this;

      var xPointsCount = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 3;

      var xStep = width / (xPointsCount + 1);
      var edgePointsOffset = xStep / 4;
      var pointPositions = [
      // To remove corners on 'lines <-> points' joints: 'x,y' - are real; 'xG,yG' - where point renders visually.

      // Top points
      {
        x: x + xStep - edgePointsOffset, y: y + pointOffset * pointOffsetMultiper,
        xG: x + xStep - edgePointsOffset, yG: y - pointOffset
      }, {
        x: x + xStep * 2, y: y + pointOffset * pointOffsetMultiper,
        xG: x + xStep * 2, yG: y - pointOffset
      }, {
        x: x + xStep * 3 + edgePointsOffset, y: y + pointOffset * pointOffsetMultiper,
        xG: x + xStep * 3 + edgePointsOffset, yG: y - pointOffset
      },

      // Right points
      {
        x: x + width - pointOffset * pointOffsetMultiper, y: y + height / 2,
        xG: x + width + pointOffset, yG: y + height / 2
      },

      // Bottom point
      {
        x: x + xStep * 3 + edgePointsOffset, y: y + height - pointOffset * pointOffsetMultiper,
        xG: x + xStep * 3 + edgePointsOffset, yG: y + height + pointOffset
      }, {
        x: x + xStep * 2, y: y + height - pointOffset * pointOffsetMultiper,
        xG: x + xStep * 2, yG: y + height + pointOffset
      }, {
        x: x + xStep - edgePointsOffset, y: y + height - pointOffset * pointOffsetMultiper,
        xG: x + xStep - edgePointsOffset, yG: y + height + pointOffset
      },
      // Left points
      {
        x: x + pointOffset * pointOffsetMultiper, y: y + height / 2,
        xG: x - pointOffset, yG: y + height / 2
      }];

      var contrastBg = getContrastColor(this.props.bgColor);
      return pointPositions.map(function (pointPosition, index) {
        var selected = _this2.state.selectedPoint === index || _this2.props.selectedPoints.some(function (selectedPoint) {
          return selectedPoint === index;
        });

        return _react2.default.createElement(
          'g',
          {
            key: index,
            onMouseDown: function onMouseDown(e) {
              return _this2.handlePointMouseDown(e, index, pointPosition);
            },
            onMouseUp: function onMouseUp(e) {
              return _this2.handlePointMouseUp(e, index, pointPosition);
            },
            onMouseEnter: function onMouseEnter(e) {
              return _this2.handlePointMouseEnter(e, index, pointPosition);
            },
            onMouseLeave: function onMouseLeave(e) {
              return _this2.handlePointMouseLeave(e, index, pointPosition);
            }
          },
          _react2.default.createElement('circle', {
            className: 'fsm--state-node__point-active-area',
            cx: pointPosition.xG,
            cy: pointPosition.yG,
            r: _this2.props.snapDistance - snapOffsetCompensation,
            fill: contrastBg,
            opacity: _this2.props.showPoints || selected ? 0.3 : 0
          }),
          _react2.default.createElement('circle', {
            className: 'fsm--state-node__point ' + (_this2.props.drag ? 'fsm--state-node__point--drag' : ''),
            ref: function ref(_ref) {
              return _this2.handlePointRef(_ref, index, pointPosition);
            },
            cx: pointPosition.xG,
            cy: pointPosition.yG,
            r: 6,
            strokeWidth: '2',
            stroke: contrastBg,
            fill: selected ? contrastBg : '#fff',
            opacity: _this2.props.showPoints || selected ? 1 : 0
          })
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          label = _props.label,
          lineWidth = _props.lineWidth,
          color = _props.color,
          bgColor = _props.bgColor,
          snapStep = _props.snapStep,
          textColor = _props.textColor,
          x = _props.x,
          y = _props.y,
          selected = _props.selected,
          selectedPoints = _props.selectedPoints,
          finalState = _props.finalState,
          snap = _props.snap,
          showPoints = _props.showPoints,
          onClick = _props.onClick,
          onMouseDown = _props.onMouseDown,
          onMouseUp = _props.onMouseUp,
          onDoubleClick = _props.onDoubleClick,
          onDragStart = _props.onDragStart,
          onDragStop = _props.onDragStop,
          onDrag = _props.onDrag;
      var labelElementBBox = this.state.labelElementBBox;


      var labelWidth = labelElementBBox ? labelElementBBox.width : 0;
      var labelHeight = labelElementBBox ? labelElementBBox.height : 0;

      var labelX = x - labelWidth / 2 - paddingH / 2 - outlinePadding;
      var labelY = y - labelHeight / 2 - paddingV / 2 - outlinePadding;

      var rectWidth = labelWidth + paddingH;
      var rectHeight = labelHeight + paddingV;
      var rectX = x - labelWidth / 2 - paddingH / 2;
      var rectY = y - labelHeight / 2 - paddingV / 2;

      var outline = _react2.default.createElement('rect', {
        className: 'fsm--state-node__outline',
        x: labelX,
        y: labelY,
        rx: '2',
        ry: '2',
        width: labelWidth + paddingH + outlinePadding * 2,
        height: labelHeight + paddingV + outlinePadding * 2,
        fill: selected ? '#fff' : 'transparent',
        strokeWidth: 2,
        stroke: selected ? getContrastColor(this.props.bgColor) : 'transparent'
      });

      var points = this.renderPoints(rectX, rectY, rectWidth, rectHeight);

      return _react2.default.createElement(
        'g',
        {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp
        },
        _react2.default.createElement(
          _reactDraggable.DraggableCore,
          {
            grid: snap ? [snapStep, snapStep] : null,
            onStart: this.handleStart,
            onStop: this.handleStop,
            onDrag: this.handleDrag
          },
          _react2.default.createElement(
            'g',
            {
              className: 'fsm--state-node',
              onClick: onClick,
              onDoubleClick: onDoubleClick,
              onMouseDown: this.handleMouseDown,
              onMouseUp: this.handleMouseUp
            },
            outline,
            _react2.default.createElement('rect', {
              className: 'fsm--state-node__rect',
              x: rectX,
              y: rectY,
              rx: '2',
              ry: '2',
              width: rectWidth,
              height: rectHeight,
              fill: bgColor,
              strokeWidth: lineWidth
            }),
            _react2.default.createElement(
              _SVGLabel2.default,
              {
                onUpdate: this.handleLabelUpdate,
                x: x,
                y: y,
                fontSize: '16',
                alignmentBaseline: 'middle',
                dominantBaseline: 'middle',
                textAnchor: 'middle',
                fill: getLabelColor(bgColor),
                className: 'fsm--state-node__label ' + (label ? '' : 'fsm--state-node__label--unnamed')
              },
              label || 'Unnamed'
            )
          )
        ),
        points
      );
    }
  }]);

  return StateNode;
}(_react.PureComponent);

exports.default = StateNode;


StateNode.propTypes = propTypes;
StateNode.defaultProps = defaultProps;