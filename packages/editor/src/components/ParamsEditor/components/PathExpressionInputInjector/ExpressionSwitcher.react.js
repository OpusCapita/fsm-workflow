import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ExpressionSwitcher extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    expression: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  }

  static contextTypes = {
    objectConfiguration: PropTypes.object.isRequired
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

  handleChange = this.props.onClick

  handleRef = el => this.ref = el; // eslint-disable-line no-return-assign

  render() {
    const { objectConfiguration: { alias = 'object' } } = this.context;
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
                `Switch to regular input` :
                `Select property of ${alias}`
            }
          </a>
        </span>
      </div>
    )
  }
}
