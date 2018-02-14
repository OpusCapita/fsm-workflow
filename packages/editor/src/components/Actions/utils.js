import get from 'lodash/get';

const evaluateArgs = (actionArgs, commonArgs) => ({
  ...actionArgs.reduce((customArgsObject, { name, type, value }) => ({
    ...customArgsObject,
    [name]: type === 'pathExpression' ? // not implemented in editor yet
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
