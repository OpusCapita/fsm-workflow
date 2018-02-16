"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// return new array that contains unique values from original array
var toUnique = function toUnique(original) {
  return original.filter(function (v, i, a) {
    return a.indexOf(v) === i;
  });
};

var MachineDefinition = function () {

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
   *   example              // (Object) object example that is used in editor
   * }
   */
  function MachineDefinition() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$schema = _ref.schema,
        schema = _ref$schema === undefined ? {} : _ref$schema,
        _ref$conditions = _ref.conditions,
        conditions = _ref$conditions === undefined ? {} : _ref$conditions,
        _ref$actions = _ref.actions,
        actions = _ref$actions === undefined ? {} : _ref$actions,
        _ref$promise = _ref.promise,
        promise = _ref$promise === undefined ? MachineDefinition.defaultPromise() : _ref$promise;

    _classCallCheck(this, MachineDefinition);

    // todo validate schema
    if (!promise) {
      throw new Error("'promise' is undefined");
    }
    // TODO: validate that name is passed (it wil be used by machine to write/read history)

    var objectConfiguration = schema.objectConfiguration,
        restSchema = _objectWithoutProperties(schema, ["objectConfiguration"]);

    this.schema = _extends({
      objectConfiguration: _extends({
        stateFieldName: MachineDefinition.getDefaultObjectStateFieldName()
      }, objectConfiguration),
      finalStates: []
    }, restSchema);
    // condition is an object, where each property name is condition name and
    // value is condition implentation (function)
    this.conditions = conditions;
    // actions is an object, where each property is implemented action name and
    // value is action(function) itself
    this.actions = actions;
    this.promise = promise;
  }

  _createClass(MachineDefinition, [{
    key: "prepareObjectAlias",


    // if schema.objectConfiguration.alias is set up then
    // JSON {<alias>: object} is returned otherwise empty JSON {}
    value: function prepareObjectAlias(object) {
      var objectConfiguration = this.schema.objectConfiguration;

      if (objectConfiguration && objectConfiguration.alias) {
        return _defineProperty({}, objectConfiguration.alias, object);
      }
      return {};
    }
  }, {
    key: "findAvailableTransitions",
    value: function findAvailableTransitions() {
      var _this = this;

      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          from = _ref3.from,
          event = _ref3.event,
          object = _ref3.object,
          request = _ref3.request,
          context = _ref3.context,
          _ref3$isAutomatic = _ref3.isAutomatic,
          isAutomatic = _ref3$isAutomatic === undefined ? false : _ref3$isAutomatic;

      // if from is not specified, then no transition is available
      if (from === null || from === undefined) {
        // to do throw proper error
        return this.promise.reject(new Error("'from' is not defined"));
      }
      var schema = this.schema;
      var transitions = schema.transitions;
      // if not transitions, the return empty list

      if (!transitions) {
        return this.promise.resolve({ transitions: [] });
      }
      var checkFrom = function checkFrom(transition) {
        return transition.from === from;
      };

      var checkEvent = function checkEvent(transition) {
        // if event is not specified then event does not matter for search
        if (!event) {
          return true;
        }
        return transition.event === event;
      };

      var checkGuards = function checkGuards(transition) {
        var guards = transition.guards,
            from = transition.from,
            to = transition.to,
            event = transition.event;
        // if guards are undefined

        if (!guards) {
          return _this.promise.resolve(true);
        }

        // eslint-disable-next-line new-cap
        return new _this.promise(function (resolve, reject) {
          // collecting conditions that belong to current transition
          var conditions = guards.map(function (guard, idx) {
            if (!_this.conditions[guards[idx].name]) {
              throw new Error(
              // eslint-disable-next-line max-len
              "Guard '" + guards[idx].name + "' is specified in one the transitions but corresponding condition is not found/implemented!");
            } else {
              return _this.conditions[guards[idx].name];
            }
          });

          return _this.promise.all(conditions.map(function (condition, idx) {
            return _this.promise.resolve(condition(_extends({}, guards[idx].arguments, {
              from: from,
              to: to,
              event: event,
              object: object
            }, _this.prepareObjectAlias(object), {
              request: request,
              context: context
            }))).then(function (result) {
              // if guard is resolve with false or is rejected, e.g. transition is not available at the moment
              // pass arguments specified in guard call (part of schema)
              // additionally object, request and context are also passed
              // request should be used to pass params for some dynamic calculations f.e.
              // role dependent transitions and e.t.c
              return guards[idx].negate ? !result : !!result;
            });
          })).then(function (executionResults) {
            return resolve(executionResults.every(function (result) {
              return !!result;
            }));
          }).catch(function (e) {
            return reject(e);
          });
        });
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
      var checkAutomatic = function checkAutomatic(transition) {
        var from = transition.from,
            to = transition.to,
            event = transition.event,
            automatic = transition.automatic;

        // automatic: true - checking for 'boolean' definition

        if (typeof automatic === 'boolean' && automatic) {
          return _this.promise.resolve(true);
        } else if (!automatic || automatic.length === 0) {
          // automatic also could be an array in the same way as guards
          return _this.promise.resolve(false);
        }

        // eslint-disable-next-line new-cap
        return new _this.promise(function (resolve, reject) {
          // collecting conditions that belong to current auto transition into list of functions
          var automaticConditions = automatic.map(function (autoGuard, idx) {
            if (!_this.conditions[automatic[idx].name]) {
              throw new Error(
              // if no functions definition found - throw an error
              // eslint-disable-next-line max-len
              "Automatic condition '" + automatic[idx].name + "' is specified in one the transitions but is not found/implemented!");
            } else {
              return _this.conditions[automatic[idx].name];
            }
          });

          // execute all checks asynchronously then collect & aggregate executions results
          return _this.promise.all(automaticConditions.map(function (autoCondition, idx) {
            return _this.promise.resolve(autoCondition(_extends({}, automatic[idx].arguments, {
              from: from,
              to: to,
              event: event,
              object: object,
              request: request
            }, _this.prepareObjectAlias(object), {
              context: context
            }))).then(function (result) {
              // if check return false, return false, e.g. transition is not available at the moment
              // pass arguments specified in guard call (part of schema)
              // additionally object and context are also passed
              return automatic[idx].negate ? !result : !!result;
            });
          })).then(function (executionResults) {
            return resolve(executionResults.every(function (result) {
              return !!result;
            }));
          }).catch(function (e) {
            return reject(e);
          });
        });
      };

      // eslint-disable-next-line new-cap
      return this.promise.all(transitions.filter(function (t) {
        return checkEvent(t) && checkFrom(t);
      }).map(function (transition) {
        return _this.promise.all([checkGuards(transition), isAutomatic ? checkAutomatic(transition) : _this.promise.resolve(true)]).then(function (checkResults) {
          if (checkResults.every(function (result) {
            return !!result;
          })) {
            return _this.promise.resolve(transition);
          } else {
            return _this.promise.resolve(null);
          }
        });
      })).then(function (foundTransitions) {
        return _this.promise.resolve({
          transitions: foundTransitions.filter(function (foundTransitions) {
            return !!foundTransitions;
          })
        });
      });
    }

    /**
     * Returns a list of all states that are defined in schema
     *
     * @return Array
     */

  }, {
    key: "getAvailableStates",
    value: function getAvailableStates() {
      var result = this.schema.transitions.reduce(
      // gather all states from transitions
      function (accumulator, t) {
        return accumulator.concat(t.from, t.to);
      },
      // initial and final states
      [this.schema.initialState].concat(_toConsumableArray(this.schema.finalStates)));

      return toUnique(result).sort();
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
    key: "getDefaultObjectStateFieldName",
    value: function getDefaultObjectStateFieldName() {
      return "status";
    }
  }]);

  return MachineDefinition;
}();

exports.default = MachineDefinition;