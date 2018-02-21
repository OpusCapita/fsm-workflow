import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import Sequelize from 'sequelize';
import Sequelizer from 'sequelizer';
import pick from 'lodash/pick';
import { objectIdProp } from '../../common';
import createMachine from '../createMachine';
import { generateObjects } from '../utils';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const schemaFilePath = resolve(__dirname, './workflow-schema.json');
const defaultSchemaFilePath = resolve(__dirname, '../data/workflow-schema.json');
const sqlitePath = resolve(__dirname, './demo.sqlite');

class Storage {
  sequelize = null;
  machine = null;
  invoiceModel = null;

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
    this.sequelize = new Sequelize('mainDB', null, null, {
      dialect: "sqlite",
      storage: sqlitePath,
      define: {
        charset: 'utf8',
        dialectOptions: {
          collate: 'utf8_general_ci'
        }
      },
      sync: { force: true }
    });

    const schema = await this.getSchema();

    this.createMachine({ schema });

    // create Invoice model from JSON schema
    const definition = Sequelizer.fromJsonSchema(schema.objectConfiguration.schema, 'InvoiceSchema', {
      uniqueFields: [objectIdProp]
    });

    this.invoiceModel = this.sequelize.define('invoice', definition);
    await this.invoiceModel.drop(); // drop previous table for demo purposes
    await this.invoiceModel.sync(); // create a table

    // generate invoices based on schema
    const invoices = generateObjects({ schema, objectIdProp })

    // TODO maybe change to bulkCreate
    return Promise.all(invoices.map(invoice => {
      this.machine.start({ object: invoice })
      return this.invoiceModel.create(invoice) // insert into database
    }))
  }

  createMachine = ({ schema }) => {
    this.machine = createMachine({ schema })
  }

  getSchema = async function() {
    if (this.machine) {
      return this.machine.machineDefinition.schema
    }
    return Storage.readJSONFromFile(schemaFilePath).
      catch(err => {
        if (err.code === 'ENOENT') {
          // 'schemaFilePath' file does not exist yet -> read default schema
          return Storage.readJSONFromFile(defaultSchemaFilePath)
        }
        throw err
      })
  }

  setSchema = async function(schema) {
    this.createMachine({ schema });
    return writeFile(schemaFilePath, JSON.stringify(schema, null, 2))
  }

  getAllObjects = async function() {
    const data = await this.invoiceModel.findAll();
    const objects = data.map(this.extractObject);
    return objects
  }

  getObjectById = async function(id) {
    const data = await this.invoiceModel.findOne({ where: { [objectIdProp]: id } });
    return this.extractObject(data)
  }

  updateObject = async function(object) {
    const dbObject = await this.invoiceModel.findOne({ where: { [objectIdProp]: object[objectIdProp] } });
    if (!dbObject) {
      throw new Error('updateObject have not found a host object!')
    }
    return dbObject.update(object)
  }

  // take sequelize query output and return clean object
  extractObject = sequelizeOutput => {
    const { dataValues } = sequelizeOutput;
    const { schema } = this.machine.machineDefinition;
    const objectProps = Object.keys(schema.objectConfiguration.schema.properties);
    return pick(dataValues, objectProps);
  }
}

export default new Storage();
