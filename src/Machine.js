export default class Machine {
  constructor({ machineDefinition, promise = Machine.defaultPromise(), context = {} }) {
    if (!machineDefinition) {
      throw new Error('machineDefinition is undefined');
    }
    if (!promise) {
      throw new Error('promise is undefined');
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
      return global.Promise
    }
		// otherwise using bluebird implementation
    return require('bluebird').Promise
  }

	// sets object initial state
  start({ object, context }) {
    const { objectStateFieldName, initialState } = this.machineDefinition.schema
		// eslint-disable-next-line no-param-reassign
    object[objectStateFieldName] = initialState;
    return this.promise.resolve({ object })
  }

	// returns current object state
  currentState({ object }) {
    const { objectStateFieldName } = this.machineDefinition.schema;
    return object[objectStateFieldName];
  }

	// returns a lits of events (names) that are available at current object state
  availableTransitions({ object }) {
		// calculate from state
    const from = this.currentState({ object });
		// get context
    const { context } = this;
		// we can cut each transition to 'event' and 'auto', but not now (may be later)
    return this.machineDefinition.findAvailableTransitions({
      from,
      object,
      context
    });
  }

	// send event
	// object - stateful object
	// event - name of the event to be send
	// request - event request data
  sendEvent({ object, event, request }) {
    const { machineDefinition } = this;
    const { objectStateFieldName } = machineDefinition.schema;
		// calculate from state
    const from = this.currentState({ object });
		// get context
    const { context, promise } = this;
		//
    const changeObjectState = (to) => {
			// eslint-disable-next-line no-param-reassign
      object[objectStateFieldName] = to;
    };

    const actionByName = (name) => {
      return machineDefinition.actions[name];
    };

    return this.machineDefinition.findAvailableTransitions({
      from,
      event,
      object,
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
      if (transitions.length > 1) {
        console.log(`More than one transition is found for 'from': '${from}' and 'event': '${event}'`)
      }
			// select first found transition and read its information
      const { to, actions = [] } = transitions[0]
			// console.log(`Start transition for 'from': '${from}' and 'event': '${event}' to '${to}'`);

			// todo: call onStartTransition handler
      let result = promise.resolve({ actionExecutionResutls: [], object });
      for (let i = 0; i < actions.length; i++) {
        result = result.then(({ actionExecutionResutls, object }) => {
          let action = actionByName(actions[i].name);
					// guard is defined in schema, but is not really defined -> error!!!
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
            ...actions[i].arguments,
            from,
            to,
            event,
            object,
            request,
            context,
            actionExecutionResutls
          });
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
        changeObjectState(to);
        return {
          actionExecutionResutls,
          object
        }
      });
			// todo: call onFinishTransition handler
    });
  }
}
