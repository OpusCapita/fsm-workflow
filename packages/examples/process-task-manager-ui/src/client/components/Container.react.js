import React, { PropTypes, PureComponent } from 'react';
import TaskList from './TaskList.react';
import NotificationSystem from 'react-notification-system';
import { TaskManager } from '@opuscapita/fsm-workflow-task-manager';
import { Machine, MachineDefinition } from '@opuscapita/fsm-workflow-core';

//emulates external collection of tasks, f.e. stored in DB
let tasks = [
  { id: 1, status: '' },
  { id: 2, status: '' },
  { id: 3, status: '' },
  { id: 4, status: '' },
  { id: 5, status: '' }
];

//represents external async api call that returns tasks (f.e. ajax call via
// superagent or db select via sequelize)
const searchTasks = (searchParams) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(tasks);
    }, 200)
  })
};

//represents external async api call to update single task (f.e. put ajax call via
// superagent or db update via sequelize)
const updateTask = (object) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      tasks[tasks.findIndex((task) => {
        return task.id === object.id
      })] = object;

      resolve();
    }, 200)
  })
};


export default class Container extends PureComponent {

  constructor(props) {
    super(props);

    this.processMachine = new Machine({
      machineDefinition: new MachineDefinition({
        schema: require('../workflow/process-schema.json'),
        objectConfiguration: require('../workflow/objectConfiguration.json'),
        actions: require('../workflow/actions').default,
        conditions: require('../workflow/conditions').default
      }),
      context: {
        sendNotification: ({ notification }) => {
          this._notificationSystem.addNotification(notification);
        }
      },
      convertObjectToReference: (o) => {
        return {
          //...we don't need it here
        }
      }
    });

    this.processManager = new TaskManager({
      machine: this.processMachine,
      search: searchTasks,
      update: updateTask
    });
  }

  state = {};

  search() {
   this.processManager.list({}).then((tasks) => {
     Promise.all(tasks.map((task) => {
       return this.processMachine.availableTransitions({object: task}).then(({transitions}) => {
         return Promise.resolve({
           object: task,
           transitions
         })
       })
     })).then((tasks) => {
       this.setState({tasks})
     })
   });
  };

  handleSendEvent(object, event) {
    this.processManager.sendEvent({ object, event }).then((result) => {
      this.search();
    })
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    this.processManager.run(2000);

    //this is done only for test purposes to demonstrate automatic node execution
    //do not use such kind of approach in real world
    setInterval(() => {
      this.search();
    }, 500)
  }


  render() {
    console.log(this.state.tasks);
    return (
      <div className="container">
        <TaskList
          tasks={this.state.tasks}
          onSendEvent={::this.handleSendEvent}
        />
        <NotificationSystem ref="notificationSystem"/>
      </div>
    );
  }
}
