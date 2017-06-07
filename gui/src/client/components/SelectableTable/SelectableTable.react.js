import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SelectableTable.less';

const propTypes = {
  columnNames: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.node)),
  selectedItem: PropTypes.string,
  onChange: PropTypes.func
};
const defaultProps = {
  columnNames: [],
  items: {},
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

  render() {
    const {
      columnNames,
      items,
      selectedItem
    } = this.props;

    const thead = (
      <thead>
        <tr>
          {columnNames.map((columnName, i) => (
            <th key={i}>{columnName}</th>
          ))}
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
                className={itemKey === selectedItem ? 'fsm--selectable-table__item--selected' : ''}
              >
                {itemField}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );

    return (
      <div className="fsm--selectable-table">
        <table className="table">
          {thead}
          {tbody}
        </table>
      </div>
    );
  }
}

SelectableTable.propTypes = propTypes;
SelectableTable.defaultProps = defaultProps;
