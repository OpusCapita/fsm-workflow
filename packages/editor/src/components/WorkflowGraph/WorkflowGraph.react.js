import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import cytoscape from 'cytoscape';
import isEqual from 'lodash/isEqual';
import './WorkflowGraph.less';

export default class WorkflowGraph extends PureComponent {
  static propTypes = {
    schema: PropTypes.object,
    getStateLabel: PropTypes.func.isRequired
  }

  static defaultProps = {
    schema: null
  }

  componentDidMount() {
    const el = findDOMNode(this);
    const { clientHeight, clientWidth } = el;
    this.container.style.width = clientWidth + 'px';
    this.container.style.height = clientHeight + 'px';

    this.renderGraph(this.props.schema);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.schema, nextProps.schema)) {
      this.renderGraph(nextProps.schema);
    }
  }

  renderGraph = (schema) => {
    const cy = cytoscape({
      container: this.container,

      elements: [ // list of graph elements to start with
        { // node a
          data: { id: 'a' }
        },
        { // node b
          data: { id: 'b' }
        },
        { // edge ab
          data: { id: 'ab', source: 'a', target: 'b' }
        }
      ],

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        }
      ],

      layout: {
        name: 'grid',
        rows: 1
      }
    })
  }

  render() {
    const { schema } = this.props;

    if (!schema) {
      return (
        <div className="oc-fsm-crud-editor--workflow-graph">
          <h4>
            Nothing to visualize
          </h4>
        </div>
      );
    }

    return (
      <div className="oc-fsm-crud-editor--workflow-graph">
        <div
          ref={el => (this.container = el)}
        ></div>
      </div>
    );
  }
}

