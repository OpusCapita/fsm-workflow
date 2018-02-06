import React from 'react';
import PropTypes from 'prop-types';
import { DateInput as OCDateInput } from '@opuscapita/react-dates';
import { isDef } from '../../utils';
import './DateInput.less';

export default function DateInput({ value, onChange, ...props }, { i18n }) {
  return (
    <OCDateInput
      {...props}
      locale={i18n.locale}
      value={isDef(value) ? new Date(value) : null}
      onChange={date => onChange(date instanceof Date ? date.toJSON() : null)}
    />
  )
}

DateInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

DateInput.contextTypes = {
  i18n: PropTypes.object.isRequired
}
