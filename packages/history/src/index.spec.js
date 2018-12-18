'use strict';

const Sequelize = require('sequelize');
const assert = require('assert');

const makeHistory = require('./');

describe('history', () => {
  let sequelize;

  before(async() => {
    sequelize = new Sequelize('sqlite:/:memory:');
    await makeHistory(sequelize);
  });

  it('should create index for table WorkflowTransitionHistory on field businessObjId', async() => {
    const res = await sequelize.getQueryInterface().showIndex('WorkflowTransitionHistory');
    assert(res[0].fields[0].attribute === 'businessObjId');
  });
});
