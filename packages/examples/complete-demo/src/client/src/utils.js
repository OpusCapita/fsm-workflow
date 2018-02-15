export const mapFuncsToParamsSchema = funcsObj => Object.keys(funcsObj).reduce((res, name) => ({
  ...res,
  [name]: {
    paramsSchema: funcsObj[name].paramsSchema
  }
}), {});
