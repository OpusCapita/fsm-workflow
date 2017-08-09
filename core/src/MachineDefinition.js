// return new array that contains unique values from original array
const toUnique = original => original.filter((v, i, a) => a.indexOf(v) === i);

export default class MachineDefinition {
  constructor({ schema, conditions = {}, actions = {}, promise = MachineDefinition.defaultPromise() } = {}) {
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
    // condition is an object, where each property name is condition name and
    // value is condition implentation (function)
    this.conditions = conditions;
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

  findAvailableTransitions({ from, event, object, request, context, isAutomatic = false } = {}) {
    // if from is not specified, then no transition is available
    if (from === null || from === undefined) {
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
        const condition = this.conditions[guards[i].name];
        const negate = guards[i].negate ? guards[i].negate : false;
        // guard is defined in schema, but corresponding condition is not really defined -> error!!!
        if (!condition) {
          throw new Error(
            // eslint-disable-next-line max-len
            `Guard '${guards[i].name}' is specified in one the transitions but corresponding condition is not found/implemented!`
          );
        }
        // if guard return false, return false, e.g. transition is not available at the moment
        // pass arguments specified in guard call (part of schema)
        // additionally object, request and context are also passed
        // request should be used to pass params for some dynamic calculations f.e. role dependent transitions and e.t.c
        let conditionValue = condition({ ...guards[i].arguments, from, to, event, object, request, context });
        conditionValue = negate ? !conditionValue : conditionValue;
        if (!conditionValue) {
          return false;
        }
      }

      return true;
    };

    /**
     * Checks transition for automatic execution
     * Possible automatic transition definitions:
     * automatic: true
     * automatic: [g1, g2,...,gn] //gi - condition name, from confition definition
     *
     * @param transition
     * @return {boolean}
     */
    const checkAutomatic = transition => {
      const { from, to, event } = transition;
      const automatic = transition['automatic'];

      // automatic: true - checking for 'boolean' definition
      if (typeof automatic === 'boolean' && automatic) {
        return true;
      } else if (!automatic || automatic.length === 0) {
        return false
      }
      for (let i = 0; i < automatic.length; i++) {
        const condition = this.conditions[automatic[i].name];
        const negate = automatic[i].negate ? automatic[i].negate : false;

        // condition is referenced is defined in schema, but is not really defined -> error!!!
        if (!condition) {
          throw new Error(
            // eslint-disable-next-line max-len
            `Automatic condition '${automatic[i].name}' is specified in one the transitions but is not found/implemented!`
          );
        }
        // if check return false, return false, e.g. transition is not available at the moment
        // pass arguments specified in guard call (part of schema)
        // additionally object and context are also passed
        let conditionValue = condition({ ...automatic[i].arguments, from, to, event, object, context });
        conditionValue = negate ? !conditionValue : conditionValue;
        if (!conditionValue) {
          return false;
        }
      }
      return true;
    };

    // console.log(`transitions '${JSON.stringify(transitions)}'`);
    return new Promise((resolve, reject) => {
      try {
        let foundTransitions = transitions.filter(transition => {
          return checkFrom(transition) &&
            checkEvent(transition) &&
            checkGuards(transition) &&
            (isAutomatic ? checkAutomatic(transition) : true);
        });
        resolve({ transitions: foundTransitions });
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Returns a list of all states that are defined in schema
   *
   * @return Array
   */
  getAvailableStates() {
    const result = this.schema.transitions.reduce(
      // gather all states from transitions
      (accumulator, t) => {
        return accumulator.concat(t.from, t.to)
      },
      // initial and final states
      [this.schema.initialState, ...this.schema.finalStates]
    );

    return toUnique(result).sort();
  }

  static getDefaultObjectStateFieldName() {
    return "status";
  }
}
