import React, { PureComponent, PropTypes } from 'react';
import './TransitionInspectorContainer.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TransitionInspector from '../TransitionInspector';

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
    console.log('trsk', transitionKey);
    console.log('trs', transitions);
    console.log('tr', transition);
    if(!transition) {
      return null;
    }

    return (
      <TransitionInspector
        name={transition.name}
        description={transition.description}
        onNameChange={(e) => console.log(e)}
        onDescriptionChange={(e) => console.log(e)}
        options={transition.options}
      />
    );
  }
}

TransitionInspectorContainer.propTypes = propTypes;
