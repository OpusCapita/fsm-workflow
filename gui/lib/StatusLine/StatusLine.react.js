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

require('./StatusLine.less');

var _Button = require('@opuscapita/react-buttons/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _border_inner = require('!!raw-loader!@opuscapita/svg-icons/lib/border_inner.svg');

var _border_inner2 = _interopRequireDefault(_border_inner);

var _border_clear = require('!!raw-loader!@opuscapita/svg-icons/lib/border_clear.svg');

var _border_clear2 = _interopRequireDefault(_border_clear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  mousePositionX: _propTypes2.default.number,
  mousePositionY: _propTypes2.default.number,
  viewportScale: _propTypes2.default.number,
  onZoomClick: _propTypes2.default.func,
  showGrid: _propTypes2.default.bool,
  onGridButtonClick: _propTypes2.default.func
};

var defaultProps = {
  onZoomClick: function onZoomClick() {},
  onGridButtonClick: function onGridButtonClick() {}
};

var maxValueLength = 6;

var StatusLine = function (_Component) {
  _inherits(StatusLine, _Component);

  function StatusLine(props) {
    _classCallCheck(this, StatusLine);

    var _this = _possibleConstructorReturn(this, (StatusLine.__proto__ || Object.getPrototypeOf(StatusLine)).call(this, props));

    _this.handleGridButtonClick = _this.handleGridButtonClick.bind(_this);
    _this.handleZoomClick = _this.handleZoomClick.bind(_this);
    return _this;
  }

  _createClass(StatusLine, [{
    key: 'handleZoomClick',
    value: function handleZoomClick(e) {
      this.props.onZoomClick(e);
    }
  }, {
    key: 'handleGridButtonClick',
    value: function handleGridButtonClick(e) {
      this.props.onGridButtonClick(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          mousePositionX = _props.mousePositionX,
          mousePositionY = _props.mousePositionY,
          viewportScale = _props.viewportScale,
          showGrid = _props.showGrid;


      return _react2.default.createElement(
        'div',
        { className: 'fsm--status-line' },
        _react2.default.createElement(
          'div',
          {
            className: 'fsm--status-line__scale fsm--status-line__action',
            title: 'Reset',
            onClick: this.handleZoomClick
          },
          _react2.default.createElement(
            'div',
            { className: 'fsm--status-line__label' },
            'Zoom:'
          ),
          _react2.default.createElement(
            'div',
            { className: 'fsm--status-line__value fsm--status-line__value--zoom' },
            Math.floor(viewportScale * 100),
            '%'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'fsm--status-line__controls-right' },
          _react2.default.createElement(_Button2.default, {
            svg: showGrid ? _border_clear2.default : _border_inner2.default,
            title: showGrid ? 'Hide grid' : 'Show grid',
            color: '#333',
            onClick: this.handleGridButtonClick
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'fsm--status-line__mouse-position' },
          _react2.default.createElement(
            'div',
            { className: 'fsm--status-line__label' },
            'X:'
          ),
          _react2.default.createElement(
            'div',
            { className: 'fsm--status-line__value' },
            typeof mousePositionX === 'number' ? mousePositionX.toString().slice(0, maxValueLength) : '―'
          ),
          _react2.default.createElement(
            'div',
            { className: 'fsm--status-line__label' },
            'Y:'
          ),
          _react2.default.createElement(
            'div',
            { className: 'fsm--status-line__value' },
            typeof mousePositionY === 'number' ? mousePositionY.toString().slice(0, maxValueLength) : '―'
          )
        )
      );
    }
  }]);

  return StatusLine;
}(_react.Component);

exports.default = StatusLine;


StatusLine.propTypes = propTypes;