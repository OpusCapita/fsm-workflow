// return new array that contains unique values from original array
const toUnique = original => original.filter((v, i, a) => a.indexOf(v) === i);

export default class MachineDefinition {
  constructor({
    schema = {},
    conditions = {},
    actions = {},
    objectConfiguration = {},
    promise = MachineDefinition.defaultPromise()
  } = {}) {
    // todo validate schema
    if (!promise) {
      throw new Error("'promise' is undefined");
    }
    // TODO: validate that name is passed (it wil be used by machine to write/read history)

    this.schema = {
      finalStates: [],
      ...schema
    };
    // condition is an object, where each property name is condition name and
    // value is condition implentation (function)
    this.conditions = conditions;
    // actions is an object, where each property is implemented action name and
    // value is action(function) itself
    this.actions = actions;
    /*
     * objectConfiguration is required by machine/engine and editor:
     * {
     *   stateFieldName,       // (String) object property that holds current object state
     *   schema,               // (Object) object JSON schema, will be used by the
     *                         //   editor to build expressions using object structure information
     *   alias,                // (String) object alias that will be used in action/guard
     *                         //   calls an implicit variable that is a reference to an object.
     *                         //   For example for invoice approval object alias could be 'invoice',
     *                         //   e.g. in guard expression user could type invoice.total < 1
     *                         //   instead of object.total < 1
     *   example              // (Object) object example that is used in editor
     * }
     */
    this.objectConfiguration = {
      stateFieldName: MachineDefinition.getDefaultObjectStateFieldName(),
      ...objectConfiguration
    };
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

  static getDefaultObjectStateFieldName() {
    return "status";
  }

  static evaluateExpression({ expression, params }) {
    try {
      return eval( // eslint-disable-line no-eval
        `
          (function(arg) {
            ${Object.keys(params).map(key => `var ${key} = arg[${JSON.stringify(key)}];`).join('\n')}
            return (${expression})
          })
        `
      )(params)
    } catch (err) {
      throw err
    }
  }

  // if objectConfiguration.alias is set up then
  // JSON {<alias>: object} is returned otherwise empty JSON {}
  prepareObjectAlias(object) {
    const { alias } = this.objectConfiguration;
    return alias ? { [alias]: object } : {};
  }

  // evaluate explicit params and combine with implicit params
  prepareParams({ explicitParams = [], implicitParams }) {
    return {
      ...explicitParams.reduce((params, { name, value, expression }) => ({
        ...params,
        [name]: expression ?
          MachineDefinition.evaluateExpression({
            expression: value,
            params: implicitParams
          }) :
          value
      }), {}),
      ...implicitParams
    }
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
        return this.promise.resolve(true);
      }

      // eslint-disable-next-line new-cap
      return new this.promise((resolve, reject) => {
        // collecting conditions that belong to current transition
        const conditions = guards.map((guard, idx) => {
          if (guard.expression) { // guard is an object with inline JS expression
            return guard
          }
          if (!this.conditions[guard.name]) {
            throw new Error(
              // eslint-disable-next-line max-len
              `Guard '${guard.name}' is specified in one of transitions but corresponding condition is not found/implemented!`
            )
          }
          return this.conditions[guard.name];
        });

        const implicitParams = {
          from,
          to,
          event,
          object,
          ...this.prepareObjectAlias(object),
          request,
          context
        }

        return this.promise.all(
          conditions.map((condition, idx) => {
            return this.promise.resolve(condition.expression ?
              // guard is an inline expression
              // we cast eval result to boolean because guard can only return boolean by design
              !!MachineDefinition.evaluateExpression({
                expression: condition.expression,
                params: implicitParams
              }) :
              // guard is an actual function
              // pass arguments specified in guard call (part of schema)
              // additionally object, request and context are also passed
              // request should be used to pass params for some dynamic calculations f.e.
              // role dependent transitions and e.t.c
              condition(this.prepareParams({ explicitParams: guards[idx].params, implicitParams }))
            ).then(result => {
              // if guard is resolved with false or is rejected, e.g. transition is not available at the moment

              // `negate` property is applied only to function invocations
              return guards[idx].negate && !guards[idx].expression ? !result : !!result
            })
          })
        ).then(executionResults => resolve(executionResults.every(Boolean))).catch(e => reject(e))
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

      // automatic: checking for boolean 'true'
      if (automatic === true) {
        return this.promise.resolve(true);
      } else if (!automatic || automatic.length === 0) {
        // automatic also could be an array in the same way as guards
        return this.promise.resolve(false);
      }

      // eslint-disable-next-line new-cap
      return new this.promise((resolve, reject) => {
        // collecting conditions that belong to current auto transition into list of functions
        const automaticConditions = automatic.map((autoGuard, idx) => {
          if (autoGuard.expression) { // autoGuard is an object with inline JS expression
            return autoGuard
          }
          if (!this.conditions[automatic[idx].name]) {
            throw new Error(
              // if no functions definition found - throw an error
              // eslint-disable-next-line max-len
              `Automatic condition '${automatic[idx].name}' is specified in one the transitions but is not found/implemented!`
            )
          }
          return this.conditions[automatic[idx].name];
        });

        const implicitParams = {
          from,
          to,
          event,
          object,
          ...this.prepareObjectAlias(object),
          request,
          context
        }

        // execute all checks asynchronously then collect & aggregate executions results
        return this.promise.all(
          automaticConditions.map((autoCondition, idx) => {
            return this.promise.resolve(autoCondition.expression ?
              // autoGuard is an inline expression
              // we cast eval result to boolean because guard can only return boolean by design
              !!MachineDefinition.evaluateExpression({
                expression: autoCondition.expression,
                params: implicitParams
              }) :
              // autoGuard is an actual function
              // pass arguments specified in guard call (part of schema)
              // additionally object and context are also passed
              autoCondition(this.prepareParams({ explicitParams: automatic[idx].params, implicitParams }))
            ).then(result => {
              // if check return false, return false, e.g. transition is not available at the moment

              // `negate` property is applied only to function invocations
              return automatic[idx].negate && !automatic[idx].expression ? !result : !!result
            })
          })
        ).then(executionResults => resolve(executionResults.every(Boolean))).catch(e => reject(e));
      })
    };

    // eslint-disable-next-line new-cap
    return this.promise.all(
      transitions.filter(t => checkEvent(t) && checkFrom(t)).map(transition => this.promise.all([
        checkGuards(transition),
        isAutomatic ? checkAutomatic(transition) : this.promise.resolve(true)
      ]).then(checkResults => {
        if (checkResults.every(Boolean)) {
          return transition;
        } else {
          return null;
        }
      }))).then(foundTransitions => ({
        transitions: foundTransitions.filter(Boolean)
      })
    );
  }

  /**
   * Returns a list of all states that are defined in schema
   *
   * @return Array
   */
  getAvailableStates() {
    // TBD do we need to throw if this.schema.states not defined?
    // or this is a matter of validation and doewsn't belong here?
    let result = [this.schema.initialState, ...this.schema.finalStates];
    if (this.schema.states && this.schema.states.length > 0) {
      result = result.concat(this.schema.states.map(state => state.name));
    }
    if (this.schema.transitions && this.schema.transitions.length > 0) {
      result = result.concat(this.schema.transitions.reduce(
          // gather all states from transitions
          (accumulator, t) => {
            return accumulator.concat(t.from, t.to)
          },
          []
        ));
    }

    return toUnique(result).sort();
  }
}
