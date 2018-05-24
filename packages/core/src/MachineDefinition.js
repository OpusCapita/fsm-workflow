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
  // this function is not made static because it is used in Machine.js via instance accessor
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

  /**
   * inspectConditions is a generic function which returns passed conditions with results of evaluation
   * @param {array<object>} conditions
   * @param {object} implicitParams
   * @returns {array<{ condition, result<boolean> }>}
   */
  inspectConditions({ conditions, implicitParams }) {
    // eslint-disable-next-line new-cap
    return new this.promise((resolve, reject) => {
      // collecting conditions that belong to current transition
      const preparedConditions = conditions.map((condition, idx) => {
        if (condition.expression) { // condition is an object with inline JS expression
          return condition
        }
        if (!this.conditions[condition.name]) {
          throw new Error(
            // eslint-disable-next-line max-len
            `Constraint '${condition.name}' is specified in one of transitions but corresponding condition is not found/implemented!`
          )
        }
        return this.conditions[condition.name];
      });

      return this.promise.all(
        preparedConditions.map((condition, idx) => {
          return this.promise.resolve(condition.expression ?
            // condition is an inline expression
            // we cast eval result to boolean because condition can only return boolean by design
            !!MachineDefinition.evaluateExpression({
              expression: condition.expression,
              params: implicitParams
            }) :
            // condition is an actual function
            // pass arguments specified in condition call (part of schema)
            // additionally object, request and context are also passed as implicitParams
            // request should be used to pass params for some dynamic calculations f.e.
            // role dependent transitions and e.t.c
            condition(this.prepareParams({ explicitParams: conditions[idx].params, implicitParams }))
          ).then(result => ({
            condition: conditions[idx],
            // `negate` property is applied only to function invocations
            result: conditions[idx].negate && !condition.expression ? !result : !!result
          }))
        })
      ).
        then(resolve).
        catch(reject)
    })
  }

  /**
   * inspectTransitions is a generic function which returns transitions with evaluated conditions
   * @param {boolean} checkAutomatic - defines if we need to check `automatic` conditions
   * @returns {array<{ transition, result<transition with inspected conditions> }>}
   */
  inspectTransitions({ from, event, object, request, context, checkAutomatic }) {
    // if from is not specified, then no transition is available
    if (from === null || from === undefined) {
      // to do throw proper error
      return this.promise.reject(new Error("'from' is not defined"));
    }
    const { schema } = this;
    const { transitions } = schema;
    // if not transitions, then return empty list
    if (!transitions) {
      return this.promise.resolve([]);
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

    return this.promise.all(
      transitions.
        filter(t => checkEvent(t) && checkFrom(t)).
        map(transition => {
          const { to, event, guards, automatic } = transition;

          const implicitParams = {
            from,
            to,
            event,
            object,
            ...this.prepareObjectAlias(object),
            request,
            context
          }

          const inspectionData = [transition];

          if (guards) {
            inspectionData.push(
              this.inspectConditions({ conditions: guards, implicitParams }).
                then(inspectedGuards => ({ guards: inspectedGuards }))
            )
          }

          if (checkAutomatic) {
            // if checkAutomatic === true then check `automatic` condition(s)
            if (Object(automatic) !== automatic) { // primitive -> cast to boolean
              inspectionData.push({ automatic: !!automatic })
            } else if (automatic.length === 0) { // empty array
              inspectionData.push({ automatic: false })
            } else {
              inspectionData.push(
                this.inspectConditions({ conditions: automatic, implicitParams }).
                  then(inspectedAutomatic => ({ automatic: inspectedAutomatic }))
              )
            }
          }

          return this.promise.all(inspectionData).
            // transition === transition, which was inspected, as it's defined in schema
            // inspected === [{ guards: guards results }, { automatic: automatic results }]
            then(([transition, ...inspected]) => ({
              transition,
              result: inspected.reduce((acc, inspectionResult) => ({ ...acc, ...inspectionResult }), transition)
            }))
        })
    )
  }

  findAvailableTransitions({ from, event, object, request, context, isAutomatic = false } = {}) {
    return this.inspectTransitions({ from, event, object, request, context, checkAutomatic: isAutomatic }).
      then(inspectionResults => inspectionResults. // [ { transition, result }, { transition, result }, ... ]
        filter(({ transition, result }) => {
          const guardsResults = transition.guards ?
            result.guards.every(({ result }) => result) :
            true;

          let automaticResults = true;

          if (isAutomatic) {
            automaticResults = Array.isArray(result.automatic) ?
              result.automatic.every(({ result }) => result) :
              result.automatic
          }

          return guardsResults && automaticResults;
        }).
        map(({ transition }) => transition)).
      then(transitions => ({ transitions }))
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
