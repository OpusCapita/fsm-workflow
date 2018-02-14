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

require('./StateNodeInspector.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultOptions = {
  'properties': {
    name: 'Properties',
    onAdd: function onAdd() {},
    onDelete: function onDelete() {},
    items: [{
      "name": "Property 1",
      "arguments": {
        "key": "prop 1 key",
        "value": "prop 1 value"
      }
    }, {
      "name": "Property 2",
      "arguments": {
        "key": "prop 2 key",
        "value": "prop 2 value"
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

var StateNodeInspector = function (_Component) {
  _inherits(StateNodeInspector, _Component);

  function StateNodeInspector(props) {
    _classCallCheck(this, StateNodeInspector);

    var _this = _possibleConstructorReturn(this, (StateNodeInspector.__proto__ || Object.getPrototypeOf(StateNodeInspector)).call(this, props));

    _this.state = {};

    _this.handleNameChange = _this.handleNameChange.bind(_this);
    _this.handleDescriptionChange = _this.handleDescriptionChange.bind(_this);
    _this.handleDelete = _this.handleDelete.bind(_this);
    return _this;
  }

  _createClass(StateNodeInspector, [{
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
          options = _props.options,
          onDelete = _props.onDelete;


      var transitionsListElement = _react2.default.createElement(
        'div',
        null,
        'Transitions list should be here'
      );

      return _react2.default.createElement(
        'div',
        { className: 'fsm--state-node-inspector' },
        _react2.default.createElement(_Inspector2.default, {
          title: 'State',
          name: name,
          contentElement1: transitionsListElement,
          description: description,
          deleteButtonLabel: 'Delete state',
          onNameChange: this.handleNameChange,
          onDesriptionChange: this.handleDescriptionChange,
          onDelete: this.handleDelete,
          options: options
        })
      );
    }
  }]);

  return StateNodeInspector;
}(_react.Component);

exports.default = StateNodeInspector;


StateNodeInspector.propTypes = propTypes;
StateNodeInspector.defaultProps = defaultProps;