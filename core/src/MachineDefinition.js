// return new array that contains unique values from original array
const toUnique = original => original.filter((v, i, a) => a.indexOf(v) === i);

export default class MachineDefinition {
  constructor({ schema = {}, conditions = {}, actions = {}, promise = MachineDefinition.defaultPromise() } = {}) {
    // todo validate schema
    if (!promise) {
      throw new Error("promise is undefined");
    }
    // console.log(`schema '${JSON.stringify(schema)}'`);
    this.schema = {
      finalStates: [],
      ...schema,
      objectConfig: {
        objectStateFieldName: MachineDefinition.getDefaultObjectStateFieldName(),
        ...schema.objectConfig
      }
    };
    // condition is an object, where each property name is condition name and
    // value is condition implentation (function)
    this.conditions = conditions;
    // actions is an object, where each property is implemented action name and
    // value is action (function) itself
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
    const { transitions, objectConfig } = this.schema;
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
      // add object alias to the list of implicit parameters
      const { objectAlias } = objectConfig;
      const implicitParams = {
        from,
        to,
        event,
        object,
        ...(objectAlias && { [objectAlias]: object }),
        request,
        context
      };
      // "ask" each guard
      for (let i = 0; i < guards.length; i++) {
        const guard = guards[i];

        if (typeof guard === 'string') {
          // guard is a string representing a JavaScript expression
          try {
            const result = (
              eval( // eslint-disable-line no-eval
                `
                  (function(arg) {
                    ${Object.keys(implicitParams).map(key => `var ${key} = arg[${JSON.stringify(key)}];`).join('\n')}
                    return (${guard})
                  })
                `
              )(implicitParams)
            );

            if (typeof result !== 'boolean') {
              throw new Error(
                `Guard <${guard}> does not evaluate to boolean value: got ${String(result)} of type ${typeof result}`
              )
            }

            return result;
          } catch (err) {
            throw err
          }
        } else {
          const condition = this.conditions[guard.name];
          // guard is defined in schema, but corresponding condition is not really defined -> error!!!
          if (!condition) {
            throw new Error(
              // eslint-disable-next-line max-len
              `Guard '${guard.name}' is specified in one the transitions but corresponding condition is not found/implemented!`
            );
          }

          // if guard returns false, return false, e.g. transition is not available at the moment
          // pass arguments specified in guard call (part of schema)
          // additionally object, request and context are also passed
          // request should be used to pass params for some dynamic calculations
          // f.e. role dependent transitions and etc.
          let conditionResult = condition({ ...guard.arguments, ...implicitParams });
          if (guard.negate === true) {
            conditionResult = !conditionResult;
          }
          if (!conditionResult) {
            return false;
          }
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
        let conditionResult = condition({ ...automatic[i].arguments, from, to, event, object, context });
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
    // TBD do we need to throw if this.schema.states not defined?
    // or this is a matter of validation and doewsn't belong here?
    const result = this.schema.states.map(state => state.name);
    return toUnique(result).sort();
  }

  static getDefaultObjectStateFieldName() {
    return "status";
  }
}
