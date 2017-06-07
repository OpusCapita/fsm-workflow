import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Transition.less';

export default
class Transition extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="transition">
      </div>
    );
  }
}

Transition.propTypes = {
};
Transition.defaultProps = {
};
