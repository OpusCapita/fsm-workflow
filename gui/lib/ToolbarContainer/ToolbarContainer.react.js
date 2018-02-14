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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Toolbar = require('../Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _viewport = require('../App/redux/reducer/viewport');

var viewportActions = _interopRequireWildcard(_viewport);

var _layout = require('../App/redux/reducer/layout');

var layoutActions = _interopRequireWildcard(_layout);

var _add = require('!!raw-loader!@opuscapita/svg-icons/lib/add.svg');

var _add2 = _interopRequireDefault(_add);

var _arrow_back = require('!!raw-loader!@opuscapita/svg-icons/lib/arrow_back.svg');

var _arrow_back2 = _interopRequireDefault(_arrow_back);

var _arrow_forward = require('!!raw-loader!@opuscapita/svg-icons/lib/arrow_forward.svg');

var _arrow_forward2 = _interopRequireDefault(_arrow_forward);

var _content_cut = require('!!raw-loader!@opuscapita/svg-icons/lib/content_cut.svg');

var _content_cut2 = _interopRequireDefault(_content_cut);

var _content_copy = require('!!raw-loader!@opuscapita/svg-icons/lib/content_copy.svg');

var _content_copy2 = _interopRequireDefault(_content_copy);

var _content_paste = require('!!raw-loader!@opuscapita/svg-icons/lib/content_paste.svg');

var _content_paste2 = _interopRequireDefault(_content_paste);

var _select_all = require('!!raw-loader!@opuscapita/svg-icons/lib/select_all.svg');

var _select_all2 = _interopRequireDefault(_select_all);

var _all_inclusive = require('!!raw-loader!@opuscapita/svg-icons/lib/all_inclusive.svg');

var _all_inclusive2 = _interopRequireDefault(_all_inclusive);

var _live_help = require('!!raw-loader!@opuscapita/svg-icons/lib/live_help.svg');

var _live_help2 = _interopRequireDefault(_live_help);

var _tune = require('!!raw-loader!@opuscapita/svg-icons/lib/tune.svg');

var _tune2 = _interopRequireDefault(_tune);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToolbarContainer = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    cursorPosition: state.viewport.cursorPosition,
    viewportRect: state.viewport.viewportRect,
    viewportScale: state.viewport.viewportScale,
    viewportPanOffset: state.viewport.viewportPanOffset,
    appElementRef: state.layout.appElementRef,
    showInspector: state.layout.showInspector
  };
}, function (dispatch) {
  return { actions: (0, _redux.bindActionCreators)(_extends({}, viewportActions, layoutActions), dispatch) };
}), _dec(_class = function (_Component) {
  _inherits(ToolbarContainer, _Component);

  function ToolbarContainer(props) {
    _classCallCheck(this, ToolbarContainer);

    var _this = _possibleConstructorReturn(this, (ToolbarContainer.__proto__ || Object.getPrototypeOf(ToolbarContainer)).call(this, props));

    _this.handleShowInspector = _this.handleShowInspector.bind(_this);
    _this.handleShowHelp = _this.handleShowHelp.bind(_this);
    return _this;
  }

  _createClass(ToolbarContainer, [{
    key: 'handleShowInspector',
    value: function handleShowInspector() {
      this.props.actions.updateLayoutProperty('showInspector', !this.props.showInspector);
    }
  }, {
    key: 'handleShowHelp',
    value: function handleShowHelp() {
      this.props.actions.updateLayoutProperty('showHelp', true);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          appElementRef = _props.appElementRef,
          showInspector = _props.showInspector;


      return _react2.default.createElement(_Toolbar2.default, {
        restrictorNode: appElementRef,
        controlsLeft: [{
          action: function action() {},
          iconSVG: _arrow_back2.default,
          title: 'Back',
          label: '',
          active: false,
          disabled: true
        }, {
          action: function action() {},
          iconSVG: _arrow_forward2.default,
          title: 'Forward',
          label: '',
          active: false,
          disabled: true
        }, {
          action: function action() {},
          iconSVG: _content_cut2.default,
          title: 'Cut',
          label: '',
          active: false,
          disabled: true
        }, {
          action: function action() {},
          iconSVG: _content_copy2.default,
          title: 'Copy',
          label: '',
          active: false,
          disabled: true
        }, {
          action: function action() {},
          iconSVG: _content_paste2.default,
          title: 'Paste',
          label: '',
          active: false,
          disabled: true
        }, null, {
          action: function action() {},
          iconSVG: _select_all2.default,
          title: 'Multiple select',
          label: '',
          active: false,
          disabled: false
        }, null, {
          action: function action() {},
          iconSVG: _add2.default,
          title: 'Add State',
          label: 'State',
          active: false,
          disabled: false
        }, {
          action: function action() {},
          iconSVG: _add2.default,
          title: 'Add Transition',
          label: 'Transition',
          active: false,
          disabled: false
        }, {
          action: function action() {},
          iconSVG: _all_inclusive2.default,
          title: 'Simulate',
          label: 'Simulate',
          active: false,
          disabled: false
        }, null, {
          action: this.handleShowInspector,
          iconSVG: _tune2.default,
          title: 'Show inspector',
          label: '',
          active: showInspector,
          disabled: false
        }],

        controlsRight: [{
          action: function action() {},
          iconSVG: null,
          title: 'Cancel',
          label: 'Cancel',
          active: false,
          disabled: false
        }, {
          action: function action() {},
          iconSVG: null,
          title: 'Save',
          label: 'Save',
          active: false,
          disabled: false,
          color: '#fff',
          bgColor: '#0277bd'
        }, null, {
          action: this.handleShowHelp,
          iconSVG: _live_help2.default,
          title: 'Need help?',
          label: '',
          active: false,
          disabled: false
        }]
      });
    }
  }]);

  return ToolbarContainer;
}(_react.Component)) || _class);
exports.default = ToolbarContainer;