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
    assert(res.some(index => index.fields.length === 1 && index.fields[0].attribute === 'businessObjId'));
  });
});
