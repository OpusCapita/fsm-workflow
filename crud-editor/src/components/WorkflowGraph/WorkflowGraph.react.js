import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Viz from 'viz.js';
import isEqual from 'lodash/isEqual';
import './WorkflowGraph.less';
import { Navbar, Nav } from 'react-bootstrap';
import Color from 'color';
import rgb2hex from 'rgb2hex';

const INITIAL_STATE_COLOR = '#14892c';
const FINAL_STATE_COLOR = '#b71c1c';
const REGULAR_STATE_COLOR = '#0277bd';
const REGULAR_EDGE_COLOR = '#333333';
const SELECTED_EDGE_COLOR = '#333333';

const nodeListToArray = (nodeList) => Array.prototype.slice.call(nodeList);

const propTypes = {
  availableTransitions: PropTypes.arrayOf(PropTypes.object),
  schema: PropTypes.object,
  selectedStates: PropTypes.arrayOf(PropTypes.string),
  selectedTransitions: PropTypes.arrayOf(PropTypes.object),
  getStateLabel: PropTypes.func.isRequired,
  onStatesSelect: PropTypes.func,
  onTransitionsSelect: PropTypes.func
};

const defaultProps = {
  availableTransitions: [],
  schema: null,
  selectedStates: [],
  selectedTransitions: [],
  onStatesSelect: () => {},
  onTransitionsSelect: () => {}
};

export default
class WorkflowGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svg: ''
    };
  }

  componentDidMount() {
    this.renderGraph({
      availableTransitions: this.props.availableTransitions,
      schema: this.props.schema,
      selectedStates: this.props.selectedStates,
      selectedTransitions: this.props.selectedTransitions,
      getStateLabel: this.props.getStateLabel
    });
  }

  componentWillReceiveProps(nextProps) {
    this.renderGraph({
      availableTransitions: nextProps.availableTransitions,
      schema: nextProps.schema,
      selectedStates: nextProps.selectedStates,
      selectedTransitions: nextProps.selectedTransitions,
      getStateLabel: nextProps.getStateLabel
    });
  }

  componentWillUnmount() {
    clearTimeout(this.addNodesEventListenersTimeout);
    clearTimeout(this.addEdgesEventListenersTimeout);
  }

  addNodesEventListeners = () => {
    clearTimeout(this.addNodesEventListenersTimeout);

    if (this.svgRef) {
      this.addNodesEventListenersTimeout = setTimeout(() => {
        let svgNodes = Array.prototype.slice.call(
          (this.svgRef.querySelectorAll('[id^=oc-fsm--graph__node----]'))
        );

        svgNodes.map((node) => {
          let nodeName = decodeURIComponent(node.id.replace('oc-fsm--graph__node----', ''));
          node.addEventListener('click', () => this.props.onStatesSelect([nodeName]));
        });
      }, 200);
    } else {
      this.addNodesEventListeners();
    }
  }

  addEdgesEventListeners = () => {
    clearTimeout(this.addEdgesEventListenersTimeout);

    if (this.svgRef) {
      this.addEdgesEventListenersTimeout = setTimeout(() => {
        let svgEdges = Array.from(this.svgRef.querySelectorAll('[id^=oc-fsm--graph__edge----]'));

        svgEdges.map((edge) => {
          let edgeFromTo = decodeURIComponent(edge.id.replace('oc-fsm--graph__edge----', ''));
          let splittedEdgeFromTo = edgeFromTo.split('----');
          let from = decodeURIComponent(splittedEdgeFromTo[0]);
          let to = decodeURIComponent(splittedEdgeFromTo[1]);
          let event = decodeURIComponent(splittedEdgeFromTo[2]);

          edge.addEventListener('click', () => this.props.onTransitionsSelect([{ from, to, event }]));
        });
      }, 200);
    } else {
      this.addEdgesEventListeners();
    }
  }

  renderStates = ({
    availableTransitions,
    states,
    initialState,
    finalStates,
    selectedStates,
    regularStateColor,
    finalStateColor,
    initialStateColor,
    getStateLabel
  }) => {
    return states.map((state, i) => {
      let { name } = state;
      console.log('av', availableTransitions);
      let type;
      let fillColor;

      if (finalStates.indexOf(name) !== -1) {
        type = 'FINAL_STATE';
        fillColor = finalStateColor;
      } else if (initialState === name) {
        type = 'INITIAL_STATE';
        fillColor = initialStateColor;
      } else {
        type = 'REGULAR_STATE';
        fillColor = regularStateColor;
      }

      let isSelected = selectedStates.indexOf(name) !== -1;

      // border color
      let color = isSelected ? rgb2hex(Color(fillColor).darken(0.3).rgb().string()).hex : 'transparent';

      // eslint-disable-next-line max-len
      let nodeStr = `node [shape = record fillcolor="${fillColor}" margin="0.2,0.1" color="${color}" fontname="Helvetica" style="rounded,filled", penwidth=6];`;

      return `${nodeStr} "${getStateLabel(state.name)}" [id="oc-fsm--graph__node----${encodeURIComponent(state.name)}"]`;
    }).join(' ');
  }

  renderEdges = ({
    availableTransitions,
    transitions,
    selectedTransitions,
    regularEdgeColor,
    selectedEdgeColor,
    getStateLabel
  }) => {
    return transitions.
      filter(({ from, to, event }) => (from && to && event)).
      // map(({ from, to, event }) => (`\t"${getStateLabel(from)}" -> "${getStateLabel(to)}" [label = "${event}"];`)).
      map(({ from, to, event }) => {
        let isAvailable = availableTransitions.some(tr => tr.from === from && tr.to === to && tr.event === event);
        let isSelected = selectedTransitions.filter((tr) => tr.from === from && tr.to === to && tr.event === event).length;
        let color = isSelected ? regularEdgeColor : regularEdgeColor;
        let penwidth = (isSelected || isAvailable) ? '4' : '1';

        return (`\t"${getStateLabel(from)}" -> "${getStateLabel(to)}" [id="oc-fsm--graph__edge----${encodeURIComponent(from)}----${encodeURIComponent(to)}----${encodeURIComponent(event)}", penwidth=${penwidth}, color="${color}", label = "${event}"]`);
      }).
      join(`\n`);
  }

  convertSchemaToDotLang({ availableTransitions, schema, selectedStates, selectedTransitions, getStateLabel }) {
    // DOT language used by graphviz: https://graphviz.gitlab.io/_pages/doc/info/lang.html
    const { transitions, initialState, finalStates, states } = schema;

    let src = '';
    src += `digraph schema {\n`;
    src += `graph [splines=true, nodesep=0.3, size=12]`;
    src += `\trankdir=LR;\n`;
    src += `\tedge [fontname="Helvetica"];\n`;
    src += `\t${this.renderStates({
      availableTransitions,
      states,
      initialState,
      finalStates,
      selectedStates,
      regularStateColor: REGULAR_STATE_COLOR,
      initialStateColor: INITIAL_STATE_COLOR,
      finalStateColor: FINAL_STATE_COLOR,
      getStateLabel
    })}\n`;
    src += this.renderEdges({
      availableTransitions,
      transitions,
      selectedTransitions,
      regularEdgeColor: REGULAR_EDGE_COLOR,
      selectedEdgeColor: SELECTED_EDGE_COLOR,
      getStateLabel
    });
    src += `}`;

    return src;
  }

  renderGraph = ({ availableTransitions, schema, selectedStates, selectedTransitions, getStateLabel }) => {
    const vizSrc = this.convertSchemaToDotLang({ availableTransitions, schema, selectedStates, selectedTransitions, getStateLabel });
    this.setState({
      svg: Viz(vizSrc, { format: "svg", engine: "dot", totalMemory: 16777216 })
    });

    this.addNodesEventListeners();
    this.addEdgesEventListeners();
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

    const { svg } = this.state;

    return (
      <div
        className="oc-fsm-crud-editor--workflow-graph"
      >
        <Navbar fluid={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <span>Schema</span>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div
          ref={ref => (this.svgRef = ref)}
          className="oc-fsm-crud-editor--workflow-graph__svg"
          dangerouslySetInnerHTML={{ __html: svg }}
        >
        </div>

        <div className="oc-fsm-crud-editor--workflow-graph__legend panel-body">
          <div className="oc-fsm-crud-editor--workflow-graph__legend-item">
            <div
              className={`
                oc-fsm-crud-editor--workflow-graph__legend-item-badge
                oc-fsm-crud-editor--workflow-graph__legend-item-badge--regular-state
              `}
            ></div>
            <div>regular state nodes</div>
          </div>
          <div className="oc-fsm-crud-editor--workflow-graph__legend-item">
            <div
              className={`
                oc-fsm-crud-editor--workflow-graph__legend-item-badge
                oc-fsm-crud-editor--workflow-graph__legend-item-badge--initial-state
              `}
            ></div>
            <div>initial state nodes</div>
          </div>
          <div className="oc-fsm-crud-editor--workflow-graph__legend-item">
            <div
              className={`
                oc-fsm-crud-editor--workflow-graph__legend-item-badge
                oc-fsm-crud-editor--workflow-graph__legend-item-badge--final-state
              `}
            ></div>
            <div>final state nodes</div>
          </div>
        </div>
      </div>
    );
  }
}

WorkflowGraph.propTypes = propTypes;
WorkflowGraph.defaultProps = defaultProps;
