import assert from 'assert';

export default class Workflow {
  constructor({workflowDefinitionProvider, name, promise}) {
    assert(workflowDefinitionProvider, 'workflowDefinitionProvider is undefined');
    assert(name, 'workflow name is undefined');

    this.workflowDefinition = workflowDefinitionProvider.definitions[name];
    if (!this.workflowDefinition) {
      throw Error(`Workflow '${name}' is undefined!`);
    }

    this.promise = promise || Workflow.defaultPromise();
  }

  static defaultPromise() {
    // if workflow works in Node, the Promise is available out of the box
    // e.g. global.Promise
    if (global && global.Promise) {
      return global.Promise
    }
    // otherwise using bluebird implementation
    return require('bluebird').Promise
  }

  // sets object initial state
  start({object, context}) {
    const {objectStateFieldName, initialState} = this.workflowDefinition.schema
    object[objectStateFieldName] = initialState;
  }

  // returns current object state within the workflow
  currentState({object}) {
    const {objectStateFieldName} = this.workflowDefinition.schema;
    return object[objectStateFieldName];
  }

  // send event
  // object - stateful object
  // event - name of the event to be send
  // data - event data that is passed from outside in addition to event provided by user/app that could be used in actions
  // context - gives an access to available services that could be usd in guard(s) and action(s)
  sendEvent({object, event, data, context}) {
    // to be done
  }

  // returns a  lits of events (names) that are available at current object state
  availableEvents({object, context}) {
  }

}
