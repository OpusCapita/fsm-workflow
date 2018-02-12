'use strict';

const Sequelize = require('sequelize');
const { assert } = require('chai');

const modelDefinition = require('../definitions/workflowTransitionHistory');
const modelInterface = require('./workflowTransitionHistory');

// The function returns boolean whether input date has divergence from now with less than a second.
const minorDivergence = date => Math.abs(Date.now() - date.getTime()) < 1000;

describe('history', () => {
  let add, search;

  before(async () => {
    const sequelize = new Sequelize('sqlite:/:memory:');
    const model = await modelDefinition(sequelize, Sequelize.DataTypes).sync({ force: true });
    ({ add, search } = modelInterface(model));
  });

  describe('.add()', () => {
    it('should add history record with description', async () => {
      const { finishedOn, ...record } = (await add({
        from: 'from-point',
        to: 'to-point',
        event: 'test-event',
        businessObjType: 'invoice',
        businessObjId: '428-wb71',
        user: 'Andy Smith',
        description: 'Some description of from-to transition',
        workflowName: 'test workflow'
      })).get();

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

      assert.isTrue(minorDivergence(finishedOn));
    });

    it('should add history record without description', async () => {
      const { finishedOn, ...record } = (await add({
        from: 'from-2-point',
        to: 'to-2-point',
        event: 'test-2-event',
        businessObjType: 'invoice',
        businessObjId: '428-wb71',
        user: 'Andy Smith',
        workflowName: 'test workflow'
      })).get();

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

      assert.isTrue(minorDivergence(finishedOn));
    });

    it('should search for all history records', async () => {
      const records = (await search()).map(raw => {
        const record = raw.get();
        delete record.finishedOn;
        return record;
      });

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

    it('should search for some history records', async () => {
      const records = (await search({
        searchParameters: {
          object: {
            businessObjType: 'invoice',
            businessObjId: '428-wb71'
          },
          user: 'Andy Smith',
          finishedOn: {
            gt: new Date('2018-01-02T12:04:05.000Z')
          }
        },
        paging: {
          max: 4,
          offset: 1
        },
        sorting: {
          by: 'businessObjType',
          order: 'asc'
        }
      })).map(raw => {
        const record = raw.get();
        delete record.finishedOn;
        return record;
      });

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
  });
});
