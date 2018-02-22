import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const schemaFilePath = resolve(__dirname, './workflow-schema.json');
const defaultSchemaFilePath = resolve(__dirname, './default-schema.json');

class Schema {
  static readJSONFromFile = async function(filePath) {
    const data = await readFile(filePath, 'utf8');
    let object;
    try {
      object = JSON.parse(data)
    } catch (err) {
      throw err
    }
    return object
  }

  init = async function() {
    this.schema = await Schema.readJSONFromFile(schemaFilePath).
      catch(err => {
        if (err.code === 'ENOENT') {
          // 'schemaFilePath' file does not exist yet -> read default schema
          return Schema.readJSONFromFile(defaultSchemaFilePath)
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
