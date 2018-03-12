import fs from 'fs';
import { promisify } from 'util';
import pick from 'lodash/pick';
import jsfaker from 'json-schema-faker';
import objectConfig from './objectConfig';
import { objectIdProp } from '../common';

export const generateObjects = ({ objectConfiguration, quantity = 10 }) => {
  const businessObjects = [];
  for (let i = 0; i < quantity; i++) {
    const object = jsfaker(objectConfiguration.schema);
    object[objectIdProp] = `${objectConfiguration.alias || 'object'}-${i}`;
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
  const objectSchema = objectConfig.getConfig().schema;
  const objectProps = Object.keys(objectSchema.properties);
  return pick(dataValues, objectProps);
}

const readFile = promisify(fs.readFile);

export const readJSONFromFile = async function(filePath) {
  const data = await readFile(filePath, 'utf8');
  let object;
  try {
    object = JSON.parse(data)
  } catch (err) {
    throw err
  }
  return object
}
