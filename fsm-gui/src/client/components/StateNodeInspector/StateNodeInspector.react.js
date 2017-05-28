import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Inspector from '../Inspector';
import './StateNodeInspector.less';

const defaultOptions = {
  'properties': {
    name: 'Properties',
    onAdd: () => {},
    onDelete: () => {},
    items: [{
      "name": "Property 1",
      "arguments": {
        "key": "prop 1 key",
        "value": "prop 1 value"
      }
    }, {
      "name": "Property 2",
      "arguments": {
        "key": "prop 2 key",
        "value": "prop 2 value"
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
class StateNodeInspector extends Component {
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

    const transitionsListElement = (
      <div>Transitions list should be here</div>
    );

    return (
      <div className="fsm--state-node-inspector">
        <Inspector
          title="State"
          name={name}
          contentElement1={transitionsListElement}
          description={description}
          onNameChange={this.handleNameChange}
          onDesriptionChange={this.handleDescriptionChange}
          options={options}
        />
      </div>
    );
  }
}

StateNodeInspector.propTypes = propTypes;
StateNodeInspector.defaultProps = defaultProps;
