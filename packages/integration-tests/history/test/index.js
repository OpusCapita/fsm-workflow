const { expect } = require('chai');
const { resolve } = require('path');
const Sequelize = require('sequelize');
const Sequelizer = require('sequelizer');
const { Machine, MachineDefinition } = require('@opuscapita/fsm-workflow-core');
const history = require('@opuscapita/fsm-workflow-history');
const schema = require('../data/schema.json');
const objectConfiguration = require('../data/objectConfiguration.json');
const actions = require('../data/actions');
const conditions = require('../data/conditions');

const sqlitePath = resolve(__dirname, '../data/testdb.sqlite');

const objectDefinition = Sequelizer.fromJsonSchema(objectConfiguration.schema, 'testSchema', {
  uniqueFields: ['objectId']
});

const t = {
  sequelize: null,
  history: null,
  model: null,
  get machine() {
    return new Machine({
      machineDefinition: new MachineDefinition({
        schema,
        actions,
        conditions,
        objectConfiguration
      }),
      convertObjectToReference: object => ({
        businessObjType: 'testObject',
        businessObjId: object.objectId
      }),
      history: this.history
    })
  },
  get newObject() {
    return Object.assign({}, objectConfiguration.example)
  },
  renewSequelize: function() {
    this.sequelize = new Sequelize('testdb', null, null, {
      dialect: "sqlite",
      storage: sqlitePath,
      define: {
        charset: 'utf8',
        dialectOptions: {
          collate: 'utf8_general_ci'
        }
      },
      sync: { force: true },
      logging: null // comment this line to show Sequezile logs in console
    })
  }
}

const user = 'Tester';

const getHistory = async({ machine, object }) => machine.getHistory({ object, user });

describe('FSM history integration tests', () => {
  beforeEach(async () => {
    t.renewSequelize();
    t.model = t.sequelize.define('testObject', objectDefinition);
    await t.model.sync(); // create a table
    t.history = await history(t.sequelize);
  });

  afterEach(async () => {
    await t.sequelize.drop();
    await t.sequelize.close();
  });

  it('History is empty initially', async () => {
    const object = t.newObject;
    const machine = t.machine;
    const before = await getHistory({ machine, object });
    expect(before.length).to.equal(0);
  });

  it('History creates an entry after machine.start', async () => {
    const object = t.newObject;
    const machine = t.machine;
    const before = await getHistory({ machine, object });
    expect(before.length).to.equal(0);
    await machine.start({ object, user })
    const after = await getHistory({ machine, object });
    expect(after.length).to.equal(1);
  });

  it('History creates an entry after machine.sendEvent', async () => {
    const object = t.newObject;
    const machine = t.machine;

    const before = await getHistory({ machine, object });
    expect(before.length).to.equal(0);

    await machine.start({ object, user });
    await machine.sendEvent({ object, event: 'a->b', user });

    const after = await getHistory({ machine, object });
    expect(after.length).to.equal(2);
  });

  it('History creates an entry for each machine.sendEvent in a sequence', async () => {
    const object = t.newObject;
    const machine = t.machine;

    const before = await getHistory({ machine, object });
    expect(before.length).to.equal(0);

    await machine.start({ object, user });
    let result = await getHistory({ machine, object });
    expect(result.length).to.equal(1);

    const expected1 = {
      event: '__START__',
      from: 'NULL',
      to: schema.initialState,
      object: {
        businessObjType: 'testObject',
        businessObjId: object.objectId
      },
      user
    };
    expect(
      (({ event, from, to, object, user }) => ({ event, from, to, object, user }))(result[0])
    ).to.deep.equal(expected1);

    const description = 'Some optional description';
    await machine.sendEvent({ object, event: 'a->b', user, description });
    result = await getHistory({ machine, object });
    expect(result.length).to.equal(2);

    const expected2 = {
      event: 'a->b',
      from: 'a',
      to: 'b',
      object: {
        businessObjType: 'testObject',
        businessObjId: object.objectId
      },
      user,
      description
    };
    expect(
      (({ event, from, to, object, user, description }) => ({ event, from, to, object, user, description }))(result[0])
    ).to.deep.equal(expected2);
    expect(
      (({ event, from, to, object, user }) => ({ event, from, to, object, user }))(result[1])
    ).to.deep.equal(expected1);

    await machine.sendEvent({ object, event: 'b->c', user });
    result = await getHistory({ machine, object });
    expect(result.length).to.equal(3);

    const expected3 = {
      event: 'b->c',
      from: 'b',
      to: 'c',
      object: {
        businessObjType: 'testObject',
        businessObjId: object.objectId
      },
      user
    };
    expect(
      (({ event, from, to, object, user }) => ({ event, from, to, object, user }))(result[0])
    ).to.deep.equal(expected3);
    expect(
      (({ event, from, to, object, user, description }) => ({ event, from, to, object, user, description }))(result[1])
    ).to.deep.equal(expected2);
    expect(
      (({ event, from, to, object, user }) => ({ event, from, to, object, user }))(result[2])
    ).to.deep.equal(expected1);

    await machine.sendEvent({ object, event: 'c->d', user });
    result = await getHistory({ machine, object });
    expect(result.length).to.equal(4);

    const expected4 = {
      event: 'c->d',
      from: 'c',
      to: 'd',
      object: {
        businessObjType: 'testObject',
        businessObjId: object.objectId
      },
      user
    };
    expect(
      (({ event, from, to, object, user }) => ({ event, from, to, object, user }))(result[0])
    ).to.deep.equal(expected4);
    expect(
      (({ event, from, to, object, user }) => ({ event, from, to, object, user }))(result[1])
    ).to.deep.equal(expected3);
    expect(
      (({ event, from, to, object, user, description }) => ({ event, from, to, object, user, description }))(result[2])
    ).to.deep.equal(expected2);
    expect(
      (({ event, from, to, object, user }) => ({ event, from, to, object, user }))(result[3])
    ).to.deep.equal(expected1);
  });
})