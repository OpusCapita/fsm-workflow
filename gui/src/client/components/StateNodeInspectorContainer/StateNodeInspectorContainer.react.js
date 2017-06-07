import React, { Component, PropTypes } from 'react';
import './StateNodeInspectorContainer.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as stateNodesActions from '../App/redux/reducer/state-nodes';
import StateNodeInspector from '../StateNodeInspector';
import { capitalize } from '../../utils';

import { ITEM_TYPES } from '../App/redux/reducer/selected-item';

const propTypes = {
  stateNodeKey: PropTypes.string
};

@connect(
  state => ({
    transitions: state.transitions,
    stateNodes: state.stateNodes
  }),
  dispatch => ({ actions: bindActionCreators({ ...stateNodesActions }, dispatch) })
)
export default class StateNodeInspectorContainer extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleNameChange(e) {
    this.props.actions.updateStateNode(this.props.stateNodeKey, { name: e.target.value });
  }

  handleDescriptionChange(e) {
    this.props.actions.updateStateNode(this.props.stateNodeKey, { description: e.target.value });
  }

  render() {
    const { stateNodeKey, stateNodes } = this.props;
    const stateNode = stateNodes[stateNodeKey];

    if(!stateNode) {
      return null;
    }

    const options = stateNode.options ? Object.keys(stateNode.options).reduce((accum, optionKey) => {
      const option = stateNode.options[optionKey];
      return Object.assign({}, accum, { [optionKey]: {
        name: capitalize(optionKey),
        onAdd: () => {},
        onDelete: () => {},
        items: option
      }});
    }, {}) : {};

    return (
      <StateNodeInspector
        name={stateNode.name}
        description={stateNode.description}
        onNameChange={this.handleNameChange}
        onDescriptionChange={this.handleDescriptionChange}
        options={options}
      />
    );
  }
}

StateNodeInspectorContainer.propTypes = propTypes;
