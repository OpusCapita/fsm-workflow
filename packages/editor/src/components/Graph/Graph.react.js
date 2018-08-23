import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
import { render as renderCy } from './cy';
import { getStateLabel } from '../utils';
import './Graph.less';

export default class Graph extends PureComponent {
  static propTypes = {
    schema: PropTypes.object
  }

  static defaultProps = {
    schema: null
  }

  componentDidMount() {
    this.draw(this.props.schema);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.schema, nextProps.schema)) {
      this.draw(nextProps.schema);
    }
  }

  draw = (schema = this.props.schema) => {
    if (!this.container || !schema) {
      return
    }

    const { clientHeight, clientWidth } = this.container;
    this.container.style.width = clientWidth + 'px';
    this.container.style.height = clientHeight + 'px';

    // console.log({ schema });

    const { transitions, initialState, finalStates } = schema;

    const elements = transitions.reduce((acc, { from, to, event }) => {
      const newNodes = [from, to].
        filter(state => !find(acc.nodes, el => el.data.id === state)).
        map(state => ({
          data: {
            id: state,
            label: getStateLabel(schema)(state),
            ...(state === initialState && {
              initialState: true
            }),
            ...(finalStates.indexOf(state) !== -1 && {
              finalState: true
            })
          }
        }));

      const newEdges = [
        ...(!find(acc.edges, el => el.data.id === event) && [{
          data: {
            id: event,
            source: from,
            target: to,
            label: event
          }
        }])
      ];

      return {
        nodes: [...acc.nodes, ...newNodes],
        edges: [...acc.edges, ...newEdges]
      }
    }, {
      nodes: [],
      edges: []
    });

    // console.log({ elements });

    this.cy = renderCy({ element: this.container, ...elements });
  }

  handleReset = _ => this.draw();

  render() {
    const { schema } = this.props;

    return (
      <div className="oc-fsm-crud-editor--workflow-editor__graph-wrapper">
        <h2>Schema</h2>
        <p>This is a temporary solution for FSM visualization.</p>
        <div className='btn-group'>
          <button className='btn btn-default' onClick={this.handleReset}>Reset graph</button>
        </div>
        <div className="oc-fsm-crud-editor--workflow-editor__graph">
          {
            schema ? (
              <div
                className="oc-fsm-crud-editor--workflow-editor__graph-content"
                ref={el => (this.container = el)}
              ></div>
            ) : (
              <div className="oc-fsm-crud-editor--workflow-editor__graph-content">
                <h4>Nothing to visualize</h4>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

