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

require('./SelectableTable.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  columnNames: _propTypes2.default.arrayOf(_propTypes2.default.string),
  actionsColumnName: _propTypes2.default.string,
  items: _propTypes2.default.objectOf(_propTypes2.default.arrayOf(_propTypes2.default.node)),
  selectedItem: _propTypes2.default.string,
  actions: _propTypes2.default.objectOf(_propTypes2.default.shape({
    svg: _propTypes2.default.string,
    title: _propTypes2.default.string,
    action: _propTypes2.default.func
  })),
  onChange: _propTypes2.default.func
};
var defaultProps = {
  columnNames: [],
  actionsColumnName: '',
  items: {},
  actions: {},
  selectedItem: '',
  onChange: function onChange() {}
};

var SelectableTable = function (_Component) {
  _inherits(SelectableTable, _Component);

  function SelectableTable(props) {
    _classCallCheck(this, SelectableTable);

    var _this = _possibleConstructorReturn(this, (SelectableTable.__proto__ || Object.getPrototypeOf(SelectableTable)).call(this, props));

    _this.handleItemClick = _this.handleItemClick.bind(_this);
    return _this;
  }

  _createClass(SelectableTable, [{
    key: 'handleItemClick',
    value: function handleItemClick(itemKey) {
      this.props.onChange(itemKey);
    }
  }, {
    key: 'renderActionsTd',
    value: function renderActionsTd(itemKey) {
      var _props = this.props,
          actions = _props.actions,
          selectedItem = _props.selectedItem;

      return Object.keys(actions).length ? _react2.default.createElement(
        'td',
        {
          className: '\n          fsm--selectable-table__item\n          fsm--selectable-table__item--actions\n          ' + (itemKey === selectedItem ? 'fsm--selectable-table__item--selected' : '')
        },
        _react2.default.createElement(
          'div',
          { className: 'fsm--selectable-table__actions' },
          Object.keys(actions).map(function (actionKey) {
            return _react2.default.createElement(
              'div',
              { className: 'fsm--selectable-table__action', key: actionKey },
              _react2.default.createElement(_Button2.default, {
                onClick: actions[actionKey].action,
                svg: actions[actionKey].svg,
                svgSize: '18px',
                color: itemKey === selectedItem ? '#fff' : '#333',
                bgColor: 'transparent',
                title: actions[actionKey].title
              })
            );
          })
        )
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          columnNames = _props2.columnNames,
          actionsColumnName = _props2.actionsColumnName,
          actions = _props2.actions,
          items = _props2.items,
          selectedItem = _props2.selectedItem;


      var thead = _react2.default.createElement(
        'thead',
        null,
        _react2.default.createElement(
          'tr',
          null,
          columnNames.map(function (columnName, i) {
            return _react2.default.createElement(
              'th',
              { key: i, title: columnName },
              _react2.default.createElement(
                'div',
                { className: 'fsm--selectable-table__cell-content' },
                columnName
              )
            );
          }),
          actionsColumnName ? _react2.default.createElement(
            'th',
            { className: 'fsm--selectable-table__actions-th', title: actionsColumnName },
            _react2.default.createElement(
              'div',
              { className: 'fsm--selectable-table__cell-content' },
              actionsColumnName || ''
            )
          ) : null
        )
      );

      var tbody = _react2.default.createElement(
        'tbody',
        null,
        Object.keys(items).map(function (itemKey) {
          return _react2.default.createElement(
            'tr',
            {
              key: itemKey,
              className: 'fsm--selectable-table__item-tr',
              onClick: function onClick() {
                return _this2.handleItemClick(itemKey);
              }
            },
            items[itemKey].map(function (itemField, i) {
              return _react2.default.createElement(
                'td',
                {
                  key: itemKey + '-' + i,
                  className: '\n                  fsm--selectable-table__item\n                  ' + (itemKey === selectedItem ? 'fsm--selectable-table__item--selected' : ''),
                  title: itemField
                },
                _react2.default.createElement(
                  'div',
                  { className: 'fsm--selectable-table__cell-content' },
                  itemField
                )
              );
            }),
            _this2.renderActionsTd(itemKey)
          );
        })
      );

      return _react2.default.createElement(
        'table',
        { className: 'fsm--selectable-table table' },
        thead,
        tbody
      );
    }
  }]);

  return SelectableTable;
}(_react.Component);

exports.default = SelectableTable;


SelectableTable.propTypes = propTypes;
SelectableTable.defaultProps = defaultProps;