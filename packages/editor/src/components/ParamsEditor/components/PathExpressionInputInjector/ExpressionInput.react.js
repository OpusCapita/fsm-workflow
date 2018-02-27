import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ExpressionInput extends PureComponent {
  static propTypes = {
    value: PropTypes.any,
    onClick: PropTypes.func.isRequired
  }

  render() {
    const { value } = this.props;
    return (
      <button
        type="button"
        className="btn btn-link"
        style={{
          width: '100%',
          textAlign: 'left',
          border: '1px solid #cccccc'
        }}
        onClick={this.props.onClick}
      >
        {typeof value === 'string' ? value : '\u2000'}
      </button>
    )
  }
}
