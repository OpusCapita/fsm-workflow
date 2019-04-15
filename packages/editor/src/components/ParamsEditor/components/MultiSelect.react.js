import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import { formatArg } from '../../utils';
import withExpressionInput from './PathExpressionInputInjector';
import Select from '../../Select';

const value2rs = ({ i18n, schema, value }) => ({
  label: formatArg({ i18n, schema, value }),
  value
})

const rs2value = ({ value }) => value;

@withExpressionInput
export default class MultiSelect extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ]),
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    schema: PropTypes.shape({
      items: PropTypes.shape({
        enum: PropTypes.array.isRequired
      })
    }).isRequired,
    component: PropTypes.func
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  value2rs = value => value2rs({
    i18n: this.context.i18n,
    schema: this.props.schema.items,
    value
  })

  handleChange = value => this.props.onChange(value.map(rs2value))

  render() {
    const { id, label, value, schema, component: Component } = this.props;
    const rs2value = (Array.isArray(value) ? value : []).map(this.value2rs);
    const options = schema.items.enum.map(this.value2rs);

    let renderLabel = label;

    if (typeof label === 'function') {
      const Label = label;
      renderLabel = (<Label/>)
    }

    return (
      <FormGroup controlId={id}>
        <ControlLabel>{renderLabel}</ControlLabel>
        {
          Component ?
            (
              <Component value={value} onChange={this.props.onChange}/>
            ) :
            (
              <Select
                multi={true}
                removeSelected={true}
                value={rs2value}
                options={options}
                onChange={this.handleChange}
                placeholder=''
              />
            )
        }
      </FormGroup>
    )
  }
}
