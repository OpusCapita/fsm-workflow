import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TransitionInspector from '../TransitionInspector';
import './Inspector.less';

const propTypes = {};
const defaultProps = {};

export default
class Inspector extends PureComponent {
  render() {
    return (
      <div className="fsm--inspector">
        <div></div>
        <TransitionInspector />
      </div>
    );
  }
}

Inspector.propTypes = propTypes;
Inspector.defaultProps = defaultProps;
