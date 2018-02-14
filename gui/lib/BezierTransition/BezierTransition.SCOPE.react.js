'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class; /*
               What is a SCOPE file. See documentation here:
               https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
            */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactShowroomClient = require('@opuscapita/react-showroom-client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BezierTransitionScope = (0, _reactShowroomClient.showroomScopeDecorator)(_class = function (_Component) {
  _inherits(BezierTransitionScope, _Component);

  function BezierTransitionScope(props) {
    _classCallCheck(this, BezierTransitionScope);

    var _this = _possibleConstructorReturn(this, (BezierTransitionScope.__proto__ || Object.getPrototypeOf(BezierTransitionScope)).call(this, props));

    _this.state = {
      bezier: [100, 25, 10, 90, 110, 100, 150, 195]
    };
    return _this;
  }

  _createClass(BezierTransitionScope, [{
    key: 'handleBezierChange',
    value: function handleBezierChange(bezier) {
      this.setState({ bezier: bezier });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this._renderChildren()
      );
    }
  }]);

  return BezierTransitionScope;
}(_react.Component)) || _class;

exports.default = BezierTransitionScope;


BezierTransitionScope.contextTypes = {
  i18n: _propTypes2.default.object
};
BezierTransitionScope.childContextTypes = {
  i18n: _propTypes2.default.object
};