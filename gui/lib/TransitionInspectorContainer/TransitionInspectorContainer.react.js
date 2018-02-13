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

require('./TransitionInspectorContainer.less');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _transitions = require('../App/redux/reducer/transitions.js');

var transitionsActions = _interopRequireWildcard(_transitions);

var _TransitionInspector = require('../TransitionInspector');

var _TransitionInspector2 = _interopRequireDefault(_TransitionInspector);

var _utils = require('../../utils');

var _selectedItem = require('../App/redux/reducer/selected-item');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  transitionKey: _react.PropTypes.string
};

var TransitionInspectorContainer = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    transitions: state.transitions,
    stateNodes: state.stateNodes
  };
}, function (dispatch) {
  return { actions: (0, _redux.bindActionCreators)(_extends({}, transitionsActions), dispatch) };
}), _dec(_class = function (_Component) {
  _inherits(TransitionInspectorContainer, _Component);

  function TransitionInspectorContainer(props) {
    _classCallCheck(this, TransitionInspectorContainer);

    var _this = _possibleConstructorReturn(this, (TransitionInspectorContainer.__proto__ || Object.getPrototypeOf(TransitionInspectorContainer)).call(this, props));

    _this.handleNameChange = _this.handleNameChange.bind(_this);
    _this.handleDescriptionChange = _this.handleDescriptionChange.bind(_this);
    _this.handleDelete = _this.handleDelete.bind(_this);
    return _this;
  }

  _createClass(TransitionInspectorContainer, [{
    key: 'handleNameChange',
    value: function handleNameChange(e) {
      this.props.actions.updateTransition(this.props.transitionKey, { name: e.target.value });
    }
  }, {
    key: 'handleDescriptionChange',
    value: function handleDescriptionChange(e) {
      this.props.actions.updateTransition(this.props.transitionKey, { description: e.target.value });
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete(e, transitionKey) {
      this.props.actions.deleteTransition(transitionKey);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          transitionKey = _props.transitionKey,
          transitions = _props.transitions;

      var transition = transitions[transitionKey];

      if (!transition) {
        return null;
      }

      var options = Object.keys(transition.options).reduce(function (accum, optionKey) {
        var option = transition.options[optionKey];
        return Object.assign({}, accum, _defineProperty({}, optionKey, {
          name: (0, _utils.capitalize)(optionKey),
          onAdd: function onAdd() {},
          onDelete: function onDelete() {},
          items: option
        }));
      }, {});

      return _react2.default.createElement(_TransitionInspector2.default, {
        name: transition.name,
        description: transition.description,
        onNameChange: this.handleNameChange,
        onDescriptionChange: this.handleDescriptionChange,
        options: options,
        onDelete: function onDelete(e) {
          return _this2.handleDelete(e, transitionKey);
        }
      });
    }
  }]);

  return TransitionInspectorContainer;
}(_react.Component)) || _class);
exports.default = TransitionInspectorContainer;


TransitionInspectorContainer.propTypes = propTypes;