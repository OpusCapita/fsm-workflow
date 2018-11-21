import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ExpressionSwitcher from './ExpressionSwitcher.react';
import ExpressionInput from './ExpressionInput.react';
import ExpressionEditor from './ExpressionEditor.react';

// TODO warn about mismatch in object/param schemas

export default WrappedComponent => WrappedComponent &&
  class WithPathExpressionInput extends PureComponent {
    static propTypes = {
      label: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      param: PropTypes.shape({
        value: PropTypes.any,
        expression: PropTypes.string
      })
    }

    state = {
      expression: !!this.props.param.expression,
      showDialog: false,
      isSwitching: false
    }

    // waiting for null value to come back from outside after switching back from expression to regular value
    componentWillReceiveProps({ param: { value } }) {
      const { expression, isSwitching } = this.state;
      if (!expression && isSwitching) {
        this.setState({ isSwitching: false })
      }
    }

    handleChange = value => this.props.onChange({
      value,
      ...(this.state.expression && { expression: 'path' })
    })

    handleSelectProp = path => {
      this.handleChange(path)
      this.handleClose({ selected: true })
    }

    handleToggleMode = _ => this.setState(prevState => ({
      expression: !prevState.expression,
      ...(prevState.expression ? { isSwitching: true } : { showDialog: true })
    }), _ => !this.state.expression && this.handleChange(null))

    handleEdit = _ => this.setState({ showDialog: true })

    handleClose = ({ selected } = {}) => this.setState(prevState => ({
      showDialog: false,
      ...(!selected && !this.props.param.value && { expression: false })
    }))

    render() {
      const { label, param, ...props } = this.props;
      const { expression, showDialog, isSwitching } = this.state;

      const newProps = {
        ...props,
        value: param.value,
        label: _ => (
          <ExpressionSwitcher
            label={label}
            expression={expression}
            onClick={this.handleToggleMode}
          />
        ),
        onChange: this.handleChange
      }

      if (expression || isSwitching) {
        newProps.component = _ => (
          <ExpressionInput
            value={param.value}
            onClick={this.handleEdit}
          />
        )
      }

      return (
        <div>
          <WrappedComponent {...newProps}/>
          {
            showDialog && (
              <ExpressionEditor
                onClose={this.handleClose}
                onSelect={this.handleSelectProp}
                {...(param.expression && { currentPath: param.value })}
              />
            )
          }
        </div>
      )
    }
  }
