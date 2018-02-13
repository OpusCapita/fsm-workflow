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

require('./Toolbar.less');

var _TitledButton = require('@opuscapita/react-buttons/lib/TitledButton');

var _TitledButton2 = _interopRequireDefault(_TitledButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  controlsLeft: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    action: _propTypes2.default.func,
    iconSVG: _propTypes2.default.string,
    title: _propTypes2.default.string,
    selected: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    color: _propTypes2.default.string,
    bgColor: _propTypes2.default.string
  })),
  controlsRight: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    action: _propTypes2.default.func,
    iconSVG: _propTypes2.default.string,
    title: _propTypes2.default.string,
    selected: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool
  })),
  restrictorNode: _propTypes2.default.object
};

var defaultProps = {
  restrictorNode: null
};

var Toolbar = function (_Component) {
  _inherits(Toolbar, _Component);

  function Toolbar() {
    _classCallCheck(this, Toolbar);

    return _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).apply(this, arguments));
  }

  _createClass(Toolbar, [{
    key: 'renderControls',
    value: function renderControls(controls) {
      var _this2 = this;

      return controls.map(function (control, i) {
        return control === null ? _react2.default.createElement('div', { key: i, className: 'fsm--toolbar__divider' }) : _react2.default.createElement(_TitledButton2.default, {
          key: i,
          svg: control.iconSVG,
          title: control.title,
          disabled: control.disabled,
          color: control.color || '#333',
          bgColor: control.bgColor || null,
          label: control.label,
          contentPosition: 'before',
          isActive: control.active,
          onClick: control.action,
          className: 'fsm--toolbar__button',
          restrictorNode: _this2.props.restrictorNode
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          controlsLeft = _props.controlsLeft,
          controlsRight = _props.controlsRight;


      return _react2.default.createElement(
        'div',
        { className: 'fsm--toolbar' },
        _react2.default.createElement(
          'div',
          { className: 'fsm--toolbar__controls-left' },
          this.renderControls(controlsLeft)
        ),
        _react2.default.createElement(
          'div',
          { className: 'fsm--toolbar__controls-right' },
          this.renderControls(controlsRight)
        )
      );
    }
  }]);

  return Toolbar;
}(_react.Component);

exports.default = Toolbar;


Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;