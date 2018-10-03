import React from 'react';
import PropTypes from 'prop-types';
import padStart from 'lodash/padStart';
import { DateInput as OCDateInput } from '@opuscapita/react-dates';
import { isDef } from '../../utils';
import './DateInput.less';

/**
 * onChange: return string in `full-date` (YYYY-MM-DD) format (https://tools.ietf.org/html/rfc3339#section-5.6) or null
 */
export default function DateInput({ value, onChange, ...props }, { i18n }) {
  return (
    <OCDateInput
      {...props}
      locale={i18n.locale}
      value={isDef(value) ? new Date(value) : null}
      onChange={date => {
        if (!date) {
          return onChange(null)
        }
        const year = date.getFullYear();
        const month = padStart(`${date.getMonth() + 1}`, 2, '0');
        const day = padStart(`${date.getDate()}`, 2, '0');
        const str = `${year}-${month}-${day}`;
        return onChange(str)
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
