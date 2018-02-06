import get from 'lodash/get';
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

export const invokeAction = (name, actionArgs, commonArgs) => `Action "${name}" called with params:\n` +
  JSON.stringify(evaluateArgs(actionArgs, commonArgs), null, 2)

export const getActionArgType = ({ actions, action, param }) => ((
  (actions[action].paramsSchema || {}).properties || {})[param] || {}).
  type || 'string';

export const formatArg = ({ i18n, type, value }) => {
  switch (type) {
    case 'number':
      return i18n.formatDecimalNumber(value);
    case 'integer':
      return i18n.formatNumber(value);
    case 'boolean':
      return isDef(value) ? String(value) : value;
    default:
      return value
  }
}
