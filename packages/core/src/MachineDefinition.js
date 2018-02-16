// return new array that contains unique values from original array
const toUnique = original => original.filter((v, i, a) => a.indexOf(v) === i);

export default class MachineDefinition {

  /**
   * eslint-disable-next-line max-len
   * Here schema has objectConfiguration. It is required by machine/engine and editor:
   * {
   *   stateFieldName,       // (String) object property that holds current object state
   *   schema,               // (Object) object JSON schema, will be used by the
   *                         //   editor to build expressions using object structure information
   *   alias,                // (String) object alias that will be used in action/guard
   *                         //   calls an implicit variable that is a reference to an object.
   *                         //   For example for invoice approval object alias could be 'invoice',
   *                         //   e.g. in guard expression user could type invoice.total < 1
   *                         //   instead of object.total < 1
   *   example,              // (Object) object example that is used in editor
   *   getBusinessObjId      // function that accepts object as single argument (workflow process),
   *                         //   it returns object unique identifier (String, examples: '123456')
   *   getBusinessObjType    // function that accepts object as single argument (workflow process),
   *                         //   it returns unique object type
   *                         //   (String, examples: 'invoice', 'supplier', 'purchaseorder')
   * }
   */
  constructor({ schema = {}, conditions = {}, actions = {}, promise = MachineDefinition.defaultPromise() } = {}) {
    // todo validate schema
    if (!promise) {
      throw new Error("'promise' is undefined");
    }
    // TODO: validate that name is passed (it wil be used by machine to write/read history)

    const { objectConfiguration, ...restSchema } = schema;

    this.schema = {
      objectConfiguration: {
        stateFieldName: MachineDefinition.getDefaultObjectStateFieldName(),
        ...objectConfiguration
      },
      finalStates: [],
      ...restSchema
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

  // if schema.objectConfiguration.alias is set up then
  // JSON {<alias>: object} is returned otherwise empty JSON {}
  prepareObjectAlias(object) {
    const { objectConfiguration } = this.schema;
    if (objectConfiguration && objectConfiguration.alias) {
      return { [objectConfiguration.alias]: object };
    }
    return {};
  }

  findAvailableTransitions({ from, event, object, request, context, isAutomatic = false } = {}) {
    // if from is not specified, then no transition is available
    if (from === null || from === undefined) {
      // to do throw proper error
      return this.promise.reject(new Error("'from' is not defined"));
    }
    const { schema } = this;
    const { transitions } = schema;
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
        // request should be used to pass params for some dynamic calculations f.e. role dependent transitions and etc.
        let conditionResult = condition({
          ...guards[i].arguments,
          from,
          to,
          event,
          object,
          ...this.prepareObjectAlias(object),
          request,
          context
        });
        // negate resut (if required)
        if (guards[i].negate === true) {
          conditionResult = !conditionResult;
        }
        // on first false result, exit and return false (skip other guards)
        if (!conditionResult) {
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
        let conditionResult = condition({
          ...automatic[i].arguments,
          from,
          to,
          event,
          object,
          ...this.prepareObjectAlias(object),
          context
        });
        if (automatic[i].negate === true) {
          conditionResult = !conditionResult;
        }
        if (!conditionResult) {
          return false;
        }
      }
      return true;
    };

    // console.log(`transitions '${JSON.stringify(transitions)}'`);
    // eslint-disable-next-line new-cap
    return new this.promise((resolve, reject) => {
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
