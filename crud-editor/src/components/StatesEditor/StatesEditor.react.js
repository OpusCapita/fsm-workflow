import React, { PureComponent } from 'react';
import statesPropTypes from './statesPropTypes';
import './StatesEditor.less';

export default class StatesEditor extends PureComponent {
  static propTypes = {
    states: statesPropTypes
  }

  state = {
    states: this.props.states
  }

  render() {
    const { states } = this.props;

    return (
      <div className="oc-fsm-crud-editor--states-editor">
        states
      </div>
    )
  }
}