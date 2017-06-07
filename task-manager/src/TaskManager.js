import { doUntil, killProcess } from './utils';

/**
 * Automatic process executor for state workflow
 *
 * @author Daniel Zhitomirsky
 */
export default class TaskManager {
  /**
   * Create new instance of task manager
   *
   * @param machine - {Machine} instance
   * @param search - function that must return a Promise that should be
   * resolved with a list of items to minor(tasks/objects with a started workflow)
   * @param update - function that must return a promise that is resolved
   * with update result (f.e. persistent update in DB)
   */
  constructor({ machine, search, update }) {
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
  run(timeout = 500) {
    let taskProcess = doUntil(() => {
      this.search({}).then((taskList) => {
        taskList.map((task) => {
          if (this.machine.isRunning({ object: task })) {
            this.machine.availableAutomaticTransitions({ object: task }).then(({ transitions }) => {
              if (transitions && transitions.length > 0) {
                const { from, event } = transitions[0];
                if (transitions.length > 1) {
                  console.log(`More than one transition is found for 'from': '${from}' and 'event': '${event}'`);
                }
                return this.machine.sendEvent({ object: task, event }).then(({ object }) => {
                  return this.update(object);
                })
              } else {
                return this.machine.promise.resolve();
              }
            })
          } else if (!this.machine.isFinal({ state: this.machine.currentState({ object: task }) })) {
            return this.machine.start({ object: task }).then(({ object }) => {
              return this.update(object);
            })
          }
          return this.machine.promise.resolve();
        })
      }).catch((err) => {
        this.stop();
        throw new Error(`'search' was rejected with error ${err}`);
      })
    }, () => true, timeout);

    this.processCache.set(taskProcess, {
      name: this.machine.machineDefinition.schema.name,
      started: new Date(),
      finished: undefined
    })
  }

  /**
   * Return Promise that will be rejected with 'search' execution result
   *
   * @param searchParams
   * @return {Promise.<TResult>}
   */
  list({ searchParams }) {
    return this.machine.promise.resolve(this.search(searchParams));
  }

  /**
   * Moves object to workflow init state with further 'update' call
   *
   * @param object
   * @return {Promise.<TResult>}
   */
  start({ object }) {
    return this.machine.start({ object }).then(({ object }) => {
      return this.update(object);
    })
  }

  /**
   * Sends event to the object with further update operation
   *
   * @param object
   * @param event
   * @param request
   */
  sendEvent({ object, event, request }) {
    return this.machine.sendEvent({ object, event, request }).then(({ object }) => {
      return this.update(object);
    })
  }


  stop() {
    let processDescriptor = Array.from(this.processCache.keys()).pop();
    if (processDescriptor) {
      killProcess(processDescriptor);
      this.processCache.get(processDescriptor).finished = new Date();
      return true;
    }

    return false;
  }
}
