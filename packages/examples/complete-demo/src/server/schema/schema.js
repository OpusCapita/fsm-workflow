import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import { readJSONFromFile } from '../utils';

const writeFile = promisify(fs.writeFile);
const schemaFilePath = resolve(__dirname, './workflow-schema.json');
const defaultSchemaFilePath = resolve(__dirname, './default-schema.json');

class Schema {
  init = async function() {
    this.schema = await readJSONFromFile(schemaFilePath).
      catch(err => {
        if (err.code === 'ENOENT') {
          // 'schemaFilePath' file does not exist yet -> read default schema
          return readJSONFromFile(defaultSchemaFilePath)
        }
        throw err
      })
  }

  getSchema() {
    return this.schema
  }

  setSchema = async function(schema) {
    this.schema = schema;
    return writeFile(schemaFilePath, JSON.stringify(schema, null, 2))
  }
}

export default new Schema();
