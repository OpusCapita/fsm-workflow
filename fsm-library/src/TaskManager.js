import { doUntil } from './utils';

/**
 * Automatic process executor for state workflow
 *
 * @author Daniel Zhitomirsky
 */
export default class TaskManager {
  constructor({ machine }) {
    this.machine = machine;
  }

  monitor({ object }) {
    doUntil(() => {
      if (this.machine.isOn({ object })) {
        this.machine.availableAutoTransitions({ object }).then(({ transitions }) => {
          if (transitions && transitions.length >= 0) {
            const { from, to, event } = transitions[0];
            if (transitions.length > 1) {
              console.log(`More than one transition is found for 'from': '${from}' and 'event': '${event}'`);
            }
            this.machine.sendEvent({ object, event })
          }
        })
      }
    }, () => {
      return this.machine.isFinal({ state: this.machine.currentState({ object }) })
    });
  }
}
