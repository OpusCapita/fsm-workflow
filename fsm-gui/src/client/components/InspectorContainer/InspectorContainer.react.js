import React, { PureComponent, PropTypes } from 'react';
import './InspectorContainer.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion } from 'react-motion';
import Inspector from '../Inspector';
import TransitionInspectorContainer from '../TransitionInspectorContainer';

import { ITEM_TYPES } from '../App/redux/reducer/selected-item';
import * as layoutActions from '../App/redux/reducer/layout';

const propTypes = {
  showInspector: PropTypes.bool
};
const defaultProps = {
  showInspector: true
};

@connect(
  state => ({
    showInspector: state.layout.showInspector,
    selectedItemType: state.selectedItem.itemType,
    selectedItemId: state.selectedItem.itemId,
    transitions: state.transitions,
    stateNodes: state.stateNodes
  }),
  dispatch => ({ actions: bindActionCreators(layoutActions, dispatch) })
)
export default class InspectorContainer extends PureComponent {
  renderInspectorChild() {
    if(this.props.selectedItemType === ITEM_TYPES.TRANSITION) {
      return (
        <TransitionInspectorContainer
          transitionKey={this.props.selectedItemId}
        />
      );
    }
    return null;
  }

  render() {
    let inspectorChild = this.renderInspectorChild();

    return (
      <Motion
        defaultStyle={{
          x: this.props.showInspector ? 0 : 100,
          y: this.props.showInspector ? 0.65 : 0
        }}
        style={{
          x: this.props.showInspector ? spring(0) : spring(100),
          y: this.props.showInspector ? spring(0.65) : spring(0)
        }}
      >
        {interpolatedStyle => (
          <div
            className="fsm--inspector-container"
            style={{
              transform: `translate(${interpolatedStyle.x}%, 0)`,
              boxShadow: `rgba(0, 0, 0, ${interpolatedStyle.y}) 0px 0px 12px`
            }}
          >
            <Inspector>
              {inspectorChild}
            </Inspector>
          </div>
        )}
      </Motion>
    );
  }
}

InspectorContainer.propTypes = propTypes;
InspectorContainer.defaultProps = defaultProps;
