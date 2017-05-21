import assert from 'assert';

export default class Machine {
  constructor({machineDefinition, promise = Machine.defaultPromise(), context = {}}) {
    assert(machineDefinition, 'machineDefinition is undefined');
    assert(promise, 'promise is undefined');
    assert(context, 'context is undefined');
    this.machineDefinition = machineDefinition;
    this.promise = promise;
    this.context = context
  }

  static defaultPromise() {
    // if machine works in Node, the Promise is available out of the box
    // e.g. global.Promise
    if (global && global.Promise) {
      return global.Promise
    }
    // otherwise using bluebird implementation
    return require('bluebird').Promise
  }

  // sets object initial state
  start({object, context}) {
    const {objectStateFieldName, initialState} = this.machineDefinition.schema
    object[objectStateFieldName] = initialState;
    return this.promise.resolve({object})
  }

  // returns current object state
  currentState({object}) {
    const {objectStateFieldName} = this.machineDefinition.schema;
    return object[objectStateFieldName];
  }

  // send event
  // object - stateful object
  // event - name of the event to be send
  // data - event data that is passed from outside in addition to event provided by user/app that could be used in actions
  // context - gives an access to available services that could be usd in guard(s) and action(s)
  sendEvent({object, event, data}) {
    // to be done
  }

  // returns a  lits of events (names) that are available at current object state
  availableTransitions({object}) {
    const from = this.currentState({object});
    // we can cut each transition to 'event' and 'auto', but not now (may be later)
    return this.machineDefinition.findAvailableTransitions({
      from,
      object,
      context
    });
  }

}
