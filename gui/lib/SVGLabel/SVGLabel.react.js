'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./SVGLabel.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  onUpdate: _react.PropTypes.func
};

var defaultProps = {
  label: '',
  onUpdate: function onUpdate() {}
};

var SVGLabel = function (_PureComponent) {
  _inherits(SVGLabel, _PureComponent);

  function SVGLabel(props) {
    _classCallCheck(this, SVGLabel);

    var _this = _possibleConstructorReturn(this, (SVGLabel.__proto__ || Object.getPrototypeOf(SVGLabel)).call(this, props));

    _this.handleLabelElementRef = _this.handleLabelElementRef.bind(_this);
    return _this;
  }

  _createClass(SVGLabel, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(nextProps, nextState) {
      console.log('update');
      nextProps.onUpdate(this.labelElement);
    }
  }, {
    key: 'handleLabelElementRef',
    value: function handleLabelElementRef(ref) {
      console.log('ref');
      this.labelElement = ref;
      this.props.onUpdate(ref);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          onUpdate = _props.onUpdate,
          restProps = _objectWithoutProperties(_props, ['children', 'onUpdate']);

      return _react2.default.createElement(
        'text',
        _extends({
          ref: this.handleLabelElementRef
        }, restProps),
        children
      );
    }
  }]);

  return SVGLabel;
}(_react.PureComponent);

exports.default = SVGLabel;


SVGLabel.propTypes = propTypes;
SVGLabel.defaultProps = defaultProps;