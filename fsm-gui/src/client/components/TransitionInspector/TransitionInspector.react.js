import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'opuscapita-react-ui-buttons/lib/Button';
import SelectableTable from '../SelectableTable';
import './TransitionInspector.less';

import addSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/add_box.svg';
import deleteSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/clear.svg';

const defaultTransitionOptions = {
  'guards': {
    name: 'Conditions',
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
    name: 'Actions',
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
        arguments: PropTypes.objectOf(PropTypes.string)
      })),
      onAdd: PropTypes.func,
      onDelete: PropTypes.func
    })
  ),
  name: PropTypes.string,
  description: PropTypes.string,
  onNameChange: PropTypes.func,
  onDescriptionChange: PropTypes.func
};

const defaultProps = {
  options: defaultTransitionOptions,
  name: '',
  description: '',
  onNameChange: () => {},
  onDescriptionChange: () => {}
};

export default
class TransitionInspector extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e);
  }

  handleDescriptionChange(e) {
    this.props.onDescriptionChange(e);
  }

  render() {
    const {
      name,
      description,
      options
    } = this.props;

    const optionsElement = Object.keys(options).length ? (
      Object.keys(options).map(optionKey => (
        <div key={optionKey} className="fsm--transition-inspector__option">
          <div className="fsm--transition-inspector__option-header">
            <label className="control-label">{options[optionKey].name}:</label>
          </div>
          <div className="fsm--transition-inspector__option-content">
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
          <div className="fsm--transition-inspector__option-footer">
            <Button
              className="fsm--transition-inspector__option-control"
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

    return (
      <div className="fsm--transition-inspector">
        <h4>Transition</h4>
        <div className="fsm--transition-inspector__main-properties">
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
              className="form-control fsm--transition-inspector__description-textarea"
              value={description || ''}
              onChange={this.handleDescriptionChange}
              rows={3}
            />
          </div>
          <div>
            <div className="fsm--transition-inspector__options">
              {optionsElement}
            </div>
          </div>
          <div className="fsm--transition-inspector__action-buttons">
            <Button
              label="Delete transition"
              color="#fff"
              bgColor="#B71C1C"
              className="fsm--transition-inspector__action-button"
            />
          </div>
        </div>
      </div>
    );
  }
}

TransitionInspector.propTypes = propTypes;
TransitionInspector.defaultProps = defaultProps;
