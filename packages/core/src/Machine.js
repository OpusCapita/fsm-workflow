import MachineDefinition from './MachineDefinition';

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
businessObjectType: ...   // business object type/class (examples: 'invoice', 'supplier', 'purchase-order')
businessObjectId: ...     // business object unique id (examples: '123456789')
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
    const { name, initialState, objectConfiguration } = this.machineDefinition.schema;
    const { stateFieldName } = objectConfiguration;
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
    const { stateFieldName } = this.machineDefinition.schema.objectConfiguration;
    return object[stateFieldName];
  }

  // returns a lits of events (names) that are available at current object state
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
    const { schema } = machineDefinition;
    const { objectConfiguration, workflowName } = schema;
    const { stateFieldName } = objectConfiguration;
    // calculate from state
    const from = this.currentState({ object });
    // get context
    const { context, promise } = this;
    //
    const changeObjectState = to => {
      // eslint-disable-next-line no-param-reassign
      object[stateFieldName] = to;
    };

    const actionByName = name => {
      return machineDefinition.actions[name];
    };

    return machineDefinition.
      findAvailableTransitions({
        from,
        event,
        object,
        request,
        context
      }).
      then(({ transitions }) => {
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
          if (console) {
            console.log(`More than one transition is found for 'from': '${from}' and 'event': '${event}'`);
          }
        }
        // select first found transition and read its information
        const { to, actions = [] } = transitions[0];
        // console.log(`Start transition for 'from': '${from}' and 'event': '${event}' to '${to}'`);

        // todo: call onStartTransition handler
        let result = promise.resolve({ actionExecutionResutls: [], object });
        for (let i = 0; i < actions.length; i++) {
          result = result.then(({ actionExecutionResutls, object }) => {
            let action = actionByName(actions[i].name);
            // action is defined in schema, but is not really defined -> error!!!
            if (!action) {
              // throw/return proper/sepecific error
              return promise.reject({
                action: actions[i].name,
                object,
                from,
                event,
                to,
                message: `Action '${actions[i].name}' is specified in one the transitions but is not found/implemented!`
              });
            }

            // prepare params
            let params = {
              ...actions[i].arguments,
              from,
              to,
              event,
              object,
              request,
              context,
              actionExecutionResutls
            };
            // add object alias (if specified)
            params = MachineDefinition.extendParamsWithObjectAlias(params, object, schema)

            // execute action
            const actionResult = action(params);
            // store action execution result for passing it into the next action
            return {
              actionExecutionResutls: actionExecutionResutls.concat([
                {
                  name: actions[i].name,
                  result: actionResult
                }
              ]),
              object
            };
          });
        }

        return result.then(({ actionExecutionResutls, object }) => {
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
          }).then(() => {
            changeObjectState(to);
            return {
              actionExecutionResutls,
              object
            };
          });
        });
        // todo: call onFinishTransition handler
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

  // returns true iff object in specified state
  is({ object, state }) {
    return this.currentState({ object }) === state;
  }

  // returns true iff object in once of filal state specified in machine definition
  // isFinal({ state }) {
  //   // console.log(`finalStates: '${this.machineDefinition.schema.finalStates}'`);
  //   // console.log(`state: '${state}'`);
  //   return this.machineDefinition.schema.finalStates.indexOf(state) >= 0;
  // }

  // returns true iff object in one of final states specified in machine definition schema
  isInFinalState({ object }) {
    return this.machineDefinition.schema.finalStates.indexOf(this.currentState({ object })) >= 0;
  }

  // retuns promise, where then gets single argument with boolean value
  can({ object, event }) {
    return this.availableTransitions({ object, event }).then(({ transitions }) => {
      // console.log(`transitions: '${JSON.stringify(transitions)}'`);
      return this.promise.resolve(transitions && transitions.length > 0);
    });
  }

  // retuns promise, where then gets single argument with boolean value
  cannot({ object, event }) {
    return this.can({ event, object }).then(result => this.promise.resolve(!result));
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
  getHistory({ object, user, finishedOn }, { max, offset }, { by, order }) {
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
    }).then((historyRecords) => {
      // map businessObjId, businessObjType to obect
      return historyRecords.map(({ businessObjType, businessObjId, ...otherProperties }) => {
        return {
          object: {
            businessObjType,
            businessObjId
          },
          ...otherProperties
        }
      });
    });
  }
}
