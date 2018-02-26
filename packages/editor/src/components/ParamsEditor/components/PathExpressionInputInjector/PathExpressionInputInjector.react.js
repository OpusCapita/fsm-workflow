import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ExpressionSwitcher from './ExpressionSwitcher.react';
import ExpressionInput from './ExpressionInput.react';
import ExpressionEditor from './ExpressionEditor.react';

export default WrappedComponent => class WithPathExpressionInput extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    expression: PropTypes.string
  }

  state = {
    expression: !!this.props.expression,
    showDialog: false
  }

  handleChange = ({ value, ...rest }) => this.props.onChange({
    value,
    ...rest,
    ...(this.state.expression && { expression: 'path' })
  })

  handleSelectProp = path => {
    this.handleChange({ value: path })
    this.handleClose()
  }

  handleToggleMode = _ => this.setState(prevState => ({
    expression: !prevState.expression,
    ...(!prevState.expression && { showDialog: true })
  }), _ => this.handleChange({ value: null }))

  handleEdit = _ => this.setState({ showDialog: true })

  handleClose = _ => this.setState({ showDialog: false })

  render() {
    const { label, ...props } = this.props;
    const { expression, showDialog } = this.state;

    const newProps = {
      ...props,
      label: _ => (
        <ExpressionSwitcher
          label={label}
          expression={expression}
          onClick={this.handleToggleMode}
        />
      ),
      onChange: this.handleChange
    }

    if (expression) {
      newProps.component = _ => (
        <ExpressionInput
          value={props.value}
          onClick={this.handleEdit}
        />
      )
    }

    delete newProps.expression;

    return (
      <div>
        <WrappedComponent {...newProps}/>
        {
          showDialog && (
            <ExpressionEditor
              onClose={this.handleClose}
              onSelect={this.handleSelectProp}
            />
          )
        }
      </div>
    )
  }
}
