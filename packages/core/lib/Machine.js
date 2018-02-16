"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Machine = function () {
  function Machine() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        machineDefinition = _ref.machineDefinition,
        _ref$promise = _ref.promise,
        promise = _ref$promise === undefined ? Machine.defaultPromise() : _ref$promise,
        _ref$context = _ref.context,
        context = _ref$context === undefined ? {} : _ref$context,
        history = _ref.history,
        convertObjectToReference = _ref.convertObjectToReference;

    _classCallCheck(this, Machine);

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

  _createClass(Machine, [{
    key: "convertObjectToReference",


    // default implementation will throw an exception which should inform
    // developer that machine is not properly configured
    value: function convertObjectToReference() {
      throw new Error("'convertObjectToReference' is not defined\nIt is expected to be a function like this:\nfunction(object) {\nreturn {\nbusinessObjectType: ...   // business object type/class (examples: 'invoice', 'supplier', 'purchase-order')\nbusinessObjectId: ...     // business object unique id (examples: '123456789')\n}\n}\n    ");
    }

    // sets object initial state
    // @param object - stateful object
    // @param user - user name who initiated event/transition (this info will be writted into object wortkflow history)
    // @param description - event/transition/object description (this info will be writted into object wortkflow history)
    // N!B!: history record fields 'from' is set to ''NULL' value and 'event' to '__START__' value

  }, {
    key: "start",
    value: function start(_ref2) {
      var object = _ref2.object,
          user = _ref2.user,
          description = _ref2.description;
      var _machineDefinition$sc = this.machineDefinition.schema,
          name = _machineDefinition$sc.name,
          initialState = _machineDefinition$sc.initialState,
          objectConfiguration = _machineDefinition$sc.objectConfiguration;
      var stateFieldName = objectConfiguration.stateFieldName;
      var convertObjectToReference = this.convertObjectToReference;
      // eslint-disable-next-line no-param-reassign

      object[stateFieldName] = initialState;
      // add history record
      return this.history.add(_extends({
        from: 'NULL',
        to: initialState,
        event: '__START__'
      }, convertObjectToReference(object), {
        // TODO: add validation for user???
        user: user,
        description: description,
        workflowName: name
      })).then(function () {
        return { object: object };
      });
    }

    // returns current object state

  }, {
    key: "currentState",
    value: function currentState(_ref3) {
      var object = _ref3.object;
      var stateFieldName = this.machineDefinition.schema.objectConfiguration.stateFieldName;

      return object[stateFieldName];
    }

    // returns a lits of events (names) that are available at current object state
    // event is optional, it is required only if you search for transitions with the event

  }, {
    key: "availableTransitions",
    value: function availableTransitions(_ref4) {
      var object = _ref4.object,
          event = _ref4.event,
          request = _ref4.request;

      // calculate from state
      var from = this.currentState({ object: object });
      // get context
      var context = this.context;
      // we can cut each transition to 'event' and 'auto', but not now (may be later)

      return this.machineDefinition.findAvailableTransitions({
        from: from,
        object: object,
        request: request,
        context: context,
        event: event
      });
    }

    /**
     * Searches for transitions available for automatic execution from current object state
     *
     * @param object
     * @return Promise that is resolved with transition list or resolved with error
     */

  }, {
    key: "availableAutomaticTransitions",
    value: function availableAutomaticTransitions(_ref5) {
      var object = _ref5.object;

      return this.machineDefinition.findAvailableTransitions({
        from: this.currentState({ object: object }),
        object: object,
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

  }, {
    key: "sendEvent",
    value: function sendEvent(_ref6) {
      var _this = this;

      var object = _ref6.object,
          event = _ref6.event,
          user = _ref6.user,
          description = _ref6.description,
          request = _ref6.request;
      var machineDefinition = this.machineDefinition,
          convertObjectToReference = this.convertObjectToReference;
      var schema = machineDefinition.schema;
      var objectConfiguration = schema.objectConfiguration,
          workflowName = schema.workflowName;
      var stateFieldName = objectConfiguration.stateFieldName;
      // calculate from state

      var from = this.currentState({ object: object });
      // get context
      var context = this.context,
          promise = this.promise;
      //

      var changeObjectState = function changeObjectState(to) {
        // eslint-disable-next-line no-param-reassign
        object[stateFieldName] = to;
      };

      return this.machineDefinition.findAvailableTransitions(_extends({
        from: from,
        event: event,
        object: object
      }, machineDefinition.prepareObjectAlias(object), {
        request: request,
        context: context
      })).then(function (_ref7) {
        var transitions = _ref7.transitions;

        if (!transitions || transitions.length === 0) {
          // throw/return proper/sepecific error
          return promise.reject({
            object: object,
            from: from,
            event: event,
            message: "Transition for 'from': '" + from + "' and 'event': '" + event + "' is not found"
          });
        }
        /* istanbul ignore if */
        if (transitions.length > 1) {
          console.warn("More than one transition is found for 'from': '" + from + "' and 'event': '" + event + "'");
        }
        // select first found transition and read its information
        // using node destruct syntax to get 1st element and destruct it to {to, actions} object

        var _transitions = _slicedToArray(transitions, 1),
            _transitions$ = _transitions[0],
            to = _transitions$.to,
            _transitions$$actions = _transitions$.actions,
            actions = _transitions$$actions === undefined ? [] : _transitions$$actions;

        // extracting actionDefinitions list from


        var actionDefinitions = actions.map(function (action, idx) {
          if (!machineDefinition.actions[actions[idx].name]) {
            // throwing an error will fail top reject promise
            throw new Error({
              action: actions[idx].name,
              object: object,
              from: from,
              event: event,
              to: to,
              message: "Action '" + actions[idx].name + "' is specified in one the transitions but is not found/implemented!"
            });
          }
          // wrapping action into a Promise to support both sync/async variants
          return machineDefinition.actions[actions[idx].name];
        });

        // reducing actionDefinitions to promise queue
        return actionDefinitions.reduce(function (executionAccumulator, action, idx) {
          return executionAccumulator.then(function (_ref8) {
            var actionExecutionResults = _ref8.actionExecutionResults,
                object = _ref8.object;
            return promise.resolve(action(_extends({}, actions[idx].arguments, {
              from: from,
              to: to,
              event: event,
              object: object
            }, machineDefinition.prepareObjectAlias(object), {
              request: request,
              context: context,
              actionExecutionResults: actionExecutionResults
            }))).then(function (actionResult) {
              return promise.resolve({
                actionExecutionResults: actionExecutionResults.concat([{
                  name: actions[idx].name,
                  result: actionResult
                }]),
                object: object
              });
            });
          });
        }, promise.resolve({ // initial object accumulator
          actionExecutionResults: [],
          object: object
        })).then(function (_ref9) {
          var actionExecutionResults = _ref9.actionExecutionResults,
              object = _ref9.object;
          return promise.resolve(changeObjectState(to)).then(function (_) {
            // first we promote object state to the next state and only then save history
            return _this.history.add(_extends({
              from: from,
              to: to,
              event: event
            }, convertObjectToReference(object), {
              // TODO: add validation for user???
              user: user,
              description: description,
              workflowName: workflowName
            })).then(function (_) {
              return promise.resolve({
                actionExecutionResults: actionExecutionResults,
                object: object
              });
            });
          });
        });
      });
    }

    /**
     * Checks if workflow is launched and not finished for a specified object
     * @param object
     * @return {number}
     */

  }, {
    key: "isRunning",
    value: function isRunning(_ref10) {
      var object = _ref10.object;

      return this.availableStates().indexOf(this.currentState({ object: object })) !== -1 && !this.isInFinalState({ object: object });
    }

    /**
     * Return list of available workflow states
     * @return {Array}
     */

  }, {
    key: "availableStates",
    value: function availableStates() {
      return this.machineDefinition.getAvailableStates();
    }

    // returns true iff object in specified state

  }, {
    key: "is",
    value: function is(_ref11) {
      var object = _ref11.object,
          state = _ref11.state;

      return this.currentState({ object: object }) === state;
    }

    // returns true iff object in once of filal state specified in machine definition
    // isFinal({ state }) {
    //   // console.log(`finalStates: '${this.machineDefinition.schema.finalStates}'`);
    //   // console.log(`state: '${state}'`);
    //   return this.machineDefinition.schema.finalStates.indexOf(state) >= 0;
    // }

    // returns true iff object in one of final states specified in machine definition schema

  }, {
    key: "isInFinalState",
    value: function isInFinalState(_ref12) {
      var object = _ref12.object;

      return this.machineDefinition.schema.finalStates.indexOf(this.currentState({ object: object })) >= 0;
    }

    // retuns promise, where then gets single argument with boolean value

  }, {
    key: "can",
    value: function can(_ref13) {
      var _this2 = this;

      var object = _ref13.object,
          event = _ref13.event;

      return this.availableTransitions({ object: object, event: event }).then(function (_ref14) {
        var transitions = _ref14.transitions;

        // console.log(`transitions: '${JSON.stringify(transitions)}'`);
        return _this2.promise.resolve(transitions && transitions.length > 0);
      });
    }

    // retuns promise, where then gets single argument with boolean value

  }, {
    key: "cannot",
    value: function cannot(_ref15) {
      var _this3 = this;

      var object = _ref15.object,
          event = _ref15.event;

      return this.can({ event: event, object: object }).then(function (result) {
        return _this3.promise.resolve(!result);
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

  }, {
    key: "getHistory",
    value: function getHistory(_ref16, _ref17, _ref18) {
      var object = _ref16.object,
          user = _ref16.user,
          finishedOn = _ref16.finishedOn;
      var max = _ref17.max,
          offset = _ref17.offset;
      var by = _ref18.by,
          order = _ref18.order;
      var convertObjectToReference = this.convertObjectToReference;

      return this.history.search({
        object: convertObjectToReference(object),
        user: user,
        finishedOn: finishedOn,
        workflowName: this.machineDefinition.schema.name
      }, {
        max: max,
        offset: offset
      }, {
        by: by,
        order: order
      }).then(function (historyRecords) {
        // map businessObjId, businessObjType to obect
        return historyRecords.map(function (_ref19) {
          var businessObjType = _ref19.businessObjType,
              businessObjId = _ref19.businessObjId,
              otherProperties = _objectWithoutProperties(_ref19, ["businessObjType", "businessObjId"]);

          return _extends({
            object: {
              businessObjType: businessObjType,
              businessObjId: businessObjId
            }
          }, otherProperties);
        });
      });
    }
  }], [{
    key: "defaultPromise",
    value: function defaultPromise() {
      // if machine works in Node, the Promise is available out of the box
      // e.g. global.Promise
      if (global && global.Promise) {
        return global.Promise;
      }
      // otherwise using bluebird implementation
      return require("bluebird").Promise;
    }
  }, {
    key: "defaultHistory",
    value: function defaultHistory(promise) {
      return {
        add: function add() {
          /* istanbul ignore next */
          return promise.resolve({});
        },
        search: function search() {
          /* istanbul ignore next */
          return promise.resolve([]);
        }
      };
    }
  }]);

  return Machine;
}();

exports.default = Machine;