import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ExpressionSwitcher extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    expression: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  }

  componentDidMount() {
    // adjust label width
    if (this.ref) {
      const { parentElement } = this.ref;
      if (parentElement && parentElement.nodeName === 'LABEL') {
        parentElement.style.width = '100%';
      }
    }
  }

  handleChange = this.props.onChange

  handleRef = el => this.ref = el; // eslint-disable-line no-return-assign

  render() {
    const { label, expression } = this.props;

    return (
      <div ref={this.handleRef}>
        <span>{label}</span>
        <span style={{ float: 'right' }}>
          <a
            style={{ marginLeft: '3px', cursor: 'pointer' }}
            onClick={this.handleChange}
          >
            {
              expression ?
                `Switch to regular value` :
                `Choose property`
            }
          </a>
        </span>
      </div>
    )
  }
}
