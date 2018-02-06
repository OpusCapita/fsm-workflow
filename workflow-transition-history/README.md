# Workflow Transition History

![badge-npm-version](https://img.shields.io/npm/v/@opuscapita/fsm-workflow-transition-history.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@opuscapita/fsm-workflow-transition-history.svg)

Workflow Transition History is an extension to FSM Core.  It provies server-side API for storing and extracting Business Object lifecycle history.

## Installation

Install package

```
npm install @opuscapita/fsm-workflow-transition-history
```

## Basic Usage

```javascript
// Run migrations and initiate an instance of FSM Workflow History.
const { history } = await require('@opuscapita/fsm-workflow-history')(sequelize);

// machine creation (per tenant/customer) could be own instalce(s) created.
const machine = new Machine({ machineDefinition, history });

// Application has to pass history info/data into `sendEvent` via named parameter 'historyInfo'.
machine.sendEvent({
  object,
  event,
  request,
  historyInfo: { description, user, businessObjId, businessObjType }
});
```

**history** is JavaScript object with the followign structure/interface:

```javascript
{
  add({
    from: 'from-state',
    to: 'to-state',
    event: 'transition-event',
    businessObjType: 'invoice',
    businessObjId: 'ew153-7210',
    user: 'user-id-46270e',
    description: 'Optional business object transition description text'
  }) {
    ...
	return <promise of Transition Object>;
  },

  search({

    // Optional. Its format is the same as "where" in sequelize.model().findAll
    where: {
      from: 'from-state',
      to: 'to-state'
    },

    // Optional. Its format is the same as "order" in sequelize.model().findAll
    order: [["createdOn","ASC"]]
  }) {
    ...
	return <promise of Transition Object>;
  }
}
```

**Transition Object** is JavaScript object with values from DB:

```javascript
{
  id: <string, Transition Object ID>,
  from: <string>,
  to: <string>,
  event: <string>,
  businessObjType: <string>,
  businessObjId: <string>,
  user: <string, user ID>,
  description: <string or null>,
  createdOn: <date>
}
```

See [Express Server Demo](demo/server.js) for an example of using Workflow Transition History.
