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

var _Inspector = require('../Inspector');

var _Inspector2 = _interopRequireDefault(_Inspector);

require('./TransitionInspector.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultOptions = {
  'guards': {
    onAdd: function onAdd() {},
    onDelete: function onDelete() {},
    items: [{
      "name": "Order has been paid",
      "arguments": {
        "isPaid": true
      }
    }]
  },
  'actions': {
    onAdd: function onAdd() {},
    onDelete: function onDelete() {},
    items: [{
      "name": "Notify email",
      "arguments": {
        "to": "Mr.Smith",
        "subject": "Order approve",
        "body": "Dear Mr.Smith...."
      }
    }, {
      "name": "Notify slack",
      "arguments": {
        "team": "opuscapita-team",
        "channel": "orders"
      }
    }, {
      "name": "Approve order",
      "arguments": {
        "orderId": "order-7"
      }
    }]
  }
};

var propTypes = {
  options: _propTypes2.default.objectOf(_propTypes2.default.shape({
    name: _propTypes2.default.string,
    items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      name: _propTypes2.default.string,
      arguments: _propTypes2.default.objectOf(_propTypes2.default.any)
    })),
    onAdd: _propTypes2.default.func,
    onDelete: _propTypes2.default.func
  })),
  name: _propTypes2.default.string,
  description: _propTypes2.default.string,
  onNameChange: _propTypes2.default.func,
  onDescriptionChange: _propTypes2.default.func
};

var defaultProps = {
  options: defaultOptions,
  name: '',
  description: '',
  onNameChange: function onNameChange() {},
  onDescriptionChange: function onDescriptionChange() {}
};

var TransitionInspector = function (_Component) {
  _inherits(TransitionInspector, _Component);

  function TransitionInspector(props) {
    _classCallCheck(this, TransitionInspector);

    var _this = _possibleConstructorReturn(this, (TransitionInspector.__proto__ || Object.getPrototypeOf(TransitionInspector)).call(this, props));

    _this.state = {};

    _this.handleNameChange = _this.handleNameChange.bind(_this);
    _this.handleDescriptionChange = _this.handleDescriptionChange.bind(_this);
    _this.handleDelete = _this.handleDelete.bind(_this);
    return _this;
  }

  _createClass(TransitionInspector, [{
    key: 'handleNameChange',
    value: function handleNameChange(e) {
      this.props.onNameChange(e);
    }
  }, {
    key: 'handleDescriptionChange',
    value: function handleDescriptionChange(e) {
      this.props.onDescriptionChange(e);
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete(e) {
      this.props.onDelete(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          description = _props.description,
          options = _props.options;


      var statesChooserElement = _react2.default.createElement(
        'div',
        null,
        'States chooser should be here'
      );

      return _react2.default.createElement(
        'div',
        { className: 'fsm--transition-inspector' },
        _react2.default.createElement(_Inspector2.default, {
          title: 'Transition',
          contentElement1: statesChooserElement,
          name: name,
          description: description,
          deleteButtonLabel: 'Delete transition',
          onNameChange: this.handleNameChange,
          onDescriptionChange: this.handleDescriptionChange,
          onDelete: this.handleDelete,
          options: options
        })
      );
    }
  }]);

  return TransitionInspector;
}(_react.Component);

exports.default = TransitionInspector;


TransitionInspector.propTypes = propTypes;
TransitionInspector.defaultProps = defaultProps;