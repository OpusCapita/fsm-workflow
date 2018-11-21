import { resolve } from 'path';
import Sequelize from 'sequelize';
import Sequelizer from 'sequelizer';
import { objectIdProp } from '../../common';
import objectConfig from '../objectConfig';

const sqlitePath = resolve(__dirname, './demo.sqlite');

class Storage {
  sequelize = null;
  invoiceModel = null;

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
      sync: { force: true },
      logging: null
    });

    // create Invoice model from JSON schema
    const objectSchema = objectConfig.getConfig().schema;
    const definition = Sequelizer.fromJsonSchema(objectSchema, 'InvoiceSchema', {
      uniqueFields: [objectIdProp]
    });

    this.invoiceModel = this.sequelize.define('invoice', definition);
    await this.invoiceModel.drop(); // drop previous table for demo purposes
    return this.invoiceModel.sync(); // create a table
  }

  getAllObjects = async function() {
    return this.invoiceModel.findAll();
  }

  getObjectById = async function(id) {
    return this.invoiceModel.findOne({ where: { [objectIdProp]: id } });
  }

  addObject = async function(object) {
    return this.invoiceModel.create(object)
  }

  updateObject = async function(object) {
    const dbObject = await this.getObjectById(object[objectIdProp]);
    if (!dbObject) {
      throw new Error('updateObject have not found a host object!')
    }
    return dbObject.update(object)
  }
}

export default new Storage();
