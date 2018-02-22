import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import { Machine, MachineDefinition } from '@opuscapita/fsm-workflow-core';
import actions from '../data/actions';
import conditions from '../data/conditions';
import { objectIdProp } from '../../common';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const schemaFilePath = resolve(__dirname, './workflow-schema.json');
const defaultSchemaFilePath = resolve(__dirname, '../data/workflow-schema.json');

class FSM {
  init = async function() {
    const schema = await this.getSchema();
    this.createMachine({ schema })
  }

  get machine() {
    return this._machine
  }

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

  getSchema = async function() {
    if (this.machine) {
      return this.machine.machineDefinition.schema
    }
    return FSM.readJSONFromFile(schemaFilePath).
      catch(err => {
        if (err.code === 'ENOENT') {
          // 'schemaFilePath' file does not exist yet -> read default schema
          return FSM.readJSONFromFile(defaultSchemaFilePath)
        }
        throw err
      })
  }

  setSchema = async function(schema) {
    this.createMachine({ schema });
    return writeFile(schemaFilePath, JSON.stringify(schema, null, 2))
  }

  createMachine = ({ schema }) => {
    this._machine = new Machine({
      machineDefinition: new MachineDefinition({
        schema,
        actions,
        conditions
      }),
      convertObjectToReference: object => ({
        businessObjectType: 'invoice',
        businessObjectId: object[objectIdProp]
      })
    })
  }
}

export default new FSM();
