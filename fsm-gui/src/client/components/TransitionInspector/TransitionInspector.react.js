import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Inspector from '../Inspector';
import './TransitionInspector.less';

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
        arguments: PropTypes.objectOf(PropTypes.any)
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

    const statesChooser = (
      <div>States chooser should be here</div>
    );

    return (
      <div className="fsm--transition-inspector">
        <Inspector
          title="Transition"
          contentElement1={statesChooser}
          name={name}
          description={description}
          onNameChange={this.handleNameChange}
          onDesriptionChange={this.handleDescriptionChange}
          options={options}
        />
      </div>
    );
  }
}

TransitionInspector.propTypes = propTypes;
TransitionInspector.defaultProps = defaultProps;
