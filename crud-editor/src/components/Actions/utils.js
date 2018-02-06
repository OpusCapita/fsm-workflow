import get from 'lodash/get';
import startCase from 'lodash/startCase';
import { isDef } from '../utils';

const evaluateArgs = (actionArgs, commonArgs) => ({
  ...actionArgs.reduce((customArgsObject, { name, type, value }) => ({
    ...customArgsObject,
    [name]: type === 'pathExpression' ?
      get(commonArgs[value.variable], value.path) :
      value
  }), {}),
  ...commonArgs
})

export const invokeAction = (name, actionArgs, commonArgs) => `Action "${name}" called with parameters:\n` +
  JSON.stringify(evaluateArgs(actionArgs, commonArgs), null, 2)

export const getParamSchema = ({ actions, action, param }) => (
  (actions[action].paramsSchema || {}).properties || {}
)[param];

export const getArgType = ({ actions, action, param }) => {
  const schema = getParamSchema({ actions, action, param }) || {};
  const { type, format } = schema;
  return type === 'string' && format === 'date-time' ? 'date' : type;
}

export const formatArg = ({ i18n, type, value }) => {
  switch (type) {
    case 'number':
      return i18n.formatDecimalNumber(value);
    case 'integer':
      return i18n.formatNumber(value);
    case 'boolean':
      return isDef(value) ? String(value) : value;
    case 'date':
      return isDef(value) ? i18n.formatDate(value) : value;
    default:
      return value
  }
}

export const formatLabel = str => startCase(str);
