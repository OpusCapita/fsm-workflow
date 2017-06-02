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

  run(timeout = 500) {
    let taskProcess = doUntil(() => {
      this.search({}).then((taskList) => {
        taskList.map((task) => {
          if(this.machine.isOn({object: task})) {
            this.machine.availableAutoTransitions({ object: task }).then(({ transitions }) => {
              if (transitions && transitions.length > 0) {
                const { from, to, event } = transitions[0];
                if (transitions.length > 1) {
                  console.log(`More than one transition is found for 'from': '${from}' and 'event': '${event}'`);
                }
                return this.machine.sendEvent({ object: task, event }).then(({object}) => {
                  return this.update(object);
                })
              } else {
                return this.machine.promise.resolve();
              }
            })
          } else if (!this.machine.isFinal({ state: this.machine.currentState({ object: task}) })){
            return this.machine.start({object: task}).then(({object}) => {
              return this.update(object);
            })
          } else {
            return this.machine.promise.resolve();
          }
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

  list({searchParams}) {
    return this.search(searchParams);
  }

  stop() {
    let processDescriptor = Array.from(this.processCache.keys()).pop();
    if(processDescriptor) {
      killProcess(processDescriptor);
      this.processCache.get(processDescriptor).finished = new Date();
      return true;
    }

    return false;
  }
}
