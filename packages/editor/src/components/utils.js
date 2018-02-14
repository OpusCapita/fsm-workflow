import React from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';

export const isDef = v => v !== undefined && v !== null;

export const formatLabel = str => startCase(str);

export const formatArg = ({ i18n, schema = {}, value }) => {
  const { type, format } = schema;
  const componentType = type === 'string' && format === 'date' ? 'date' : type;

  switch (componentType) {
    case 'number':
      return i18n.formatDecimalNumber(value);
    case 'integer':
      return i18n.formatNumber(value);
    case 'boolean':
      return isDef(value) ? String(value) : value;
    case 'date':
      return isDef(value) ? i18n.formatDate(value) : value;
    case 'array':
      return (
        <ul style={{ paddingLeft: '20px' }}>
          {
            value.map((v, i) => (
              <li key={i}>{formatArg({ i18n, schema: schema.items, value: v })}</li>
            ))
          }
        </ul>
      );
    default:
      return value
  }
}

formatArg.propTypes = {
  i18n: PropTypes.object.isRequired,
  schema: PropTypes.object,
  value: PropTypes.any
}
