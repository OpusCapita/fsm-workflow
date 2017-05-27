import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Inspector.less';

const propTypes = {};
const defaultProps = {};

export default
class Inspector extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div className="fsm--inspector">
        {children}
      </div>
    );
  }
}

Inspector.propTypes = propTypes;
Inspector.defaultProps = defaultProps;
