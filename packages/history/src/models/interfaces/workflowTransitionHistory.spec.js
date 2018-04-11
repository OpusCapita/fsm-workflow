'use strict';

const Sequelize = require('sequelize');
const assert = require('assert');

const modelDefinition = require('../definitions/workflowTransitionHistory');
const modelInterface = require('./workflowTransitionHistory');

describe('history', () => {
  let history;

  before(async() => {
    const sequelize = new Sequelize('sqlite:/:memory:');
    const model = await modelDefinition(sequelize, Sequelize.DataTypes).sync({ force: true });
    history = modelInterface(model);
  });

  describe('add() & search() & delete()', () => {
    it('should add history record with description', async() => {
      const { finishedOn, ...record } = (await history.add({
        from: 'from-point',
        to: 'to-point',
        event: 'test-event',
        businessObjType: 'invoice',
        businessObjId: '428-wb71',
        user: 'Andy Smith',
        description: 'Some description of from-to transition',
        workflowName: 'test workflow'
      })).get();

      assert(finishedOn);
      assert.deepEqual(record, {
        id: 1,
        from: 'from-point',
        to: 'to-point',
        event: 'test-event',
        businessObjType: 'invoice',
        businessObjId: '428-wb71',
        user: 'Andy Smith',
        description: 'Some description of from-to transition',
        workflowName: 'test workflow'
      });
    });

    it('should add history record without description', async() => {
      const { finishedOn, ...record } = (await history.add({
        from: 'from-2-point',
        to: 'to-2-point',
        event: 'test-2-event',
        businessObjType: 'invoice',
        businessObjId: '428-wb71',
        user: 'Andy Smith',
        workflowName: 'test workflow'
      })).get();

      assert(finishedOn);
      assert.deepEqual(record, {
        id: 2,
        from: 'from-2-point',
        to: 'to-2-point',
        event: 'test-2-event',
        businessObjType: 'invoice',
        businessObjId: '428-wb71',
        user: 'Andy Smith',
        workflowName: 'test workflow'
      });
    });

    it('should search for all history records', async() => {
      const records = (await history.search()).map(({ finishedOn, ...record }) => record);

      assert.deepEqual(records, [{
        id: 2,
        from: 'from-2-point',
        to: 'to-2-point',
        event: 'test-2-event',
        businessObjType: 'invoice',
        businessObjId: '428-wb71',
        user: 'Andy Smith',
        workflowName: 'test workflow',
        description: null
      }, {
        id: 1,
        from: 'from-point',
        to: 'to-point',
        event: 'test-event',
        businessObjType: 'invoice',
        businessObjId: '428-wb71',
        user: 'Andy Smith',
        workflowName: 'test workflow',
        description: 'Some description of from-to transition'
      }]);
    });

    it('should search for some history records', async() => {
      const records = (await history.search({
        object: {
          businessObjType: 'invoice',
          businessObjId: '428-wb71'
        },
        user: 'Andy Smith',
        workflowName: 'test workflow',
        finishedOn: {
          gt: new Date('2018-01-02T12:04:05.000Z')
        }
      }, {
        max: 4,
        offset: 1
      }, {
        by: 'businessObjType',
        order: 'asc'
      })).map(({ finishedOn, ...record }) => record);

      assert.deepEqual(records, [{
        id: 2,
        from: 'from-2-point',
        to: 'to-2-point',
        event: 'test-2-event',
        businessObjType: 'invoice',
        businessObjId: '428-wb71',
        user: 'Andy Smith',
        workflowName: 'test workflow',
        description: null
      }]);
    });

    it('should delete history records', async() => {
      assert.equal(
        await history.delete({
          businessObjType: 'no existing type'
        }), 0, "it is expected that 0 records are removed"
      );
      assert.equal(
        await history.delete({
          businessObjId: 'no existing type'
        }), 0, "it is expected that 0 records are removed"
      );
      assert.equal(
        await history.delete({
          businessObjType: 'invoice', businessObjId: '428-wb71'
        }), 2, "it is expected that 2 records are removed"
      );
    });
  });
});
