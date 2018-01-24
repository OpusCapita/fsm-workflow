import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from 'react-graph-vis';
import graphOptions from './graph-options';
import uniqBy from 'lodash/uniqBy';
import './WorkflowGraph.less';

let propTypes = {
  schema: PropTypes.object
};

let defaultProps = {
  schema: null
};

export default
class WorkflowGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  generateGraphBySchema = (schema) => {
    let nodes = uniqBy(schema.transitions.reduce((result, { from, to }) => {
      if (from === null || to === null) {
        return result;
      }

      return result
        .concat([ { id: from, label: from } ])
        .concat([ { id: to, label: to } ]);
    }, []), 'id');

    let edges = schema.transitions.map(({ from, to, event }) => ({ from, to, label: event }));

    return ({ nodes, edges });
  }

  render() {
    let { schema } = this.props;

    if (!schema) {
      return (
        <div className="oc-fsm-crud-editor--workflow-graph">
          <h4>
            Nothing to visualize
          </h4>
        </div>
      );
    }

    const graph = this.generateGraphBySchema(schema);


    return (
      <div className="oc-fsm-crud-editor--workflow-graph">
        <div className="oc-fsm-crud-editor--workflow-graph__reset-button">
          Reset
        </div>
        <Graph
          graph={graph}
          options={graphOptions}
        />
      </div>
    );
  }
}

WorkflowGraph.propTypes = propTypes;
WorkflowGraph.defaultProps = defaultProps;
