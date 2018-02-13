'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./StateNodeInspectorContainer.less');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _stateNodes = require('../App/redux/reducer/state-nodes');

var stateNodesActions = _interopRequireWildcard(_stateNodes);

var _StateNodeInspector = require('../StateNodeInspector');

var _StateNodeInspector2 = _interopRequireDefault(_StateNodeInspector);

var _utils = require('../../utils');

var _selectedItem = require('../App/redux/reducer/selected-item');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  stateNodeKey: _react.PropTypes.string
};

var StateNodeInspectorContainer = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    transitions: state.transitions,
    stateNodes: state.stateNodes
  };
}, function (dispatch) {
  return { actions: (0, _redux.bindActionCreators)(_extends({}, stateNodesActions), dispatch) };
}), _dec(_class = function (_Component) {
  _inherits(StateNodeInspectorContainer, _Component);

  function StateNodeInspectorContainer(props) {
    _classCallCheck(this, StateNodeInspectorContainer);

    var _this = _possibleConstructorReturn(this, (StateNodeInspectorContainer.__proto__ || Object.getPrototypeOf(StateNodeInspectorContainer)).call(this, props));

    _this.handleNameChange = _this.handleNameChange.bind(_this);
    _this.handleDescriptionChange = _this.handleDescriptionChange.bind(_this);
    _this.handleDelete = _this.handleDelete.bind(_this);
    return _this;
  }

  _createClass(StateNodeInspectorContainer, [{
    key: 'handleNameChange',
    value: function handleNameChange(e) {
      this.props.actions.updateStateNode(this.props.stateNodeKey, { name: e.target.value });
    }
  }, {
    key: 'handleDescriptionChange',
    value: function handleDescriptionChange(e) {
      this.props.actions.updateStateNode(this.props.stateNodeKey, { description: e.target.value });
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete(e, stateNodeKey) {
      this.props.actions.deleteStateNode(stateNodeKey);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          stateNodeKey = _props.stateNodeKey,
          stateNodes = _props.stateNodes;

      var stateNode = stateNodes[stateNodeKey];

      if (!stateNode) {
        return null;
      }

      var options = stateNode.options ? Object.keys(stateNode.options).reduce(function (accum, optionKey) {
        var option = stateNode.options[optionKey];
        return Object.assign({}, accum, _defineProperty({}, optionKey, {
          name: (0, _utils.capitalize)(optionKey),
          onAdd: function onAdd() {},
          onDelete: function onDelete() {},
          items: option
        }));
      }, {}) : {};

      return _react2.default.createElement(_StateNodeInspector2.default, {
        name: stateNode.name,
        description: stateNode.description,
        onNameChange: this.handleNameChange,
        onDescriptionChange: this.handleDescriptionChange,
        options: options,
        onDelete: function onDelete(e) {
          return _this2.handleDelete(e, stateNodeKey);
        }
      });
    }
  }]);

  return StateNodeInspectorContainer;
}(_react.Component)) || _class);
exports.default = StateNodeInspectorContainer;


StateNodeInspectorContainer.propTypes = propTypes;