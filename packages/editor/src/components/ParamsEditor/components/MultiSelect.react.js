import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Select from '@opuscapita/react-select';
import { formatArg } from '../../utils';

const value2rs = ({ i18n, schema, value }) => ({
  label: formatArg({ i18n, schema, value }),
  value
})

const rs2value = ({ value }) => value

export default class MultiSelect extends PureComponent {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    schema: PropTypes.object
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  value2rs = value => value2rs({
    i18n: this.context.i18n,
    schema: (this.props.schema || {}).items,
    value
  })

  handleChange = value => this.props.onChange(value.map(rs2value))

  render() {
    const { id, label, value, schema } = this.props;
    const rs2value = (value || []).map(this.value2rs);
    const options = (((schema || {}).items || {}).enum || []).map(this.value2rs);

    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <Select
          multi={true}
          removeSelected={true}
          value={rs2value}
          options={options}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
  }
}
