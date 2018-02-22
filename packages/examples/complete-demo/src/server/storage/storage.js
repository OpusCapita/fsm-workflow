import { resolve } from 'path';
import Sequelize from 'sequelize';
import Sequelizer from 'sequelizer';
import pick from 'lodash/pick';
import { objectIdProp } from '../../common';
import { generateObjects } from '../utils';

const sqlitePath = resolve(__dirname, './demo.sqlite');

class Storage {
  sequelize = null;
  invoiceModel = null;

  init = async function(fsm) {
    // save reference for future usage
    this._getSchema = fsm.getSchema;

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

    // create Invoice model from JSON schema
    const schema = await this._getSchema()
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
      fsm.machine.start({ object: invoice })
      return this.invoiceModel.create(invoice) // insert into database
    }))
  }

  getAllObjects = async function() {
    const data = await this.invoiceModel.findAll();
    const schema = await this._getSchema();
    const objects = data.map(object => this.extractObject(object, schema));
    return objects
  }

  getObjectById = async function(id) {
    const data = await this.invoiceModel.findOne({ where: { [objectIdProp]: id } });
    const schema = await this._getSchema();
    return this.extractObject(data, schema)
  }

  updateObject = async function(object) {
    const dbObject = await this.invoiceModel.findOne({ where: { [objectIdProp]: object[objectIdProp] } });
    if (!dbObject) {
      throw new Error('updateObject have not found a host object!')
    }
    return dbObject.update(object)
  }

  // take sequelize query output and return clean object
  extractObject = (sequelizeOutput, schema) => {
    const { dataValues } = sequelizeOutput;
    const objectProps = Object.keys(schema.objectConfiguration.schema.properties);
    return pick(dataValues, objectProps);
  }
}

export default new Storage();
