import jsfaker from 'json-schema-faker';

export const generateObjects = ({ schema, quantity = 10, objectIdProp = 'id' }) => {
  const businessObjects = [];
  for (let i = 0; i < quantity; i++) {
    const object = jsfaker(schema.objectConfiguration.schema);
    object[objectIdProp] = `${schema.objectConfiguration.alias || 'object'}-${i}`;
    businessObjects.push(object);
  }
  return businessObjects
}

export const mapFuncsToParamsSchema = funcsObj => Object.keys(funcsObj).reduce((res, name) => ({
  ...res,
  [name]: {
    paramsSchema: funcsObj[name].paramsSchema
  }
}), {});
