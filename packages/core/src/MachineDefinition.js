// return new array that contains unique values from original array
const toUnique = original => original.filter((v, i, a) => a.indexOf(v) === i);

export default class MachineDefinition {
  constructor({ schema, conditions = {}, actions = {}, promise = MachineDefinition.defaultPromise() } = {}) {
    // todo validate schema
    if (!promise) {
      throw new Error("promise is undefined");
    }
    // TODO: validate that name is passed (it wil be used by machine to write/read history)
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
        return this.promise.resolve(true);
      }

      // eslint-disable-next-line new-cap
      return new this.promise((resolve, reject) => {
        // collecting conditions that belong to current transition
        const conditions = guards.map((guard, idx) => {
          if (!this.conditions[guards[idx].name]) {
            // eslint-disable-next-line max-len
            throw new Error(
              `Guard '${guards[idx].name}' is specified in one the transitions but corresponding condition is not found/implemented!`
            )
          } else {
            return this.conditions[guards[idx].name];
          }
        });

        return this.promise.all(
          conditions.map((condition, idx) => {
            return this.promise.resolve(condition({
              ...guards[idx].arguments,
              from,
              to,
              event,
              object,
              request,
              context
            })).then(result => {
              // if guard is resolve with false or is rejected, e.g. transition is not available at the moment
              // pass arguments specified in guard call (part of schema)
              // additionally object, request and context are also passed
              // request should be used to pass params for some dynamic calculations f.e.
              // role dependent transitions and e.t.c
              return guards[idx].negate ? !result : !!result
            })
          })
        ).then(executionResults => resolve(executionResults.every(result => !!result))).catch(e => reject(e))
      })
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
      const { from, to, event, automatic } = transition;

      // automatic: true - checking for 'boolean' definition
      if (typeof automatic === 'boolean' && automatic) {
        return this.promise.resolve(true);
      } else if (!automatic || automatic.length === 0) {
        // automatic also could be an array in the same way as guards
        return this.promise.resolve(false);
      }

      // eslint-disable-next-line new-cap
      return new this.promise((resolve, reject) => {
        // collecting conditions that belong to current auto transition into list of functions
        const automaticConditions = automatic.map((autoGuard, idx) => {
          if (!this.conditions[automatic[idx].name]) {
            // eslint-disable-next-line max-len
            throw new Error(
              // if no functions definition found - throw an error
              `Automatic condition '${automatic[idx].name}' is specified in one the transitions but is not found/implemented!`
            )
          } else {
            return this.conditions[automatic[idx].name];
          }
        });

        // execute all checks asynchronously then collect & aggregate executions results
        return this.promise.all(
          automaticConditions.map((autoCondition, idx) => {
            return this.promise.resolve(autoCondition({
              ...automatic[idx].arguments,
              from,
              to,
              event,
              object,
              request,
              context
            })).then(result => {
              // if check return false, return false, e.g. transition is not available at the moment
              // pass arguments specified in guard call (part of schema)
              // additionally object and context are also passed
              return automatic[idx].negate ? !result : !!result
            })
          })
        ).then(executionResults => resolve(executionResults.every(result => !!result))).catch(e => reject(e));
      })
    };

    // eslint-disable-next-line new-cap
    return this.promise.all(
      transitions.filter(t => checkEvent(t) && checkFrom(t)).map(transition => this.promise.all([
        checkGuards(transition),
        isAutomatic ? checkAutomatic(transition) : this.promise.resolve(true)
      ]).then(checkResults => {
        if (checkResults.every(result => !!result)) {
          return this.promise.resolve(transition);
        } else {
          return this.promise.resolve(null);
        }
      }))).then(foundTransitions => this.promise.resolve({
        transitions: foundTransitions.filter(foundTransitions => !!foundTransitions)
      })
    );
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
