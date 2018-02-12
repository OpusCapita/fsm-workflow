export default class Machine {
  constructor({ machineDefinition, promise = Machine.defaultPromise(), context = {} } = {}) {
    if (!machineDefinition) {
      throw new Error("machineDefinition is undefined");
    }
    if (!promise) {
      throw new Error("promise is undefined");
    }
    this.machineDefinition = machineDefinition;
    this.promise = promise;
    // context is optional
    this.context = context;
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

  // sets object initial state
  start({ object }) {
    const { initialState } = this.machineDefinition.schema;
    const { objectStateFieldName } = this.machineDefinition.schema.objectConfig;
    // eslint-disable-next-line no-param-reassign
    object[objectStateFieldName] = initialState;
    return this.promise.resolve({ object });
  }

  // returns current object state
  currentState({ object }) {
    const { objectStateFieldName } = this.machineDefinition.schema.objectConfig;
    return object[objectStateFieldName];
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

  // send event
  // object - stateful object
  // event - name of the event to be send
  // request - event request data
  sendEvent({ object, event, request }) {
    const { machineDefinition } = this;
    const { objectStateFieldName, objectAlias } = machineDefinition.schema.objectConfig;
    // calculate from state
    const from = this.currentState({ object });
    // get context
    const { context, promise } = this;
    //
    const changeObjectState = to => {
      // eslint-disable-next-line no-param-reassign
      object[objectStateFieldName] = to;
    };

    const actionByName = name => {
      return machineDefinition.actions[name];
    };

    return this.machineDefinition.
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
        let result = promise.resolve({ actionExecutionResults: [], object });
        for (let i = 0; i < actions.length; i++) {
          result = result.then(({ actionExecutionResults, object }) => {
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

            // execute action
            const actionResult = action({
              ...(
                actions[i].params &&
                actions[i].params.reduce((params, { name, value }) => ({ ...params, [name]: value }), {})
              ),
              from,
              to,
              event,
              object,
              /* istanbul-ignore-next */
              ...(objectAlias && { [objectAlias]: object }),
              request,
              context,
              actionExecutionResults
            });
            // store action execution result for passing it into the next action
            return {
              actionExecutionResults: actionExecutionResults.concat([
                {
                  name: actions[i].name,
                  result: actionResult
                }
              ]),
              object
            };
          });
        }

        return result.then(({ actionExecutionResults, object }) => {
          changeObjectState(to);
          return {
            actionExecutionResults,
            object
          };
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

  // returns true if object is in specified state
  is({ object, state }) {
    return this.currentState({ object }) === state;
  }

  // returns true if object in one of final states specified in machine definition
  // isFinal({ state }) {
  //   // console.log(`finalStates: '${this.machineDefinition.schema.finalStates}'`);
  //   // console.log(`state: '${state}'`);
  //   return this.machineDefinition.schema.finalStates.indexOf(state) >= 0;
  // }

  // returns true if object in one of final states specified in machine definition schema
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
}
