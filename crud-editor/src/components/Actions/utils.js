import get from 'lodash/get';

const evaluateArgs = (actionArgs, commonArgs) => ({
  ...commonArgs,
  ...actionArgs.reduce((customArgsObject, { name, type, value }) => ({
    ...customArgsObject,
    [name]: type === 'pathExpression' ?
      get(commonArgs[value.variable], value.path) :
      value
  }), {})
})

export const invokeAction = (name, actionArgs, commonArgs) => `Action "${name}" called with params:\n` +
  JSON.stringify(evaluateArgs(actionArgs, commonArgs), null, 2)

export const getActionArgType = ({ actions, action, param }) => ((
  (actions[action].paramsSchema || {}).properties || {})[param] || {}).
  type || 'string';
