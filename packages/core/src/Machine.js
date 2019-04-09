export default class Machine {
  constructor({
    machineDefinition,
    promise = Machine.defaultPromise(),
    context = {},
    history,
    convertObjectToReference
  } = {}) {
    if (!machineDefinition) {
      throw new Error("machineDefinition is undefined");
    }
    this.machineDefinition = machineDefinition;
    if (!promise) {
      throw new Error("promise is undefined");
    }
    this.promise = promise;
    // context is optional
    this.context = context;
    // history is optional too
    if (history) {
      this.history = history;
    } else {
      // mock history
      // todo implement simple history storage in memory (if required)
      this.history = Machine.defaultHistory(promise);
    }

    // used in all method/functions that read/write hostory records
    if (convertObjectToReference) {
      this.convertObjectToReference = convertObjectToReference;
    }
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

  static defaultHistory(promise) {
    return {
      add() {
        /* istanbul ignore next */
        return promise.resolve({});
      },
      search() {
        /* istanbul ignore next */
        return promise.resolve([]);
      }
    }
  }

  // default implementation will throw an exception which should inform
  // developer that machine is not properly configured
  convertObjectToReference() {
    throw new Error(`'convertObjectToReference' is not defined
It is expected to be a function like this:
function(object) {
return {
businessObjType: ...   // business object type/class (examples: 'invoice', 'supplier', 'purchase-order')
businessObjId: ...     // business object unique id (examples: '123456789')
}
}
    `);
  }

  // sets object initial state
  // @param object - stateful object
  // @param user - user name who initiated event/transition (this info will be writted into object wortkflow history)
  // @param description - event/transition/object description (this info will be writted into object wortkflow history)
  // N!B!: history record fields 'from' is set to ''NULL' value and 'event' to '__START__' value
  start({ object, user, description }) {
    const {
      schema: { name, initialState },
      objectConfiguration: { stateFieldName }
    } = this.machineDefinition;
    const { convertObjectToReference } = this;
    // eslint-disable-next-line no-param-reassign
    object[stateFieldName] = initialState;
    // add history record
    return this.history.add({
      from: 'NULL',
      to: initialState,
      event: '__START__',
      // TODO: add validation for type and id here???
      ...convertObjectToReference(object),
      // TODO: add validation for user???
      user,
      description,
      workflowName: name
    }).then(() => {
      return ({ object });
    });
  }

  // returns current object state
  currentState({ object }) {
    const { stateFieldName } = this.machineDefinition.objectConfiguration;
    return object[stateFieldName];
  }

  // returns a list of events (names) that are available at current object state
  // event is optional, it is required only if you search for transitions with the event
  availableTransitions({ object, event, request }) {
    // calculate from state
    const from = this.currentState({ object });
    // get context
    const { context } = this;
    // we can cut each transition to 'event' and 'auto', but not now (may be later)
    return this.machineDefinition.findAvailableTransitions({
      from,
      object,
      request,
      context,
      event
    });
  }

  /**
   * Searches for transitions available for automatic execution from current object state
   *
   * @param object
   * @return Promise that is resolved with transition list or resolved with error
   */
  availableAutomaticTransitions({ object }) {
    return this.machineDefinition.findAvailableTransitions({
      from: this.currentState({ object }),
      object,
      context: this.context,
      isAutomatic: true
    });
  }

  // sends event
  // @param object - stateful object
  // @param event - name of the event to be send
  // @param user - user name who initiated event/transition (this info will be writted into object wortkflow history)
  // @param description - event/transition/object description (this info will be writted into object wortkflow history)
  // @param request - event request data
  sendEvent({ object, event, user, description, request }) {
    const { machineDefinition, convertObjectToReference } = this;
    const {
      schema: { name: workflowName },
      objectConfiguration: { stateFieldName }
    } = machineDefinition;
    // calculate from state
    const from = this.currentState({ object });
    // get context
    const { context, promise } = this;
    //
    const changeObjectState = to => {
      // eslint-disable-next-line no-param-reassign
      object[stateFieldName] = to;
    };

    return this.machineDefinition.findAvailableTransitions({
      from,
      event,
      object,
      ...machineDefinition.prepareObjectAlias(object),
      request,
      context
    }).then(({ transitions }) => {
      if (!transitions || transitions.length === 0) {
        // throw/return proper/sepecific error
        return promise.reject({
          object,
          from,
          event,
          message: `Transition for 'from': '${from}' and 'event': '${event}' is not found`
        });
      }
      /* istanbul ignore if */
      if (transitions.length > 1) {
        console.warn(`More than one transition is found for 'from': '${from}' and 'event': '${event}'`);
      }
      // select first found transition and read its information
      // using node destruct syntax to get 1st element and destruct it to {to, actions} object
      const [{ to, actions = [] }] = transitions;

      return this.canBeReleased({ object, to, request }).
        then(ok => {
          if (!ok) {
            return promise.reject({
              object,
              from,
              to,
              event,
              message: `Object cannot be released from "${from}" to "${to}"`
            });
          }

          // extracting actionDefinitions list from
          const actionDefinitions = actions.map(action => {
            if (!machineDefinition.actions[action.name]) {
              // throwing an error will fail top reject promise
              throw new Error({
                action: action.name,
                object,
                from,
                event,
                to,
                message: `Action '${action.name}' is specified in one of transitions but is not found/implemented!`
              });
            }
            // wrapping action into a Promise to support both sync/async variants
            return machineDefinition.actions[action.name];
          });

          const implicitParams = {
            from,
            to,
            event,
            object,
            ...machineDefinition.prepareObjectAlias(object),
            request,
            context
          }

          // reducing actionDefinitions to promise queue
          return actionDefinitions.reduce(
            (executionAccumulator, action, idx) => {
              return executionAccumulator.then(({ actionExecutionResults, object }) => {
                // action can be both synchronous and asynchronous
                // we need promise.resolve to make it then-able
                return promise.resolve(action({
                  ...this.machineDefinition.prepareParams({ explicitParams: actions[idx].params, implicitParams }),
                  actionExecutionResults
                })).then(actionResult => {
                  return {
                    actionExecutionResults: [
                      ...actionExecutionResults,
                      {
                        name: actions[idx].name,
                        result: actionResult
                      }
                    ],
                    object
                  }
                })
              })
            },
            promise.resolve({ // initial object accumulator
              actionExecutionResults: [],
              object
            })
          ).then(({ actionExecutionResults, object }) => {
            changeObjectState(to);
            // first we promote object state to the next state and only then save history
            return this.history.add({
              from,
              to,
              event,
              // TODO: add validation for type and id here???
              ...convertObjectToReference(object),
              // TODO: add validation for user???
              user,
              description,
              workflowName
            }).then(_ => ({
              actionExecutionResults,
              object
            }))
          });
        });
    });
  }

  /**
   * Checks if workflow is launched and not finished for a specified object
   * @param object
   * @return {number}
   */
  isRunning({ object }) {
    return this.availableStates().indexOf(this.currentState({ object })) !== -1 &&
      !this.isInFinalState({ object })
  }

  /**
   * Return list of available workflow states
   * @return {Array}
   */
  availableStates() {
    return this.machineDefinition.getAvailableStates();
  }

  // returns true if object in specified state
  is({ object, state }) {
    return this.currentState({ object }) === state;
  }

  // returns true if object in one of final states specified in machine definition schema
  isInFinalState({ object }) {
    return this.machineDefinition.schema.finalStates.indexOf(this.currentState({ object })) >= 0;
  }

  // returns promise, where then gets single argument with boolean value
  can({ object, event }) { // TBD why 'request' is not passed here?
    return this.availableTransitions({ object, event }).then(({ transitions }) => {
      return transitions && transitions.length > 0 &&
        this.promise.all(transitions.map(({ to }) => this.canBeReleased({ object, to }))).
          then(results => !results.some(result => result === false));
    });
  }

  // retuns promise, where then gets single argument with boolean value
  cannot({ object, event }) {
    return this.can({ event, object }).then(result => !result);
  }

  /* eslint-disable max-len */
  /**
   * Is it allowed to release from current state?
   * @param {object} object - business object
   * @param {string} to - (optional) name of target state (can object release from state 'from' and transit to state 'to'?)
   * @param {object} request - (optional) request-specific data
   * @returns {Promise<boolean>}
   */
  /* eslint-enable max-len */
  canBeReleased({ object, to, request }) {
    // calculate from state
    const from = this.currentState({ object });
    // get context
    const { context } = this;
    return this.machineDefinition.inspectReleaseConditions({ from, to, object, request, context }).
      then(inspectionResults => {
        // if no release conditions defined for this state then inspectReleaseConditions returns 'true'
        if (inspectionResults === true) {
          return true
        }
        // otherwise return 'false' when first 'false' result is met
        return !inspectionResults.some(
          ({ result: inspectionResult }) => inspectionResult.some(({ result }) => result === false)
        )
      });
  }

  /**
  * Provides access to business object history records within the workflow
  *
  * @param {Object} searchParameters search parameters
  * @param {string} searchParameters.object business object (process)
  * @param {string} searchParameters.user user name initiated event (examles: 'Friedrich Wilhelm Viktor Albert')
  * @param {Object} searchParameters.finishedOn time when transition was completed
  * @param {Date} searchParameters.finishedOn.gt means that finishedOn should be greater than passed date
   *  (example: Date("2018-03-05T21:00:00.000Z")
  * @param {Date} searchParameters.finishedOn.gte greater than or equal
  * @param {Date} searchParameters.finishedOn.lt lesser than
  * @param {Date} searchParameters.finishedOn.lte lesser than or equal
  * @param {Object} paging results paging parameters
  * @param {Object} sorting results searchong parameters
  *
  * @returns Promise that is resolved into an array which contains found history records
  *
  * History record is an object with the following structure:
  * {
  *   event,
  *   from,
  *   to,
  *   object,
  *   user,
  *   description,
  *   finishedOn
  * }
  */
  getHistory(
    { object, user, finishedOn },
    /* istanbul ignore next */ { max, offset } = {},
    /* istanbul ignore next */ { by, order } = {}
  ) {
    const { convertObjectToReference } = this;
    return this.history.search({
      object: convertObjectToReference(object),
      user,
      finishedOn,
      workflowName: this.machineDefinition.schema.name
    }, {
      max,
      offset
    }, {
      by,
      order
    }).then(historyRecords => historyRecords.map(({
      event,
      from,
      to,
      businessObjType,
      businessObjId,
      user,
      description,
      finishedOn
    }) => ({
      event,
      from,
      to,
      object: {
        businessObjType,
        businessObjId
      },
      user,
      description,
      finishedOn
    })));
  }
}
