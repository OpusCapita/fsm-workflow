import get from 'lodash/get';
import find from 'lodash/find';

const evaluateArgs = (actionArgs, commonArgs) => ({
  ...commonArgs,
  ...actionArgs.reduce((customArgsObject, { name, type, value }) => ({
    ...customArgsObject,
    [name]: type === 'pathExpression' ?
      get(commonArgs[value.varName], value.path) :
      value
  }), {})
})

export const invokeAction = (actions, name, actionCalls, commonArgs) => (
  eval(`args => {${actions[name].body}}`) // eslint-disable-line no-eval
)(evaluateArgs(find(actionCalls, ({ name: actionName }) => actionName === name).arguments, commonArgs))
