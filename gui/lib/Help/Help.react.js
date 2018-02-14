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

var _Button = require('@opuscapita/react-buttons/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _reactRemarkable = require('react-remarkable');

var _reactRemarkable2 = _interopRequireDefault(_reactRemarkable);

require('./Help.less');

var _README = require('../../../../README.md');

var _README2 = _interopRequireDefault(_README);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  onHide: _propTypes2.default.func
};

var defaultProps = {
  onHide: function onHide() {}
};

var Help = function (_PureComponent) {
  _inherits(Help, _PureComponent);

  function Help() {
    _classCallCheck(this, Help);

    return _possibleConstructorReturn(this, (Help.__proto__ || Object.getPrototypeOf(Help)).apply(this, arguments));
  }

  _createClass(Help, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'fsm--help' },
        _react2.default.createElement(_reactRemarkable2.default, {
          source: _README2.default,
          options: {
            html: true,
            linkify: true,
            breaks: true,
            highlight: this.highlightCode
          }
        })
      );
    }
  }]);

  return Help;
}(_react.PureComponent);

exports.default = Help;


Help.propTypes = propTypes;
Help.defaultProps = defaultProps;