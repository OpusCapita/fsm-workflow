import React, { Component, PropTypes } from 'react';
import './StateNodeInspectorContainer.less';

export default
class StateNodeInspectorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="state-node-inspector-container">
      </div>
    );
  }
}

StateNodeInspectorContainer.propTypes = {
};
StateNodeInspectorContainer.defaultProps = {
};
