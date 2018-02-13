'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./App.less');

var _create = require('./redux/create');

var _create2 = _interopRequireDefault(_create);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _ApiClient = require('./redux/ApiClient');

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _reactHelmet = require('react-helmet');

var _ToolbarContainer = require('../ToolbarContainer');

var _ToolbarContainer2 = _interopRequireDefault(_ToolbarContainer);

var _ViewportContainer = require('../ViewportContainer');

var _ViewportContainer2 = _interopRequireDefault(_ViewportContainer);

var _StatusLineContainer = require('../StatusLineContainer');

var _StatusLineContainer2 = _interopRequireDefault(_StatusLineContainer);

var _InspectorContainer = require('../InspectorContainer');

var _InspectorContainer2 = _interopRequireDefault(_InspectorContainer);

var _HelpContainer = require('../HelpContainer');

var _HelpContainer2 = _interopRequireDefault(_HelpContainer);

var _viewport = require('../App/redux/reducer/viewport');

var viewportActions = _interopRequireWildcard(_viewport);

var _layout = require('../App/redux/reducer/layout');

var layoutActions = _interopRequireWildcard(_layout);

var _fsm = require('../App/redux/reducer/fsm');

var fsmActions = _interopRequireWildcard(_fsm);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var client = new _ApiClient2.default();
var store = (0, _create2.default)(client);
window.__FSM_REDUX_STORE__ = store;

var propTypes = {};

var defaultProps = {};

var AppLayout = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    transitionCreationStarted: state.transitionsMeta.creationStarted,
    transitionDetachedMoveStarted: state.transitionsMeta.detachedMoveStarted
  };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(_extends({}, viewportActions, layoutActions, fsmActions), dispatch) };
}), _dec(_class = function (_Component) {
  _inherits(AppLayout, _Component);

  function AppLayout(props) {
    _classCallCheck(this, AppLayout);

    var _this = _possibleConstructorReturn(this, (AppLayout.__proto__ || Object.getPrototypeOf(AppLayout)).call(this, props));

    _this.handleAppRef = _this.handleAppRef.bind(_this);
    return _this;
  }

  _createClass(AppLayout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.actions.loadFsm('machine1');
    }
  }, {
    key: 'handleAppRef',
    value: function handleAppRef(ref) {
      this.props.actions.updateLayoutProperty('appElementRef', ref);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          transitionCreationStarted = _props.transitionCreationStarted,
          transitionDetachedMoveStarted = _props.transitionDetachedMoveStarted;


      var crosshairCursor = transitionCreationStarted || transitionDetachedMoveStarted;

      return _react2.default.createElement(
        'div',
        { className: 'fsm--app', ref: this.handleAppRef },
        _react2.default.createElement(
          _reactHelmet.Helmet,
          null,
          _react2.default.createElement(
            'style',
            { type: 'text/css' },
            crosshairCursor ? '.fsm--app { cursor: crosshair !important; }' : ''
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_ToolbarContainer2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'fsm--app__middle-container' },
          _react2.default.createElement(_InspectorContainer2.default, null),
          _react2.default.createElement(_ViewportContainer2.default, null)
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_StatusLineContainer2.default, null)
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_HelpContainer2.default, null)
        )
      );
    }
  }]);

  return AppLayout;
}(_react.Component)) || _class);

var App = function (_Component2) {
  _inherits(App, _Component2);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store, key: 'provider' },
        _react2.default.createElement(AppLayout, null)
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;


App.propTypes = propTypes;
App.defaultProps = defaultProps;