import React, { PropTypes, PureComponent } from 'react';
import TaskList from './TaskList.react';
import NotificationSystem from 'react-notification-system';
import {TaskManager} from '../../../../fsm-task-manager';
import {Machine} from '../../../../fsm-library';
import {MachineDefinition} from '../../../../fsm-library';

export default class Container extends PureComponent {

  constructor(props) {
    super(props);

    this.processMachine = new Machine({
      machineDefinition: new MachineDefinition({
        schema: require('../workflow/process-schema.json'),
        actions: require('../workflow/actions').default,
        guards: require('../workflow/guards').default
      }),
      context: {
        sendNotification: ({notification}) => {
          this._notificationSystem.addNotification(notification);
        }}
    });

    this.processManager = new TaskManager({
      machine: this.processMachine,
      search: ::this.search,
      update: ::this.update
    });
  }

  state = {
    tasks: {
      1: {
        object: {id: 1, status: ''},
        actions: []
      },
      2: {
        object: {id: 2, status: ''},
        actions: []
      },
      3: {
        object: {id: 3, status: ''},
        actions: []
      },
      4: {
        object: {id: 4, status: ''},
        actions: []
      },
      5: {
        object: {id: 5, status: ''},
        actions: []
      }
    }
  };

  search(searchParams) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.values(this.state.tasks).map((taskValue) => {
          return taskValue.object
        }));
      }, 500)
    })
  };

  update(object) {
    return new Promise((resolve, reject) => {
      this.processMachine.availableTransitions({object: this.state.tasks[object.id].object}).then(({transitions}) => {
        setTimeout(() => {
          this.setState({
            tasks: {
              ...this.state.tasks,
              [object.id]: {
                object,
                actions: transitions
              }
            }
          });
          resolve();
        }, 500)
      });
    });
  };

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    this.processManager.run(2000);
  }


  render() {
    return (
      <div className="container">
        <TaskList
          tasks={Object.values(this.state.tasks)}
          onSendEvent={({object, event}) => (this.processMachine.sendEvent({object, event}).then(({object}) => (this.update(object))))}
        />
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}
