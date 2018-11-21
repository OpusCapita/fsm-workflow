import React, {PropTypes} from 'react';

const TaskList = ({tasks, onSendEvent}) => (
  <div className="table-responsive">
    <table className="table table-condensed">
      <thead>
        <tr>
          <th className="col-md-2">ID</th>
          <th className="col-md-2">Status</th>
          <th className="col-md-8"></th>
        </tr>
      </thead>
      <tbody>
      {tasks.map(({object, transitions}) => {
        return(
          <tr key={object.id}>
            <td>{object.id}</td>
            <td>{object.status}</td>
            <td>
              <div className="btn-group">
                {transitions.map(({ event }) => (
                  <button key={event} className="btn-sm btn-default" onClick={() => (onSendEvent(object, event))}>
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
  </div>
);

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onSendEvent: PropTypes.func.isRequired
};

TaskList.defaultProps = {
  tasks: []
};

export default TaskList;
