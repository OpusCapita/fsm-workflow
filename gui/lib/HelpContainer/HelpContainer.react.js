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

var _Help = require('../Help');

var _Help2 = _interopRequireDefault(_Help);

var _Modal = require('../Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _layout = require('../App/redux/reducer/layout');

var layoutActions = _interopRequireWildcard(_layout);

require('./HelpContainer.less');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HelpContainer = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    showHelp: state.layout.showHelp
  };
}, function (dispatch) {
  return { actions: (0, _redux.bindActionCreators)(layoutActions, dispatch) };
}), _dec(_class = function (_PureComponent) {
  _inherits(HelpContainer, _PureComponent);

  function HelpContainer(props) {
    _classCallCheck(this, HelpContainer);

    var _this = _possibleConstructorReturn(this, (HelpContainer.__proto__ || Object.getPrototypeOf(HelpContainer)).call(this, props));

    _this.handleHide = _this.handleHide.bind(_this);
    return _this;
  }

  _createClass(HelpContainer, [{
    key: 'handleHide',
    value: function handleHide() {
      this.props.actions.updateLayoutProperty('showHelp', false);
    }
  }, {
    key: 'render',
    value: function render() {
      var showHelp = this.props.showHelp;


      return _react2.default.createElement(
        'div',
        { className: 'fsm--help-container' },
        _react2.default.createElement(
          _Modal2.default,
          {
            isShow: showHelp,
            onHide: this.handleHide,
            title: 'Help information'
          },
          _react2.default.createElement(_Help2.default, { onHide: this.handleHide })
        )
      );
    }
  }]);

  return HelpContainer;
}(_react.PureComponent)) || _class);
exports.default = HelpContainer;