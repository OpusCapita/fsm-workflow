export default class MachineDefinition {
  constructor({ schema, guards = {}, actions = {}, promise = MachineDefinition.defaultPromise() } = {}) {
    // todo validate schema
    if (!promise) {
      throw new Error("promise is undefined");
    }
    // console.log(`schema '${JSON.stringify(schema)}'`);
    this.schema = {
      objectStateFieldName: MachineDefinition.getDefaultObjectStateFieldName(),
      finalStates: [],
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
      return global.Promise;
    }
    // otherwise using bluebird implementation
    return require("bluebird").Promise;
  }

  findAvailableTransitions({ from, event, object, context, isAutomatic = false } = {}) {
    // if from is not specified, then no transition is available
    if (from == null || from == undefined) {
      // to do throw proper error
      return this.promise.reject(new Error("'from' is not defined"));
    }
    const { transitions } = this.schema;
    // if not transitions, the return empty list
    if (!transitions) {
      return this.promise.resolve({ transitions: [] });
    }
    const checkFrom = transition => {
      return transition.from === from;
    };

    const checkEvent = transition => {
      // if event is not specified then event does not matter for search
      if (!event) {
        return true;
      }
      return transition.event === event;
    };


    const checkGuards = transition => {
      const { guards, from, to, event } = transition;
      // if guards are undefined
      if (!guards) {
        return true;
      }
      // "ask" each guard
      for (let i = 0; i < guards.length; i++) {
        const guard = this.guards[guards[i].name];
        // guard is defined in schema, but is not really defined -> error!!!
        if (!guard) {
          // eslint-disable-next-line max-len
          throw new Error(
            `Guard '${guards[i].name}' is specified in one the transitions but is not found/implemented!`
          );
        }
        // if guard return false, return false, e.g. transition is not available at the moment
        // pass arguments specified in guard call (part of schema)
        // additionally object and context are also passed
        if (!guard({ ...guards[i].arguments, from, to, event, object, context })) {
          return false;
        }
      }

      return true;
    };

    /**
     * Checks transition for automatic execution
     * Possible automatic transition definitions:
     * isAutomatic: true
     * isAutomatic: [g1, g2,...,gn] //gi - guard name, from guard definition
     *
     * @param transition
     * @return {boolean}
     */
    const checkAutomatic = transition => {
      const { from, to, event } = transition;
      const autoGuards = transition['isAutomatic'];

      //isAutomatic: true - checking for 'boolean' definition
      if (typeof autoGuards === 'boolean' && autoGuards) {
        return true;
      } else if (Array.isArray(autoGuards) && autoGuards.length > 0) { //checking for functional array def
        for (let i = 0; i < autoGuards.length; i++) {
          const autoGuard = this.guards[autoGuards[i].name];
          // auto check is defined in schema, but is not really defined -> error!!!
          if (!autoGuard) {
            // eslint-disable-next-line max-len
            throw new Error(
              `Automatic guard '${autoGuards[i].name}' is specified in one the transitions but is not found/implemented!`
            );
          }
          // if check return false, return false, e.g. transition is not available at the moment
          // pass arguments specified in guard call (part of schema)
          // additionally object and context are also passed
          if (!autoGuard({ ...autoGuards[i].arguments, from, to, event, object, context })) {
            return false;
          }

          return true;
        }
      } else {
        return false
      }
    };

    // console.log(`transitions '${JSON.stringify(transitions)}'`);
    return new Promise((resolve, reject) => {
      try {
        let foundTransitions = transitions.filter(transition => {
          return checkFrom(transition) &&
            checkEvent(transition) &&
            checkGuards(transition) &&
            (isAutomatic? checkAutomatic(transition) : true);
        });
        resolve({ transitions: foundTransitions });
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Returns a list of states
   * that are available during the workflow definition
   *
   * @return Array
   */
  getAvailableStates() {
    if (!this.schema) {
      return [];
    }

    let result = [];
    result.push(this.schema.initialState);
    result = result.concat(this.schema.finalStates);
    for (let i = 0; i < this.schema.transitions.length; i++) {
      result.push(this.schema.transitions[i].from);
      result.push(this.schema.transitions[i].to);
    }

    return Array.from(new Set(result)).sort();
  }

  static getDefaultObjectStateFieldName() {
    return "status";
  }
}
