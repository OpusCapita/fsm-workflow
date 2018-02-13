'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _StatusLine = require('../StatusLine');

var _StatusLine2 = _interopRequireDefault(_StatusLine);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _viewport = require('../App/redux/reducer/viewport');

var viewportActions = _interopRequireWildcard(_viewport);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  cursorPosition: _propTypes2.default.object,
  viewportRect: _propTypes2.default.object,
  viewportScale: _propTypes2.default.number,
  viewportSize: _propTypes2.default.number,
  viewportPanOffset: _propTypes2.default.object,
  showGrid: _propTypes2.default.bool
};

var StatusLineContainer = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    cursorPosition: state.viewport.cursorPosition,
    viewportRect: state.viewport.viewportRect,
    viewportScale: state.viewport.viewportScale,
    viewportSize: state.viewport.viewportSize,
    viewportPanOffset: state.viewport.viewportPanOffset,
    showGrid: state.viewport.showGrid
  };
}, function (dispatch) {
  return { actions: (0, _redux.bindActionCreators)(viewportActions, dispatch) };
}), _dec(_class = function (_Component) {
  _inherits(StatusLineContainer, _Component);

  function StatusLineContainer(props) {
    _classCallCheck(this, StatusLineContainer);

    var _this = _possibleConstructorReturn(this, (StatusLineContainer.__proto__ || Object.getPrototypeOf(StatusLineContainer)).call(this, props));

    _this.handleZoomClick = _this.handleZoomClick.bind(_this);
    _this.handleGridButtonClick = _this.handleGridButtonClick.bind(_this);
    return _this;
  }

  _createClass(StatusLineContainer, [{
    key: 'handleZoomClick',
    value: function handleZoomClick(e) {
      this.props.actions.updateViewportScale(1);
    }
  }, {
    key: 'handleGridButtonClick',
    value: function handleGridButtonClick(e) {
      this.props.actions.updateViewportShowGrid(!this.props.showGrid);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          cursorPosition = _props.cursorPosition,
          viewportRect = _props.viewportRect,
          viewportScale = _props.viewportScale,
          viewportPanOffset = _props.viewportPanOffset,
          viewportSize = _props.viewportSize,
          showGrid = _props.showGrid;


      var isOutOfViewport = cursorPosition.x < 0 || cursorPosition.y < 0 || cursorPosition.x > viewportSize || cursorPosition.y > viewportSize;

      return _react2.default.createElement(_StatusLine2.default, {
        mousePositionX: isOutOfViewport ? null : Math.floor(cursorPosition.x / 10) + 1,
        mousePositionY: isOutOfViewport ? null : Math.floor(cursorPosition.y / 10) + 1,
        viewportScale: viewportScale,
        showGrid: showGrid,
        onZoomClick: this.handleZoomClick,
        onGridButtonClick: this.handleGridButtonClick
      });
    }
  }]);

  return StatusLineContainer;
}(_react.Component)) || _class);
exports.default = StatusLineContainer;


StatusLineContainer.propTypes = propTypes;