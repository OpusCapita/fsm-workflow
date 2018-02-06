# Workflow Transition History

![badge-npm-version](https://img.shields.io/npm/v/@opuscapita/fsm-workflow-transition-history.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@opuscapita/fsm-workflow-transition-history.svg)

Workflow Transition History is an extension to FSM Core.  It provies server-side API for storing and extracting Business Object lifecycle history.

## Installation

Install package

```
npm install --save @opuscapita/fsm-workflow-transition-history
```

## Basic Usage

```javascript
// By end app:

const workflowTransitionHistory = require('@opuscapita/fsm-workflow-transition-history');

const Sequelize = require('sequelize');
const dbConfig = require('./config/db.js');
const sequelize = new Sequelize(dbConfig);

const machineDefinition = new MachineDefinition({
  schema: schema,
  conditions: require('../conditions/index'),
  actions: require('../actions/index')
});

let searchHistory, request, machine;

const historyManager = workflowTransitionHistory.runMigrations(sequelize).
  then(_ => workflowTransitionHistory.createModel(sequelize)).
  then(({ add: addHistory, search }) => {
    searchHistory = search;

    machine = new Machine({
      get addHistory() {
          return addHistory({ user: request.user });
      },
      machineDefinition,
      context: { db: { models: { BusinessObjectFlowAssignee: { update: function() {} } } } }
    });
  });

app.get('/eventURL', (req, res) => {
  request = req;

  machine.sendEvent({
    event: req.params.event,
    object,
    // ??? ALTERNATIVE APPROACH ??? request: {user: req.user},
    context: {sequelize},
    description: req.description // optional transition desciption.
    })
});

app.get('/searchURL', (req, res) => {
  search({

    // Optional.
    // Its format is the same as "where" in sequelize.model().findAll
    where: {
      from: req.from, // from-state
      to: req.to // to-state
    },

    // Optional.
    // Its format is the same as "order" in sequelize.model().findAll
    // default is ['createdOn','ASC']
    order: [[req.field, req.direction]]

  }).
    then(objList => res.json({
      id: obj.id,
      from: obj.from,
      to: obj.to,
      event: obj.event,
      businessObjType: obj.businessObjType,
      businessObjId: obj.businessObjId,
      user: obj.user,
      description: obj.description,
      createdOn: obj.createdOn
    })).
      catch(err => console.error('Error extracting objects from history:', err));
})
```

```javascript
// By fsm-workflow core:

function sendEvent({ object, event, request, description }) {
  machineDefinition.addHistory({
    from: 'from-state',
    to: 'to-state',
    event,
    businessObjType: machineDefinition.schema.businessObjType,
    businessObjId: object[machineDefinition.schema.businessObjectIdField],
    description
  }).
    then(obj => console.log('The following obj has been added to history:', obj)).
    catch(err => console.error('Error adding obj to histofy:', err));
}
```

See [Express Server Demo](demo/server.js) for an example of using Workflow Transition History.
