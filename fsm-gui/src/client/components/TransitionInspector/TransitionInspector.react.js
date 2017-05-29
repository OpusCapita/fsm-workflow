import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Inspector from '../Inspector';
import './TransitionInspector.less';

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
  onNameChange: PropTypes.func,
  onDescriptionChange: PropTypes.func
};

const defaultProps = {
  options: defaultOptions,
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

    const statesChooserElement = (
      <div>States chooser should be here</div>
    );

    return (
      <div className="fsm--transition-inspector">
        <Inspector
          title="Transition"
          contentElement1={statesChooserElement}
          name={name}
          description={description}
          onNameChange={this.handleNameChange}
          onDescriptionChange={this.handleDescriptionChange}
          options={options}
        />
      </div>
    );
  }
}

TransitionInspector.propTypes = propTypes;
TransitionInspector.defaultProps = defaultProps;
