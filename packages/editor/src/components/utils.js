import React from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';

export const isDef = v => v !== undefined && v !== null;

export const formatLabel = str => startCase(str);

export const formatArg = ({ i18n, schema = {}, value, expression }) => {
  if (expression) {
    return (<span><span className="badge badge-secondary">Expression</span>{`\u2000${value}`}</span>)
  }

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
        <ol style={{ paddingLeft: '20px' }}>
          {
            value.map((v, i) => (
              <li key={i}>{formatArg({ i18n, schema: schema.items, value: v })}</li>
            ))
          }
        </ol>
      );
    default:
      return value
  }
}

formatArg.propTypes = {
  i18n: PropTypes.object.isRequired,
  schema: PropTypes.object,
  value: PropTypes.any,
  expression: PropTypes.string
}
