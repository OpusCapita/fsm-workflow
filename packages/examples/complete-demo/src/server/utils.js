import pick from 'lodash/pick';
import jsfaker from 'json-schema-faker';
import currentSchema from './schema';
import { objectIdProp } from '../common';

export const generateObjects = ({ schema, quantity = 10 }) => {
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

// take sequelize query output and return clean object
export const extractObject = sequelizeOutput => {
  const { dataValues } = sequelizeOutput;
  const schema = currentSchema.getSchema();
  const objectProps = Object.keys(schema.objectConfiguration.schema.properties);
  return pick(dataValues, objectProps);
}
