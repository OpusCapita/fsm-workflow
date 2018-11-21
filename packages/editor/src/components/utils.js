import React from 'react';
import PropTypes from 'prop-types';

export const isDef = v => v !== undefined && v !== null;

export const valueOrNull = value => isDef(value) ? value : null;

export const omitIfEmpty = propName => obj => Object.keys(obj).reduce((acc, key) => ({
  ...acc,
  ...((key !== propName || isDef(obj[propName])) && { [key]: obj[key] })
}), {})

/**
 * Return i18n message for id or id itself in case if message is not present in i18n
 * @param {string} field - any of 'actions', 'conditions', 'states'
 */
export const getLabel = i18n => field => value => {
  const key = `fsmWorkflowEditor.${field}.${value}.label`;
  const message = i18n.getMessage(key);
  return message === key ? value : message;
}

export const unifyPath = path => path.split('.').slice(1).map(s => `[${JSON.stringify(s)}]`).join('');

export const formatArg = ({ i18n, schema = {}, value, expression }) => {
  if (expression) {
    return (
      <span>
        <span className="badge badge-secondary">
          {i18n.getMessage('fsmWorkflowEditor.ui.paramsEditor.expression')}
        </span>
        {`\u2000${value}`}
      </span>
    )
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
      return isDef(value) ? i18n.formatDate(new Date(value)) : value;
    case 'array':
      return (
        <ol style={{ paddingLeft: '20px' }}>
          {
            (value || []).map((v, i) => (
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
