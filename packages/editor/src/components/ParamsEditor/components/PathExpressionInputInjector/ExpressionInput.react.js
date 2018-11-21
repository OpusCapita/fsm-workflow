import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formatArg } from '../../../utils';

export default class ExpressionInput extends PureComponent {
  static propTypes = {
    value: PropTypes.any,
    onClick: PropTypes.func.isRequired
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  render() {
    const { i18n } = this.context;
    const { value } = this.props;
    return (
      <button
        type="button"
        className="btn btn-link"
        style={{
          textAlign: 'left',
          paddingLeft: 0,
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
        onClick={this.props.onClick}
      >
        {typeof value === 'string' ? formatArg({ i18n, value, expression: true }) : '\u2000'}
      </button>
    )
  }
}
