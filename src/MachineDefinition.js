export default class MachineDefinition {
  constructor({schema, guards = {}, actions = {}, promise = MachineDefinition.defaultPromise()} = {}) {
    // todo validate schema
    if (!promise) {
      throw new Error('promise is undefined');
    }
    // console.log(`schema '${JSON.stringify(schema)}'`);
    this.schema = {
      objectStateFieldName: MachineDefinition.getDefaultObjectStateFieldName(),
      ...schema
    };
    // guards is an object, where each property is implemented guard name and
    // value is guard(function) itself
    this.guards = guards;
    // actions is an object, where each property is implemented action name and
    // value is action(function) itself
    this.actions = actions;
    this.promise = promise;
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

  findAvailableTransitions({from, event, object, context} = {}) {
    // if from is not specified, then no transition is available
    if (!from) {
      // to do throw proper error
      return this.promise.reject(new Error("'from' is not defined"));
    }
    const { transitions } = this.schema;
    // if not transitions, the return empty list
    if (!transitions) {
      return this.promise.resolve({transitions: []});
    }
    const checkFrom = (transition) => {
      return transition.from === from;
    }
    const checkEvent = (transition) => {
      // if event is not specified then event does not metter for search
      if (!event) {
        return true;
      }
      return transition.event === event;
    }
    const checkGuards = (transition) => {
      const {guards, from, to, event} = transition;
      // if guards are undefined
      if (!guards) {
        return true;
      }
      // "ask" each guard
      for (let i = 0; i < guards.length; i++) {
        const guard = this.guards[guards[i].name];
        // guard is defined in schema, but is not really defined -> error!!!
        if (!guard) {
          throw new Error(`Guard '${guards[i].name}' is specified in one the transitions but is not found/implemented!`);
        }
        // if guard return false, return false, e.g. transition is not available at the moment
        // pass arguments specified in guard call (part of schema)
        // additionally object and context are also passed
        if (!guard({...guards[i].arguments, from, to, event, object, context})) {
          return false
        }
      }

      return true;
    }
    // console.log(`transitions '${JSON.stringify(transitions)}'`);
    return new Promise((resolve, reject) => {
      try {
        const foundTransitions = transitions.filter(
          (transition) => {
            return checkFrom(transition) &&
              checkEvent(transition) &&
              checkGuards(transition);
          }
        );
        resolve({transitions: foundTransitions});
      } catch(e) {
        reject(e);
      }
    });
  }

  static getDefaultObjectStateFieldName() { return 'status' };
}
