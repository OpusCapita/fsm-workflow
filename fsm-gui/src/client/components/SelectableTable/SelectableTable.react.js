import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'opuscapita-react-ui-buttons/lib/Button';
import './SelectableTable.less';

const propTypes = {
  columnNames: PropTypes.arrayOf(PropTypes.string),
  actionsColumnName: PropTypes.string,
  items: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.node)),
  selectedItem: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.shape({
    svg: PropTypes.string,
    title: PropTypes.string,
    action: PropTypes.func
  })),
  onChange: PropTypes.func
};
const defaultProps = {
  columnNames: [],
  actionsColumnName: '',
  items: {},
  actions: {},
  selectedItem: '',
  onChange: () => {}
};

export default
class SelectableTable extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(itemKey) {
    this.props.onChange(itemKey);
  }

  renderActionsTd(itemKey) {
    const { actions, selectedItem } = this.props;
    return Object.keys(actions).length ? (
      <td
        className={`
          fsm--selectable-table__item
          ${itemKey === selectedItem ? 'fsm--selectable-table__item--selected' : ''}`
        }
      >
        <div className="fsm--selectable-table__actions">
          {Object.keys(actions).map(actionKey => (
            <div className="fsm--selectable-table__action" key={actionKey}>
              <Button
                onClick={actions[actionKey].action}
                svg={actions[actionKey].svg}
                svgSize="18px"
                color={itemKey === selectedItem ? '#fff' : '#333'}
                bgColor="transparent"
                title={actions[actionKey].title}
              />
            </div>
          ))}
        </div>
      </td>
    ) : null;
  }

  render() {
    const {
      columnNames,
      actionsColumnName,
      actions,
      items,
      selectedItem
    } = this.props;

    const thead = (
      <thead>
        <tr>
          {columnNames.map((columnName, i) => (
            <th key={i} title={columnName}>
              <div className="fsm--selectable-table__cell-content">
                {columnName}
              </div>
            </th>
          ))}
          {actionsColumnName ? (
            <th className="fsm--selectable-table__actions-th" title={actionsColumnName}>
              <div className="fsm--selectable-table__cell-content">
                {actionsColumnName || ''}
              </div>
            </th>) : null
          }
        </tr>
      </thead>
    );

    const tbody = (
      <tbody>
        {Object.keys(items).map(itemKey => (
          <tr
            key={itemKey}
            className="fsm--selectable-table__item-tr"
            onClick={() => this.handleItemClick(itemKey)}
          >
            {items[itemKey].map((itemField, i) => (
              <td
                key={itemKey + '-' + i}
                className={`
                  fsm--selectable-table__item
                  ${itemKey === selectedItem ? 'fsm--selectable-table__item--selected' : ''}`
                }
                title={itemField}
              >
                <div className="fsm--selectable-table__cell-content">
                  {itemField}
                </div>
              </td>
            ))}
          {this.renderActionsTd(itemKey)}
          </tr>
        ))}
      </tbody>
    );

    return (
      <table className="fsm--selectable-table table">
          {thead}
          {tbody}
      </table>
    );
  }
}

SelectableTable.propTypes = propTypes;
SelectableTable.defaultProps = defaultProps;
