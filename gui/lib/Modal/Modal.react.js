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

var _SimpleModal = require('@opuscapita/react-overlays/lib/SimpleModal');

var _SimpleModal2 = _interopRequireDefault(_SimpleModal);

require('./Modal.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  isShow: _propTypes2.default.bool,
  onHide: _propTypes2.default.func,
  title: _propTypes2.default.string
};

var defaultProps = {
  isShow: false,
  onHide: true,
  title: _propTypes2.default.string
};

var Modal = function (_PureComponent) {
  _inherits(Modal, _PureComponent);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.handleEsc = _this.handleEsc.bind(_this);
    _this.handleHideClick = _this.handleHideClick.bind(_this);
    return _this;
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.body.addEventListener('keydown', this.handleEsc);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.addEventListener('keydown', this.handleEsc);
    }
  }, {
    key: 'handleEsc',
    value: function handleEsc(e) {
      if (e.which === 27) {
        // ESC keycode
        this.handleHideClick();
      }
    }
  }, {
    key: 'handleHideClick',
    value: function handleHideClick() {
      this.props.onHide();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          onHide = _props.onHide,
          title = _props.title,
          children = _props.children;

      return _react2.default.createElement(
        _SimpleModal2.default,
        {
          isShow: isShow,
          style: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
        _react2.default.createElement(
          'div',
          { className: 'fsm--modal' },
          _react2.default.createElement(
            'div',
            { className: 'fsm--modal__header' },
            _react2.default.createElement(
              'h4',
              null,
              title
            ),
            _react2.default.createElement(_Button2.default, {
              className: 'fsm--modal__header-close-button',
              label: '\u2715',
              color: '#aaa',
              onClick: this.handleHideClick
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'fsm--modal__content' },
            children
          )
        )
      );
    }
  }]);

  return Modal;
}(_react.PureComponent);

exports.default = Modal;


Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;