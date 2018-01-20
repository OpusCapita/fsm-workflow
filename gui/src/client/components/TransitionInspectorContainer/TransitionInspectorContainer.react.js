import React, { Component, PropTypes } from 'react';
import './TransitionInspectorContainer.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as transitionsActions from '../App/redux/reducer/transitions.js';
import TransitionInspector from '../TransitionInspector';
import { capitalize } from '../../utils';

import { ITEM_TYPES } from '../App/redux/reducer/selected-item';

const propTypes = {
  transitionKey: PropTypes.string
};

@connect(
  state => ({
    transitions: state.transitions,
    stateNodes: state.stateNodes
  }),
  dispatch => ({ actions: bindActionCreators({ ...transitionsActions }, dispatch) })
)
export default class TransitionInspectorContainer extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleNameChange(e) {
    this.props.actions.updateTransition(this.props.transitionKey, { name: e.target.value });
  }

  handleDescriptionChange(e) {
    this.props.actions.updateTransition(this.props.transitionKey, { description: e.target.value });
  }

  handleDelete(e, transitionKey) {
    this.props.actions.deleteTransition(transitionKey);
  }

  render() {
    const { transitionKey, transitions } = this.props;
    const transition = transitions[transitionKey];

    if(!transition) {
      return null;
    }

    const options = Object.keys(transition.options).reduce((accum, optionKey) => {
      const option = transition.options[optionKey];
      return Object.assign({}, accum, { [optionKey]: {
        name: capitalize(optionKey),
        onAdd: () => {},
        onDelete: () => {},
        items: option
      }});
    }, {});

    return (
      <TransitionInspector
        name={transition.name}
        description={transition.description}
        onNameChange={this.handleNameChange}
        onDescriptionChange={this.handleDescriptionChange}
        options={options}
        onDelete={(e) => this.handleDelete(e, transitionKey)}
      />
    );
  }
}

TransitionInspectorContainer.propTypes = propTypes;
