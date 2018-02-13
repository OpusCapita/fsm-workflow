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

var _BezierTransition = require('../BezierTransition');

var _BezierTransition2 = _interopRequireDefault(_BezierTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var viewportChildren = [_react2.default.createElement(_BezierTransition2.default, {
  key: 'Transition_0',
  input: 'Transition_0',
  isHighlighted: true,
  isSnap: false,
  bezier: [100, 25, 10, 90, 110, 100, 150, 195],
  isShowBezierHelpers: true,
  arrowPosition: 2,
  onBezierChange: function onBezierChange() {}
})];

var ViewportScope = (0, _reactShowroomClient.showroomScopeDecorator)(_class = function (_Component) {
  _inherits(ViewportScope, _Component);

  function ViewportScope(props) {
    _classCallCheck(this, ViewportScope);

    var _this = _possibleConstructorReturn(this, (ViewportScope.__proto__ || Object.getPrototypeOf(ViewportScope)).call(this, props));

    _this.state = {
      viewportChildren: viewportChildren,
      scale: 1,
      panOffsetX: 0,
      panOffsetY: 0
    };
    return _this;
  }

  _createClass(ViewportScope, [{
    key: 'handleWheel',
    value: function handleWheel(e) {
      var scale = this.state.scale - e.deltaY / 500;

      if (scale < 0) {
        scale = 0.1;
      }

      this.setState({ scale: scale });
    }
  }, {
    key: 'handlePan',
    value: function handlePan(e, draggableData) {
      var panOffsetX = this.state.panOffsetX + draggableData.deltaX / this.state.scale;
      var panOffsetY = this.state.panOffsetY + draggableData.deltaY / this.state.scale;
      this.setState({ panOffsetX: panOffsetX, panOffsetY: panOffsetY });
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

  return ViewportScope;
}(_react.Component)) || _class;

exports.default = ViewportScope;


ViewportScope.contextTypes = {
  i18n: _propTypes2.default.object
};
ViewportScope.childContextTypes = {
  i18n: _propTypes2.default.object
};