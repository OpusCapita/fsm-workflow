import React, {PropTypes} from 'react';

const TaskList = ({tasks, onSendEvent}) => (
  <table className="table table-condensed">
    <thead>
      <tr>
        <th>ID</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {tasks.map(({object, actions}) => {
      console.log(actions);
      return(
        <tr key={object.id}>
          <td>{object.id}</td>
          <td>{object.status}</td>
          <td>{object.assignee}</td>
          <td>
            <div className="btn-group">
              {actions.map(({ event }) => (
                <button key={event} className="btn btn-default" onClick={() => (onSendEvent({object, event}))}>
                  {event}
                </button>
              ))}
            </div>
          </td>
        </tr>
      );
    })}
    </tbody>
  </table>
);

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onSendEvent: PropTypes.func.isRequired
};

TaskList.defaultProp = {
  tasks: []
};

export default TaskList;
