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

var _SelectableTable = require('../SelectableTable');

var _SelectableTable2 = _interopRequireDefault(_SelectableTable);

var _FakeInputAutocomplete = require('@opuscapita/react-autocompletes/lib/FakeInputAutocomplete');

var _FakeInputAutocomplete2 = _interopRequireDefault(_FakeInputAutocomplete);

require('./Inspector.less');

var _add_box = require('!!raw-loader!@opuscapita/svg-icons/lib/add_box.svg');

var _add_box2 = _interopRequireDefault(_add_box);

var _clear = require('!!raw-loader!@opuscapita/svg-icons/lib/clear.svg');

var _clear2 = _interopRequireDefault(_clear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  deleteButtonLabel: _propTypes2.default.string,
  onNameChange: _propTypes2.default.func,
  onDescriptionChange: _propTypes2.default.func,
  contentElement1: _propTypes2.default.element,
  contentElement2: _propTypes2.default.element
};

var defaultProps = {
  options: defaultOptions,
  name: '',
  description: '',
  title: 'Inspector',
  onNameChange: function onNameChange() {},
  onDescriptionChange: function onDescriptionChange() {},
  contentElement1: null,
  contentElement2: null,
  deleteButtonLabel: ''
};

var Inspector = function (_Component) {
  _inherits(Inspector, _Component);

  function Inspector(props) {
    _classCallCheck(this, Inspector);

    var _this = _possibleConstructorReturn(this, (Inspector.__proto__ || Object.getPrototypeOf(Inspector)).call(this, props));

    _this.state = {};

    _this.handleNameChange = _this.handleNameChange.bind(_this);
    _this.handleDescriptionChange = _this.handleDescriptionChange.bind(_this);
    _this.handleDelete = _this.handleDelete.bind(_this);
    return _this;
  }

  _createClass(Inspector, [{
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
          deleteButtonLabel = _props.deleteButtonLabel,
          options = _props.options,
          title = _props.title,
          contentElement1 = _props.contentElement1,
          contentElement2 = _props.contentElement2;


      var optionsElement = Object.keys(options).length ? Object.keys(options).map(function (optionKey) {
        return _react2.default.createElement(
          'div',
          { key: optionKey, className: 'fsm--inspector__option' },
          _react2.default.createElement(
            'div',
            { className: 'fsm--inspector__option-header' },
            _react2.default.createElement(
              'label',
              { className: 'control-label' },
              options[optionKey].name,
              ' (',
              options[optionKey].items.length,
              ') :'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'fsm--inspector__option-content' },
            _react2.default.createElement(_SelectableTable2.default, {
              items: options[optionKey].items.reduce(function (accum, item, index) {
                return Object.assign({}, accum, _defineProperty({}, index, [item.name]));
              }, {}),
              onChange: function onChange() {},
              selectedItem: '',
              actions: {
                remove: {
                  svg: _clear2.default,
                  title: 'Delete',
                  action: function action(e, itemKey) {
                    return console.log(e, itemKey);
                  }
                }
              }
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'fsm--inspector__option-footer' },
            _react2.default.createElement(_Button2.default, {
              className: 'fsm--inspector__option-control',
              title: 'Add',
              color: '#0277bd',
              bgColor: '#fff',
              contentPosition: 'before',
              svg: _add_box2.default

            })
          )
        );
      }) : null;

      // TODO add possibility to customize buttons
      var deleteButton = deleteButtonLabel ? _react2.default.createElement(_Button2.default, {
        label: deleteButtonLabel,
        color: '#fff',
        bgColor: '#B71C1C',
        className: 'fsm--inspector__action-button',
        onClick: this.handleDelete
      }) : null;

      return _react2.default.createElement(
        'div',
        { className: 'fsm--inspector' },
        _react2.default.createElement(
          'h4',
          null,
          title
        ),
        _react2.default.createElement(
          'div',
          { className: 'fsm--inspector__main-properties' },
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { className: 'control-label' },
              'Name:'
            ),
            _react2.default.createElement('input', {
              className: 'form-control',
              value: name || '',
              onChange: this.handleNameChange
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { className: 'control-label' },
              'Description:'
            ),
            _react2.default.createElement('textarea', {
              className: 'form-control fsm--inspector__description-textarea',
              value: description || '',
              onChange: this.handleDescriptionChange,
              rows: 3
            })
          ),
          contentElement1,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'fsm--inspector__options' },
              optionsElement
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'fsm--inspector__action-buttons' },
            deleteButton
          ),
          contentElement2
        )
      );
    }
  }]);

  return Inspector;
}(_react.Component);

exports.default = Inspector;


Inspector.propTypes = propTypes;
Inspector.defaultProps = defaultProps;