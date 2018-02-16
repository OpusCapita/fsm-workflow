(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["fsm-task-manager"] = factory();
	else
		root["fsm-task-manager"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskManager = undefined;

var _TaskManager = __webpack_require__(1);

var _TaskManager2 = _interopRequireDefault(_TaskManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.TaskManager = _TaskManager2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Automatic process executor for state workflow
 *
 * @author Daniel Zhitomirsky
 */
var TaskManager = function () {
  /**
   * Create new instance of task manager
   *
   * @param machine - {Machine} instance
   * @param search - function that must return a Promise that should be
   * resolved with a list of items to minor(tasks/objects with a started workflow)
   * @param update - function that must return a promise that is resolved
   * with update result (f.e. persistent update in DB)
   */
  function TaskManager(_ref) {
    var machine = _ref.machine,
        search = _ref.search,
        update = _ref.update;

    _classCallCheck(this, TaskManager);

    this.machine = machine;
    this.search = search;
    this.update = update;
    this.processCache = new Map();
  }

  /**
   * Monitors objects returned by 'search' actions.
   * If one of found workflow of any of found objects is
   * not started - manager will start it and call 'update'.
   * If one of found objects has available transition marked with 'automatic'
   * and all its auto and manual guards are resolved with 'true' - manager will
   * send corresponding event.
   * If the workflow if finished for the objects - manage will skip it.
   * If 'search' or 'update' throw exception - monitoring will be stopped
   *
   * @param timeout - optional timeout parameter (500 millis by default)
   */


  _createClass(TaskManager, [{
    key: 'run',
    value: function run() {
      var _this = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;

      var taskProcess = (0, _utils.doUntil)(function () {
        _this.search({}).then(function (taskList) {
          taskList.map(function (task) {
            if (_this.machine.isRunning({ object: task })) {
              _this.machine.availableAutomaticTransitions({ object: task }).then(function (_ref2) {
                var transitions = _ref2.transitions;

                if (transitions && transitions.length > 0) {
                  var _transitions$ = transitions[0],
                      from = _transitions$.from,
                      event = _transitions$.event;

                  if (transitions.length > 1) {
                    console.log('More than one transition is found for \'from\': \'' + from + '\' and \'event\': \'' + event + '\'');
                  }
                  return _this.machine.sendEvent({ object: task, event: event }).then(function (_ref3) {
                    var object = _ref3.object;

                    return _this.update(object);
                  });
                } else {
                  return _this.machine.promise.resolve();
                }
              });
            } else if (!_this.machine.isInFinalState({ object: task })) {
              return _this.machine.start({ object: task }).then(function (_ref4) {
                var object = _ref4.object;

                return _this.update(object);
              });
            }
            return _this.machine.promise.resolve();
          });
        }).catch(function (err) {
          _this.stop();
          throw new Error('\'search\' was rejected with error ' + err);
        });
      }, function () {
        return true;
      }, timeout);

      this.processCache.set(taskProcess, {
        name: this.machine.machineDefinition.schema.name,
        started: new Date(),
        finished: undefined
      });
    }

    /**
     * Return Promise that will be rejected with 'search' execution result
     *
     * @param searchParams
     * @return {Promise.<TResult>}
     */

  }, {
    key: 'list',
    value: function list(_ref5) {
      var _ref5$searchParams = _ref5.searchParams,
          searchParams = _ref5$searchParams === undefined ? {} : _ref5$searchParams;

      return this.machine.promise.resolve(this.search(searchParams));
    }

    /**
     * Moves object to workflow init state with further 'update' call
     *
     * @param object
     * @return {Promise.<TResult>}
     */

  }, {
    key: 'start',
    value: function start(_ref6) {
      var _this2 = this;

      var object = _ref6.object;

      return this.machine.start({ object: object }).then(function (_ref7) {
        var object = _ref7.object;

        return _this2.update(object);
      });
    }

    /**
     * Sends event to the object with further update operation
     *
     * @param object
     * @param event
     * @param request
     */

  }, {
    key: 'sendEvent',
    value: function sendEvent(_ref8) {
      var _this3 = this;

      var object = _ref8.object,
          event = _ref8.event,
          request = _ref8.request;

      return this.machine.sendEvent({ object: object, event: event, request: request }).then(function (_ref9) {
        var object = _ref9.object;

        return _this3.update(object);
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      var processDescriptor = Array.from(this.processCache.keys()).pop();
      if (processDescriptor) {
        (0, _utils.killProcess)(processDescriptor);
        this.processCache.get(processDescriptor).finished = new Date();
        return true;
      }

      return false;
    }
  }]);

  return TaskManager;
}();

exports.default = TaskManager;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.killProcess = killProcess;
exports.doUntil = doUntil;
/**
 * Enforces process started with @DoUntil to stop
 *
 * @param processDecriptor - timer object
 */
function killProcess(processDecriptor) {
  clearInterval(processDecriptor);
}

/**
 * Executes @action avery @timeout until @test function returns 'false'
 *
 * @param action - function to call per iteration
 * @param test - true|false guard function
 * @param timeout - timeout in millis (1 sec by default)
 */
function doUntil(action, test) {
  var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

  var timer = setInterval(function () {
    action();
    if (!test()) {
      killProcess(timer);
    }
  }, timeout);

  return timer;
}

/***/ })
/******/ ]);
});