import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ExpressionSwitcher from './ExpressionSwitcher.react';
import ExpressionInput from './ExpressionInput.react';
import ExpressionEditor from './ExpressionEditor.react';

export default WrappedComponent => class WithPathExpressionInput extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired
  }

  state = {
    expression: false,
    showDialog: false
  }

  handleChange = _ => this.setState(prevState => ({
    expression: !prevState.expression,
    ...(!prevState.expression && { showDialog: true })
  }))

  handleEdit = _ => this.setState({ showDialog: true })

  handleClose = _ => this.setState({ showDialog: false })

  render() {
    const { label, ...props } = this.props;
    const { expression, showDialog } = this.state;

    const newProps = {
      label: _ => (
        <ExpressionSwitcher
          label={label}
          expression={expression}
          onChange={this.handleChange}
        />
      )
    }

    if (expression) {
      newProps.component = _ => (
        <ExpressionInput
          value={props.value}
          onClick={this.handleEdit}
        />
      )
    }

    return (
      <div>
        <WrappedComponent {...props} {...newProps}/>
        {
          showDialog && (
            <ExpressionEditor
              onClose={this.handleClose}
            />
          )
        }
      </div>
    )
  }
}
