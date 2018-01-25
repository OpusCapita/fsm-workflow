# Business Object History

![badge-npm-version](https://img.shields.io/npm/v/@opuscapita/fsm-workflow-transition-history.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@opuscapita/fsm-workflow-transition-history.svg)

Business Object History is an extension to FSM Core.  It provies server-side API for storing and extracting Business Object lifecycle history.

## Installation

Install package

```
npm install --save @opuscapita/fsm-workflow-transition-history
```

## Basic Usage

```javascript
const Sequelize = require('sequelize');
const workflowTransitionHistory = require('@opuscapita/fsm-workflow-transition-history');
const dbConfig = require('./config/db.js');

const sequelize = new Sequelize(dbConfig);

workflowTransitionHistory(sequelize).then(handlers => {
  const { add, search } = handlers;

  add({
    from: 'from-state',
    to: 'to-state',
    event: 'transition-event',
    businessObjType: 'invoice',
    businessObjId: 'ew153-7210',
    user: 'user-id-46270e',
    description: 'Optional business object transition description text'
  }).
    then(obj => console.log('The following obj has been added to history:', obj)).
    catch(err => console.log('Error adding obj to histofy:', err));

  search({

    // Optional.
    // Its format is the same as "where" in sequelize.model().findAll
    where: {
      from: 'from-state',
      to: 'to-state'
    },

    // Optional.
    // Its format is the same as "order" in sequelize.model().findAll
    order: ['createdOn', 'DESC']

  }).
    then(objList => console.log(objList.map(obj => JSON.stringify({
      id: obj.id,
      from: obj.from,
      to: obj.to,
      event: obj.event,
      businessObjType: obj.businessObjType,
      businessObjId: obj.businessObjId,
      user: obj.user,
      description: obj.description,
      createdOn: obj.createdOn
    })))).
    catch(err => console.log('Error extracting objects from history:', err));
})
```

