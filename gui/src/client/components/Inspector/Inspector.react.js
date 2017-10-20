import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@opuscapita/react-buttons/lib/Button';
import SelectableTable from '../SelectableTable';
import FakeInputAutocomplete from '@opuscapita/react-autocompletes/lib/FakeInputAutocomplete';
import './Inspector.less';

import addSVG from '!!raw-loader!@opuscapita/svg-icons/lib/add_box.svg';
import deleteSVG from '!!raw-loader!@opuscapita/svg-icons/lib/clear.svg';

const defaultOptions = {
  'guards': {
    onAdd: () => {},
    onDelete: () => {},
    items: [{
      "name": "Order has been paid",
      "arguments": {
        "isPaid": true
      }
    }]
  },
  'actions': {
    onAdd: () => {},
    onDelete: () => {},
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

const propTypes = {
  options: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        arguments: PropTypes.objectOf(PropTypes.any)
      })),
      onAdd: PropTypes.func,
      onDelete: PropTypes.func
    })
  ),
  name: PropTypes.string,
  description: PropTypes.string,
  deleteButtonLabel: PropTypes.string,
  onNameChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
  contentElement1: PropTypes.element,
  contentElement2: PropTypes.element
};

const defaultProps = {
  options: defaultOptions,
  name: '',
  description: '',
  title: 'Inspector',
  onNameChange: () => {},
  onDescriptionChange: () => {},
  contentElement1: null,
  contentElement2: null,
  deleteButtonLabel: ''
};

export default
class Inspector extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e);
  }

  handleDescriptionChange(e) {
    this.props.onDescriptionChange(e);
  }

  handleDelete(e) {
    this.props.onDelete(e);
  }

  render() {
    const {
      name,
      description,
      deleteButtonLabel,
      options,
      title,
      contentElement1,
      contentElement2
    } = this.props;

    const optionsElement = Object.keys(options).length ? (
      Object.keys(options).map(optionKey => (
        <div key={optionKey} className="fsm--inspector__option">
          <div className="fsm--inspector__option-header">
            <label className="control-label">{options[optionKey].name} ({options[optionKey].items.length}) :</label>
          </div>
          <div className="fsm--inspector__option-content">
            <SelectableTable
              items={
                options[optionKey].items.reduce((accum, item, index) =>
                  Object.assign({}, accum, { [index]: [item.name] }),
                {})
              }
              onChange={() => {}}
              selectedItem={''}
              actions={{
                remove: {
                  svg: deleteSVG,
                  title: 'Delete',
                  action: (e, itemKey) => console.log(e, itemKey)
                }
              }}
            />
          </div>
          <div className="fsm--inspector__option-footer">
            <Button
              className="fsm--inspector__option-control"
              title="Add"
              color="#0277bd"
              bgColor="#fff"
              contentPosition="before"
              svg={addSVG}

            />
          </div>
        </div>
      ))
    ) : null;

    // TODO add possibility to customize buttons
    const deleteButton = deleteButtonLabel ? (
      <Button
        label={deleteButtonLabel}
        color="#fff"
        bgColor="#B71C1C"
        className="fsm--inspector__action-button"
        onClick={this.handleDelete}
      />
    ) : null;

    return (
      <div className="fsm--inspector">
        <h4>{title}</h4>
        <div className="fsm--inspector__main-properties">
          <div className="form-group">
            <label className="control-label">Name:</label>
            <input
              className="form-control"
              value={name || ''}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="form-group">
            <label className="control-label">Description:</label>
            <textarea
              className="form-control fsm--inspector__description-textarea"
              value={description || ''}
              onChange={this.handleDescriptionChange}
              rows={3}
            />
          </div>
          {contentElement1}
          <div>
            <div className="fsm--inspector__options">
              {optionsElement}
            </div>
          </div>
          <div className="fsm--inspector__action-buttons">
            {deleteButton}
          </div>
          {contentElement2}
        </div>
      </div>
    );
  }
}

Inspector.propTypes = propTypes;
Inspector.defaultProps = defaultProps;
