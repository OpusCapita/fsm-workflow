'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./InspectorContainer.less');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactMotion = require('react-motion');

var _TransitionInspectorContainer = require('../TransitionInspectorContainer');

var _TransitionInspectorContainer2 = _interopRequireDefault(_TransitionInspectorContainer);

var _StateNodeInspectorContainer = require('../StateNodeInspectorContainer');

var _StateNodeInspectorContainer2 = _interopRequireDefault(_StateNodeInspectorContainer);

var _selectedItem = require('../App/redux/reducer/selected-item');

var _layout = require('../App/redux/reducer/layout');

var layoutActions = _interopRequireWildcard(_layout);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  showInspector: _react.PropTypes.bool
};
var defaultProps = {
  showInspector: true
};

var InspectorContainer = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    showInspector: state.layout.showInspector,
    selectedItemType: state.selectedItem.itemType,
    selectedItemId: state.selectedItem.itemId,
    transitions: state.transitions,
    stateNodes: state.stateNodes
  };
}, function (dispatch) {
  return { actions: (0, _redux.bindActionCreators)(layoutActions, dispatch) };
}), _dec(_class = function (_PureComponent) {
  _inherits(InspectorContainer, _PureComponent);

  function InspectorContainer() {
    _classCallCheck(this, InspectorContainer);

    return _possibleConstructorReturn(this, (InspectorContainer.__proto__ || Object.getPrototypeOf(InspectorContainer)).apply(this, arguments));
  }

  _createClass(InspectorContainer, [{
    key: 'renderInspector',
    value: function renderInspector() {
      if (this.props.selectedItemType === _selectedItem.ITEM_TYPES.TRANSITION) {
        return _react2.default.createElement(_TransitionInspectorContainer2.default, {
          transitionKey: this.props.selectedItemId
        });
      }

      if (this.props.selectedItemType === _selectedItem.ITEM_TYPES.STATE) {
        return _react2.default.createElement(_StateNodeInspectorContainer2.default, {
          stateNodeKey: this.props.selectedItemId
        });
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var inspector = this.renderInspector();

      return _react2.default.createElement(
        _reactMotion.Motion,
        {
          defaultStyle: {
            x: this.props.showInspector ? 0 : 100,
            y: this.props.showInspector ? 0.65 : 0
          },
          style: {
            x: this.props.showInspector ? (0, _reactMotion.spring)(0) : (0, _reactMotion.spring)(100),
            y: this.props.showInspector ? (0, _reactMotion.spring)(0.65) : (0, _reactMotion.spring)(0)
          }
        },
        function (interpolatedStyle) {
          return _react2.default.createElement(
            'div',
            {
              className: 'fsm--inspector-container',
              style: {
                transform: 'translate(' + interpolatedStyle.x + '%, 0)',
                boxShadow: 'rgba(0, 0, 0, ' + interpolatedStyle.y + ') 0px 0px 12px'
              }
            },
            inspector
          );
        }
      );
    }
  }]);

  return InspectorContainer;
}(_react.PureComponent)) || _class);
exports.default = InspectorContainer;


InspectorContainer.propTypes = propTypes;
InspectorContainer.defaultProps = defaultProps;