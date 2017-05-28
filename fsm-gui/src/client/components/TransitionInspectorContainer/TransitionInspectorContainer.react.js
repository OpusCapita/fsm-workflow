import React, { PureComponent, PropTypes } from 'react';
import './TransitionInspectorContainer.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
  dispatch => ({ actions: bindActionCreators({}, dispatch) })
)
export default class TransitionInspectorContainer extends PureComponent {
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
        onNameChange={(e) => console.log(e)}
        onDescriptionChange={(e) => console.log(e)}
        options={options}
      />
    );
  }
}

TransitionInspectorContainer.propTypes = propTypes;
