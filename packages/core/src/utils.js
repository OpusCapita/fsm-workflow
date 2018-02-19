export const flattenParams = (params = []) => {
  return params.reduce((params, { name, value }) => ({ ...params, [name]: value }), {})
}

