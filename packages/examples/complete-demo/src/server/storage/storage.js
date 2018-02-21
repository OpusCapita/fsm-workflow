import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import Sequelize from 'sequelize';
import Sequelizer from 'sequelizer';
import { objectIdProp } from '../../common';
import createMachine from '../createMachine';
import { generateObjects } from '../utils';

/* sequelize sqlite schema
*   Invoice
*   Data
*    WorkflowSchema
*/

const readFile = promisify(fs.readFile);

class Storage {
  sequelize = null;
  machine = null;

  init = async function() {
    this.sequelize = new Sequelize('mainDB', null, null, {
      dialect: "sqlite",
      storage: './demo.sqlite',
      define: {
        charset: 'utf8',
        dialectOptions: {
          collate: 'utf8_general_ci'
        }
      },
      sync: { force: true }
    });

    const data = await readFile(resolve(__dirname, '../data/workflow-schema.json'), 'utf8');
    let schema;
    try {
      schema = JSON.parse(data)
    } catch (err) {
      throw err
    }
    this.createMachine({ schema });

    // create Invoice model from JSON schema
    const definition = Sequelizer.fromJsonSchema(schema.objectConfiguration.schema, 'InvoiceSchema', {
      uniqueFields: [objectIdProp]
    });
    const Invoice = this.sequelize.define('invoice', definition);
    await Invoice.drop(); // drop previous table for demo purposes
    await Invoice.sync(); // create a table

    // generate invoices based on schema
    const invoices = generateObjects({ schema, objectIdProp })
    await Promise.all(invoices.map(invoice => {
      this.machine.start({ object: invoice });
      return Invoice.create(invoice) // insert into database
    }))
  }

  createMachine = schema => {
    this.machine = createMachine({ schema })
  }

  // old stuff

  set(data) {
    Object.keys(data).forEach(key => {
      this[key] = data[key]
    })
  }

  get(key) {
    return this[key]
  }

  getObjectById(id) {
    return this.businessObjects.find(object => object[objectIdProp] === id)
  }

  updateObject(newObject) {
    this.businessObjects = this.businessObjects.map(
      object => object[objectIdProp] === newObject[objectIdProp] ? newObject : object
    )
  }
}

export default new Storage();
