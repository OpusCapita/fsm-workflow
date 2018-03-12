import React from 'react';
import PropTypes from 'prop-types';
import padStart from 'lodash/padStart';
import { DateInput as OCDateInput } from '@opuscapita/react-dates';
import { isDef } from '../../utils';
import './DateInput.less';

export default function DateInput({ value, onChange, ...props }, { i18n }) {
  return (
    <OCDateInput
      {...props}
      locale={i18n.locale}
      value={isDef(value) ? new Date(value) : null}
      onChange={date => {
        if (date instanceof Date) {
          const year = date.getFullYear();
          const month = padStart(`${date.getMonth() + 1}`, 2, '0');
          const day = padStart(`${date.getDate()}`, 2, '0');
          const str = `${year}-${month}-${day}`;
          onChange(str)
        }
      }}
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
