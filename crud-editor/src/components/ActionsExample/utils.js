import get from 'lodash/get';
import find from 'lodash/find';

const evaluateArgs = (actionArgs, commonArgs) => ({
  ...commonArgs,
  ...actionArgs.reduce((customArgsObject, { name, type, value }) => ({
    ...customArgsObject,
    [name]: type === 'pathExpression' ?
      get(commonArgs[value.variable], value.path) :
      value
  }), {})
})

export const invokeAction = (actions, name, actionCalls, commonArgs) => {
  const actionArgs = find(actionCalls, ({ name: actionName }) => actionName === name).arguments;

  const evaluatedArgs = evaluateArgs(actionArgs, commonArgs);

  // manually spread arguments object to enable direct access to named parameters
  const spreadArgs = [
    'object',
    'from',
    'to',
    ...actionArgs.map(({ name }) => name)
  ].
    map(key => `var ${key} = args['${key}'];`).
    join('\n');

  const func = `(
    function(args) {
      ${spreadArgs}
      ${actions[name].body}
    }
  )`

  console.log(func)

  return eval(func)(evaluatedArgs) // eslint-disable-line no-eval
}
