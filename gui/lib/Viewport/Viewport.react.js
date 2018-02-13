'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDraggable = require('react-draggable');

var _reactSizeme = require('react-sizeme');

var _reactSizeme2 = _interopRequireDefault(_reactSizeme);

require('./Viewport.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var workareaWidth = 10000;
var workareaHeight = 10000;

var propTypes = {
  allowPan: _propTypes2.default.bool,
  gridSize: _propTypes2.default.number,
  showGrid: _propTypes2.default.bool,
  scale: _propTypes2.default.number,
  size: _propTypes2.default.object,
  snap: _propTypes2.default.bool,
  onWheel: _propTypes2.default.func,
  onMouseMove: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  onMouseDown: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,
  onMouseClick: _propTypes2.default.func,
  onPan: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onClickOutside: _propTypes2.default.func,
  panOffsetX: _propTypes2.default.number,
  panOffsetY: _propTypes2.default.number
};
var defaultProps = {
  allowPan: true,
  gridSize: 40,
  showGrid: false,
  scale: 1,
  size: null,
  snap: true,
  snapSize: 10,
  onWheel: function onWheel() {},
  onMouseMove: function onMouseMove() {},
  onMouseLeave: function onMouseLeave() {},
  onPan: function onPan() {},
  onKeyDown: function onKeyDown() {},
  onMouseDownOutside: function onMouseDownOutside() {},
  onMouseUpOutside: function onMouseUpOutside() {},
  onClickOutside: function onClickOutside() {},
  panOffsetX: 0,
  panOffsetY: 0
};

var Viewport = function (_Component) {
  _inherits(Viewport, _Component);

  function Viewport(props) {
    _classCallCheck(this, Viewport);

    var _this = _possibleConstructorReturn(this, (Viewport.__proto__ || Object.getPrototypeOf(Viewport)).call(this, props));

    _this.state = {
      mouseInside: false,
      panning: false
    };
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleWheel = _this.handleWheel.bind(_this);
    _this.handleDrag = _this.handleDrag.bind(_this);
    _this.handleBodyClick = _this.handleBodyClick.bind(_this);
    _this.handleBodyMouseDown = _this.handleBodyMouseDown.bind(_this);
    _this.handleBodyMouseUp = _this.handleBodyMouseUp.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    return _this;
  }

  _createClass(Viewport, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.body.addEventListener('click', this.handleBodyClick);
      document.body.addEventListener('mousedown', this.handleBodyMouseDown);
      document.body.addEventListener('mouseup', this.handleBodyMouseUp);
      document.body.addEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this.handleBodyClick);
      document.body.removeEventListener('mousedown', this.handleBodyMouseDown);
      document.body.removeEventListener('mouseup', this.handleBodyMouseUp);
      document.body.removeEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: 'handleBodyMouseDown',
    value: function handleBodyMouseDown(e) {
      if (!this.viewportRef.contains(e.target)) {
        this.props.onMouseDownOutside(e);
      }
    }
  }, {
    key: 'handleBodyMouseUp',
    value: function handleBodyMouseUp(e) {
      if (!this.viewportRef.contains(e.target)) {
        this.props.onMouseUpOutside(e);
      }
    }
  }, {
    key: 'handleBodyClick',
    value: function handleBodyClick(e) {
      if (!this.viewportRef.contains(e.target)) {
        this.props.onClickOutside(e);
      }
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      this.props.onKeyDown(e);
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      this.setState({ panning: true });
      this.props.onMouseDown(e);
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(e) {
      this.setState({ panning: false });
      this.props.onMouseUp(e);
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter(e) {
      this.setState({ mouseInside: true });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave(e) {
      this.setState({ mouseInside: false });
      this.props.onMouseLeave(e, { x: null, y: null });
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      var viewportMouseX = (e.clientX - this.props.size.position.left) / this.props.scale - this.props.panOffsetX;
      var viewportMouseY = (e.clientY - this.props.size.position.top) / this.props.scale - this.props.panOffsetY;
      this.props.onMouseMove(e, { x: viewportMouseX, y: viewportMouseY });
    }
  }, {
    key: 'handleWheel',
    value: function handleWheel(e) {
      e.preventDefault();
      this.handleMouseMove(e);
      this.props.onWheel(e);
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(e, data) {
      if (this.props.allowPan) {
        this.props.onPan(e, data);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          allowPan = _props.allowPan,
          gridSize = _props.gridSize,
          showGrid = _props.showGrid,
          onWheel = _props.onWheel,
          onClick = _props.onClick,
          onMouseDown = _props.onMouseDown,
          onMouseUp = _props.onMouseUp,
          scale = _props.scale,
          snap = _props.snap,
          size = _props.size,
          children = _props.children,
          panOffsetX = _props.panOffsetX,
          panOffsetY = _props.panOffsetY;
      var panning = this.state.panning;


      var viewportWidth = size.width / scale;
      var viewportHeight = size.height / scale;

      var bigGridSize = gridSize * 10;
      var defs = _react2.default.createElement(
        'defs',
        { key: Math.random() },
        _react2.default.createElement(
          'pattern',
          { id: 'smallGrid', width: gridSize, height: gridSize, patternUnits: 'userSpaceOnUse' },
          _react2.default.createElement('path', { d: 'M ' + gridSize + ' 0 L 0 0 0 ' + gridSize, fill: 'none', stroke: '#eee', strokeWidth: '0.5' })
        ),
        _react2.default.createElement(
          'pattern',
          { id: 'grid', width: bigGridSize, height: bigGridSize, patternUnits: 'userSpaceOnUse' },
          _react2.default.createElement('rect', { width: bigGridSize, height: bigGridSize, fill: 'url(#smallGrid)' }),
          _react2.default.createElement('path', { d: 'M ' + bigGridSize + ' 0 L 0 0 0 ' + bigGridSize, fill: 'none', stroke: '#aaa', strokeWidth: '1' })
        )
      );

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(_ref) {
            return _this2.viewportRef = _ref;
          },
          className: 'fsm--viewport ' + (panning ? 'fsm--viewport--panning' : ''),
          onWheel: this.handleWheel,
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onMouseMove: this.handleMouseMove,
          onClick: onClick
        },
        _react2.default.createElement(
          _reactDraggable.DraggableCore,
          {
            onDrag: this.handleDrag,
            grid: snap ? [gridSize, gridSize] : null
          },
          _react2.default.createElement(
            'svg',
            {
              version: '1.1',
              width: '100%',
              height: '100%',
              viewBox: '0 0 ' + viewportWidth + ' ' + viewportHeight,
              xmlns: 'http://www.w3.org/2000/svg'
            },
            defs,
            _react2.default.createElement(
              'g',
              { transform: 'translate(' + panOffsetX + ',' + panOffsetY + ')' },
              _react2.default.createElement('rect', {
                width: workareaWidth,
                height: workareaHeight,
                fill: showGrid ? 'url(#grid)' : 'none',
                stroke: '#aaa',
                onMouseDown: onMouseDown
              }),
              children
            )
          )
        )
      );
    }
  }]);

  return Viewport;
}(_react.Component);

Viewport.propTypes = propTypes;
Viewport.defaultProps = defaultProps;

var sizeMeConfig = {
  monitorWidth: true,
  monitorHeight: true,
  monitorPosition: true
};
exports.default = (0, _reactSizeme2.default)(sizeMeConfig)(Viewport);