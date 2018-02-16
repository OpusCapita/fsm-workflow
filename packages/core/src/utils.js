export const flattenParams = (params = []) => {
  return params.reduce((params, { name, value }) => ({ ...params, [name]: value }), {})
}

export const evaluateGuard = ({ guard, params }) => {
  try {
    return !!eval( // eslint-disable-line no-eval
      `
        (function(arg) {
          ${Object.keys(params).map(key => `var ${key} = arg[${JSON.stringify(key)}];`).join('\n')}
          return (${guard})
        })
      `
    )(params)
  } catch (err) {
    return false // TBD throw or return false?
  }
}
