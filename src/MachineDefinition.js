export default class MachineDefinition {
  constructor({schema, guards, actions} = {}) {
    // todo validate input data
    // console.log(`schema '${JSON.stringify(schema)}'`);
    this.schema = {
      objectStateFieldName: MachineDefinition.getDefaultObjectStateFieldName(),
      ...schema
    };
    // guards is an object, where each property is implemented guard name and
    // value is guard(function) itself
    this.guards = guards || {};
    // actions is an object, where each property is implemented action name and
    // value is action(function) itself
    this.actions = actions || {};
    // create hashes (JS object) for fast search with name as a property
    // this._guardsByName = guardsByName(this.guards);
    // this._actionsByName = actionsByName(this.actions);
  }

  findAvailableTransitions({from, event, object, context} = {}) {
    // if from is not specified, then no transition is available
    if (!from) {
      // to do throw proper error
      throw new Error("'from' is not defined`");
    }
    const { transitions } = this.schema;
    // if not transitions, the return empty list
    if (!transitions) {
      return [];
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
    console.log(`transitions '${JSON.stringify(transitions)}'`);
    return transitions.filter(
      (transition) => {
        return checkFrom(transition) &&
          checkEvent(transition) &&
          checkGuards(transition);
      }
    );
  }

  static getDefaultObjectStateFieldName() { return 'status' };
}
