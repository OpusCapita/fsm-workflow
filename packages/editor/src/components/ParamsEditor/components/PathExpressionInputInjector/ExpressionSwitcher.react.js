import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ExpressionSwitcher extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    expression: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
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

  handleRef = el => (this.ref = el);

  render() {
    const { i18n } = this.context;
    const { label, expression } = this.props;

    return (
      <div ref={this.handleRef}>
        <span>{label}</span>
        <span style={{ margin: '0 6px' }}>
          (<a
            style={{ margin: '0 3px', cursor: 'pointer' }}
            onClick={this.handleChange}
          >
            {
              expression ?
                i18n.getMessage('fsmWorkflowEditor.ui.paramsEditor.enterValue') :
                i18n.getMessage('fsmWorkflowEditor.ui.paramsEditor.defineExpression')
            }
          </a>)
        </span>
      </div>
    )
  }
}
